# TrafficBox

**TrafficBox** is a web application that allows users to manage their product offers and view offers from other users. The project combines a simple user interface with a reliable backend, providing convenient features for handling user accounts and products.

## Features

The application supports user registration and authentication. Once logged in, users can view their profiles, create new product offers, and delete them. Additionally, users can view all available offers on the platform. All authentication is based on secure tokens, and user passwords are stored encrypted using bcrypt.

## Technologies Used

- **Backend:** Node.js, Express, Prisma, MySQL
- **Frontend:** React, TypeScript, SCSS
- **Security:** bcrypt for password hashing, tokens for authorization

## Installation and Running

1. Clone the repository:

```bash
git clone https://github.com/yourusername/trafficbox.git
cd trafficbox
```

2. Install dependencies for both server and client:

```bash
cd server
npm install
cd ../client
npm install
```

3. Configure the database connection and environment variables in a `.env` file:

```env
DATABASE_URL="mysql://user:password@localhost:3306/trafficbox"
CLIENT_PORT=5173
SERVER_PORT=3000
```

4. Start the server and client:

```bash
# Server
cd server
npm run dev

# Client
cd ../client
npm run dev
```

The application will be accessible at `http://localhost:5173` for the frontend and `http://localhost:3000` for the API.

## Usage

After registering and logging in, users can:

- View their profile and personal information
- Create new product offers
- View their offers on the "My Offers" page
- Delete their offers
- Browse all offers available on the platform

## Project Structure

- `/client` — frontend built with React and TypeScript
- `/server` — backend with Node.js and Express
- `/config` — database and environment configurations
- `/routes` — API routes
- `/services` — application business logic
- `/middlewares` — request middleware handlers
