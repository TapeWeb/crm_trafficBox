import { makeAutoObservable, runInAction } from "mobx";
import Swal from "sweetalert2";
import TokenStore from "./token.store.ts";

export type Gender = "Male" | "Female" | "DontTalkAboutGender";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  gender: Gender;
  role: string;
  balance: number;
  avatarUrl?: string;
}

class UserStore {
  id: number = 0;
  name: string = "";
  surname: string = "";
  age: number | "" = "";
  email: string = "";
  password: string = "";
  gender: Gender = "Male";
  role: string = "User";
  balance: number = 0;
  avatarUrl: string = "";

  users: IUser[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeData = <K extends keyof UserStore>(field: K, value: UserStore[K]) => {
    (this as any)[field] = value;
  }

  removeAllData = async () => {
    try {
      this.id = 0;
      this.name = "";
      this.surname = "";
      this.age = "";
      this.email = "";
      this.password = "";
      this.gender = "Male";
      this.role = "User";
      this.balance = 0;
    } catch (err) {
      await Swal.fire()
    }
  }

  fetchUsers = async () => {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    })
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/getAllUsers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) return console.error(await res.text());

      const result: IUser[] = await res.json();

      runInAction(() => {
        this.users = Array.isArray(result)
          ? result.map((user) => ({
            id: user.id,
            name: user.name,
            surname: user.surname,
            age: user.age,
            email: user.email,
            gender: user.gender,
            role: user.role,
            balance: user.balance,
          }))
          : [];
      });
    } catch (err: any) {
      console.error("Error when load users:", err);
      runInAction(() => {
        this.error = err.message || "Error when load users";
        this.users = [];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  removeUser = async (user: any) => {
    try {
      if (user.role === "Admin") return await Swal.fire({
        icon: 'error',
        title: 'Admin cannot be removed!',
        showConfirmButton: false,
        timer: 1500
      })

      const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/removeUser/${user.uid}`, {
        method: "DELETE",
      });

      if (!response.ok) return await Swal.fire({
        icon: 'error',
        title: 'Failed to remove user!',
        showConfirmButton: false,
        timer: 1500
      });

      await Swal.fire({
        icon: 'success',
        title: 'User removed successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      await this.fetchUsers();
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Failed to remove user!',
        showConfirmButton: false,
      });
    }
  };

  logOut = async () => {
    await this.removeAllData();
    localStorage.removeItem("token");
    TokenStore.removeToken();
  };


  createAccount = async () => {
    if (!this.name || !this.surname || !this.age || !this.email || !this.password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          surname: this.surname,
          age: Number(this.age),
          email: this.email,
          password: this.password,
          gender: this.gender,
          role: this.role,
        })
      });
      if (!res.ok) return console.error(await res.text());
      const data = await res.json();
      await Swal.fire({
        icon: 'success',
        title: 'Account created successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      runInAction(() => {
        this.id = 0;
        this.name = "";
        this.surname = "";
        this.age = "";
        this.email = "";
        this.password = "";
        this.gender = "Male";
        this.role = "User";
        this.balance = 0;
      });

      localStorage.setItem("token", data.token);
      TokenStore.token = data.token;
    }
    catch (err) {
      console.error(err);
    }
  }

  checkUser = async () => {
    if (!this.email?.trim() || !this.password?.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all fields.",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/checkUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });


      if (!res.ok) {
        await Swal.fire({
          icon: 'error',
          title: 'Failed to log in!',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      const data = await res.json();
      if (data.error) return alert(data.error);

      localStorage.setItem("token", data.token);
      TokenStore.token = data.token;
      await this.fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };


  getCurrentUser = async () => {
    try {
      const user = await TokenStore.getUserByToken();
      if (!user) return null;

      runInAction(() => {
        this.id = user.uid;
        this.name = user.name;
        this.surname = user.surname;
        this.age = user.age;
        this.email = user.email;
        this.gender = user.gender;
        this.role = user.role;
        this.balance = user.balance;
      });

      return user;
    } catch (err) {
      console.error("Error loading current user:", err);
      return null;
    }
  };

}

export default new UserStore();
