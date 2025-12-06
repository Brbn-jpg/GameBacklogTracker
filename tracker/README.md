# Game Backlog Tracker

Welcome to the Game Backlog Tracker API! This is a backend service built with Java and Spring Boot that allows users to manage their video game backlog. Users can register, log in, search for games, add them to their personal backlog, and track their status (e.g., Playing, Completed, Ditched), rating, and hours played.

## ✨ Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Game Database**: A comprehensive database of games that can be searched and filtered.
- **CSV Import**: Admins can upload a CSV file to populate the game database.
- **Personal Backlog Management**: Users can add games to their list, update their status, rating, and playtime.
- **Profile Management**: Users can view and manage their own profiles.
- **Backlog Statistics**: Get statistics about your backlog, such as total games, completion status, and average rating.

## 🛠️ Technologies Used

- **Java 17**
- **Spring Boot 3**: For building the REST API.
- **Spring Security**: For handling authentication and authorization.
- **Spring Data JPA (Hibernate)**: For data persistence.
- **PostgreSQL**: As the relational database.
- **Maven**: As the build tool and dependency manager.
- **Lombok**: To reduce boilerplate code.
- **jjwt**: For creating and parsing JSON Web Tokens.
- **OpenCSV**: For parsing the game data from CSV files.

---

## 🚀 API Endpoints

Below is a detailed description of all available API endpoints.

**Authentication Required**: Endpoints marked with 🔐 require a valid JWT to be sent in the `Authorization` header.

Format: `Authorization: Bearer <YOUR_JWT_TOKEN>`

### Authentication (`/auth`)

#### 1. Register a New User

- **Endpoint**: `POST /auth/register`
- **Description**: Creates a new user account.
- **Request Body**:
  ```json
  {
    "username": "your_username",
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "token": "ey..."
  }
  ```

