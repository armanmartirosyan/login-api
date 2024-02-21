# Express MySQL Auth API

This project is an Express.js API for user authentication using MySQL as the database. It provides endpoints for user registration, login, token refresh, user verification, and logout.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Request/Response Payloads](#requestresponse-payloads)
- [Dependencies](#dependencies)
- [Generating Keys](#generating-keys)
- [Database Schema](#database-schema)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/armanmartirosyan/login-api.git
   ```

2. **Install dependencies:**

    ```bash
    cd login-api
    npm install
    ```

## Usage

### Endpoints

- **GET /auth/verify-user**: Verify if a user is logged in.
- **POST /auth/login**: Login a user and obtain access and refresh tokens.
- **POST /auth/register**: Register a new user and obtain access and refresh tokens.
- **POST /auth/refresh-token**: Refresh the access and refresh tokens.
- **DELETE /auth/logout**: Logout a user.

### Request/Response Payloads

- **POST /auth/login**

   ```json
    {
        "email": "user@example.com",
        "password": "password"
    }

- **Response:**

   ```json
   {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   }

For more details on request payloads and responses for each endpoint, please refer to the source code.

## Dependencies

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [http-errors](https://www.npmjs.com/package/http-errors)
- [joi](https://www.npmjs.com/package/joi)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Generating Keys

The script for generating access and refresh tokens is stored in the `helpers` folder. To use it, navigate to the project directory and run the following command:

   ```bash
   node ./helpers/generateKeys.js
   ```

## Database Schema

You'll need to set up a MySQL database with at least the following tables:

- users
  - id (int, auto_increment, primary key)
  - name (varchar)
  - email (varchar)
  - password (varchar)
- invalidated_tokens
  - id (int, auto_increment, primary key)
  - token (varchar)
  - invalidated_at (timestamp)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
