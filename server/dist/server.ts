import express, { Request, Response } from 'express';
import { connection } from './mysql/mysqlOperations';
import bcrypt from 'bcrypt';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(express.json());


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Docker Express!');
});

app.post('/create-user', async (req: Request, res: Response) => {
  const { name, surname, age, password, gender, email } = req.body;

  if (!name) return res.status(400).send("Name is required");
  if (!surname) return res.status(400).send("Surname is required");
  if (!password || password.length === 0) return res.status(400).send("Password is required and cannot be empty");
  if (!age || isNaN(age) || age < 16) return res.status(400).send("Age must be a number and at least 16");
  if (!email || email.length === 0) return res.status(400).send("Email is required");

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    connection.query('SELECT * FROM users WHERE uEmail = ?', [email], (err, results) => {
      if (err) return res.status(500).send("Error while checking email");
      if (results.length > 0) return res.status(400).send("This email is already registered. Please log in.");

      const sql = `INSERT INTO users (uToken, uName, uSurname, uPassword, uAge, uGender, uEmail) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(sql, [token, name, surname, hashPassword, age, gender, email], (err) => {
        if (err) return res.status(500).send("Server error while creating user");

        res.status(201).send({ message: "User created successfully", token });
      });
    });

  } catch (err) {
    res.status(500).send("Error processing request");
  }
});

app.post("/check-user", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || email.length === 0) return res.status(400).send("Email is required");
  if (!password || password.length === 0) return res.status(400).send("Password is required");

  try {
    connection.query('SELECT * FROM users WHERE uEmail = ?', [email], async (err, results) => {
      if (err) return res.status(500).send("Server error when checking user");
      if (results.length === 0) return res.status(404).send("User not found");

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.uPassword);
      if (!isMatch) return res.status(401).send("Invalid password");

      res.status(200).send({ message: "Login successful!", token: user.uToken });
      });
  } catch {
    res.status(500).send("Unexpected server error");
  }
});

app.post("/get-user", async (req: Request, res: Response) => {
  const { uToken } = req.body;

  console.log("Received uToken:", uToken);

  if (!uToken || typeof uToken !== 'string' || uToken.trim() === "") {
    console.log("Invalid token");
    return res.status(400).send("UToken is required");
  }

  try {
    connection.query('SELECT * FROM users WHERE uToken = ?', [uToken], async (err, results) => {
      if (err) {
        console.log("DB error:", err);
        return res.status(500).send("Server error when checking user");
      }
      if (results.length === 0) {
        console.log("User not found for token:", uToken);
        return res.status(404).send("User not found");
      }
      const user = results[0];
      res.status(200).send({
        message: "User found successfully",
        id: user.uID,
        name: user.uName,
        surname: user.uSurname,
        age: user.uAge,
        gender: user.uGender,
        email: user.uEmail,
      });
    });
  } catch (err) {
    console.log("Unexpected error:", err);
    res.status(500).send("Unexpected server error");
  }
});


app.post("/check-offers", async (req: Request, res: Response) => {
  try {
    connection.query('SELECT * FROM offers', (err, results) => {
      if(err) return res.status(500).send("Server error when checking offers");
      if(results.length === 0) return res.status(404).send("Offers not found");

      res.status(200).send({
        message: "Offers found successfully",
        offers: results
      });
    })
  } catch(err) {
    res.status(500).send("Unexpected server error");
  }
})

app.post("/create-offer", async (req: Request, res: Response) => {
  const { id, name, description, price, value } = req.body;

  if (!id) return res.status(400).send("User ID is required");
  if (!name) return res.status(400).send("Name is required");
  if (!description) return res.status(400).send("Description is required");
  if (price == null) return res.status(400).send("Price is required");
  if (value == null) return res.status(400).send("Value is required");

  try {
    connection.query(
      'INSERT INTO offers (oUID, oName, oDescribe, oPrice, oValues) VALUES (?, ?, ?, ?, ?)',
      [id, name, description, price, value],
      (err, results) => {
        if (err) {
          console.error("DB insert error:", err);
          return res.status(500).send("Server error when creating offer");
        }

        res.status(200).send({
          message: "Offer created successfully",
        });
      }
    );
  } catch (err) {
    console.error("Unexpected server error:", err);
    res.status(500).send("Unexpected server error");
  }
});

app.post("/check-my-offers", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    connection.query('SELECT * FROM offers WHERE oUID = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Server error when checking offers" });
      if (results.length === 0) return res.status(404).send("Offers not found");

      res.status(200).json({
        message: "Offers found successfully",
        offers: results
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Unexpected server error" });
  }
});

app.post("/delete-offer", async (req: Request, res: Response) => {
  const { oID } = req.body;

  if (!oID) return res.status(400).json({ error: "Offer ID is required" });

  try {
    connection.query('DELETE FROM offers WHERE oID = ?', [oID], (err, results) => {
      if (err) {
        console.error("DB delete error:", err);
        return res.status(500).json({ error: "Server error when deleting offer" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Offer not found" });
      }

      res.status(200).json({ message: "Offer deleted successfully" });
    });
  } catch (err) {
    console.error("Unexpected server error:", err);
    res.status(500).json({ error: "Unexpected server error" });
  }
});



app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