#### 2. Log In

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns a JWT.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "token": "ey..."
  }
  ```

### Users (`/users`)

#### 1. Get All Users

- **Endpoint**: `GET /users/all`
- **Description**: Retrieves a list of all registered users and their game backlogs.
- **Success Response (200 OK)**:
  ```json
  [
    {
      "username": "mirek",
      "userGames": [
        {
          "id": 1,
          "status": "PLAYING",
          "rating": 8,
          "hoursPlayed": 25.5,
          "addedAt": "2023-10-27",
          "gameName": "The Witcher 3: Wild Hunt"
        }
      ]
    }
  ]
  ```

#### 2. Get User by ID

- **Endpoint**: `GET /users/{userId}`
- **Description**: Retrieves a single user by their unique ID.
- **Success Response (200 OK)**:
  ```json
  {
    "username": "mirek",
    "userGames": []
  }
  ```

#### 3. Search Users by Username

- **Endpoint**: `GET /users?username={name}`
- **Description**: Searches for users whose username contains the provided string.
- **Success Response (200 OK)**: A list of user objects, similar to "Get All Users".

#### 4. Update Current User 🔐

- **Endpoint**: `PATCH /users/me`
- **Description**: Updates the username, email, or password of the currently authenticated user.
- **Request Body**:
  ```json
  {
    "username": "new_username",
    "email": "new_email@example.com",
    "password": "new_strong_password"
  }
  ```
- **Success Response (200 OK)**: The updated user object.

#### 5. Delete Current User 🔐

- **Endpoint**: `DELETE /users/me`
- **Description**: Deletes the account of the currently authenticated user.
- **Success Response (200 OK)**:
  ```json
  true
  ```

### Games (`/games`)

#### 1. Get All Games (with filtering and pagination)

- **Endpoint**: `GET /games`
- **Description**: Retrieves a paginated list of games. Supports extensive filtering via query parameters.
- **Query Parameters**: `page`, `size`, `name`, `price`, `releaseDate`, `developers`, `publishers`, `windows`, `mac`, `linux`, `genres`, `categories`, `tags`.
- **Success Response (200 OK)**: A Spring Data `Page` object containing game details.

#### 2. Get Game by ID

- **Endpoint**: `GET /games/{id}`
- **Description**: Retrieves a single game by its unique ID.
- **Success Response (200 OK)**: A full game object.

#### 3. Upload Games via CSV 🔐

- **Endpoint**: `POST /games/upload`
- **Description**: Allows an authenticated user (intended for admins) to upload a CSV file to bulk-add games to the database.
- **Request**: `multipart/form-data` with a file part.
- **Success Response (200 OK)**: The number of games successfully added.
- **Games Dataset**:
  - The pre-populated game data can be found at this [Google Drive link](https://drive.google.com/file/d/11-5uNB7viBReZskab1_ZqwBdMYHNcEqs/view?usp=drive_link).
  - This is a cleaned version of the [93182 Steam Games dataset](https://www.kaggle.com/datasets/joebeachcapital/top-1000-steam-games) from Kaggle.
  - Data cleaning was performed by [perp](https://github.com/Perpluu).

#### 4. Delete a Game 🔐

- **Endpoint**: `DELETE /games/{id}`
- **Description**: Allows an authenticated user (intended for admins) to delete a game from the database.
- **Success Response (200 OK)**: No content.

### User-Game Library (`/usergames`)

These endpoints manage the relationship between a user and a game in their backlog.

#### 1. Get Current User's Backlog 🔐

- **Endpoint**: `GET /usergames`
- **Description**: Retrieves all games in the currently authenticated user's backlog.
- **Success Response (200 OK)**: A list of `UserGame` objects.

#### 2. Add a Game to Backlog 🔐

- **Endpoint**: `POST /usergames/{gameId}`
- **Description**: Adds a game (by its ID) to the current user's backlog.
- **Success Response (200 OK)**: The newly created `UserGame` object.

#### 3. Update a Game in Backlog 🔐

- **Endpoint**: `PATCH /usergames/{userGameId}`
- **Description**: Updates the status, rating, or hours played for a specific game in the user's backlog. The `userGameId` is the ID of the entry in the `usergame` table, not the game's ID.
- **Request Body**:
  ```json
  {
    "status": "PLAYING",
    "rating": 9,
    "hoursPlayed": 40.0
  }
  ```
- **Success Response (200 OK)**: The updated `UserGame` object.

#### 4. Remove a Game from Backlog 🔐

- **Endpoint**: `DELETE /usergames/{userGameId}`
- **Description**: Removes a game from the user's backlog.
- **Success Response (200 OK)**:
  ```json
  true
  ```

#### 5. Get Backlog Statistics 🔐

- **Endpoint**: `GET /usergames/stats`
- **Description**: Retrieves statistics for the current user's backlog.
- **Success Response (200 OK)**:
  ```json
  {
    "totalGames": 15,
    "gamesByStatus": {
      "COMPLETED": 5,
      "PLAYING": 2,
      "DITCHED": 3,
      "NOT_PLAYED": 5
    },
    "totalHoursPlayed": 350.5,
    "averageRating": 7.8
  }
  ```

---

## ⚙️ Setup and Installation

1.  **Prerequisites**:

    - Java 17 or later
    - Maven
    - Docker and Docker Compose

2.  **Clone the repository**:

    ```bash
    git clone https://github.com/brbn-jpg/GameBacklogTracker.git
    cd GameBacklogTracker/tracker
    ```

3.  **Configure the application**:

    Create a `.env` file in the root directory of the `tracker` project by copying the example below. This file is used by Docker Compose to configure the application and database.

    ```bash
    # .env file

    # PostgreSQL Database Settings
    POSTGRES_DB="game_backlog"
    POSTGRES_USER="gameuser"
    POSTGRES_PASSWORD="gamepass"

    # Spring Boot Database Connection URL (for use inside Docker)
    DB_URL="jdbc:postgresql://gamebacklog_db:5432/game_backlog"

    # JWT Secret Key (must be Base64 encoded and at least 256 bits)
    JWT_KEY="YOUR_SECURE_BASE64_ENCODED_256_BIT_KEY"
    ```

    **How to generate a secure JWT_KEY?**
    You can generate a secure, 256-bit (32-byte) key and encode it in Base64 using the following command in your terminal:
    `python -c "import os, base64; print(base64.b64encode(os.urandom(32)).decode('utf-8'))"`
    Will create generating key in future commits.

4.  **Run the application**:

    Use Docker Compose to build and run the application and the database containers.

    ```bash
    docker-compose up --build
    ```

The API will be available at `http://localhost:8080`.
