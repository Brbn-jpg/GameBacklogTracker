# Game Backlog Tracker - Backend API

This repository contains the backend source code for the Game Backlog Tracker application. It is a RESTful API built with Java and Spring Boot, designed to help users manage their video game libraries, track gameplay progress, and interact with friends.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Installation and Running](#installation-and-running)
  - [Using Docker](#using-docker)
  - [Manual Setup](#manual-setup)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Games](#games)
  - [User Library (Backlog)](#user-library-backlog)
  - [Friends System](#friends-system)
- [Database Schema](#database-schema)
- [Testing](#testing)

## Overview

The Game Backlog Tracker API provides functionalities for:
- User registration and secure authentication using JWT (JSON Web Tokens).
- Email verification and password reset flows.
- Managing a personal backlog of games with statuses (e.g., Playing, Completed, Ditched).
- Tracking hours played and rating games.
- **IGDB Integration**: Global search and browsing of thousands of games via the IGDB API.
- **Dynamic Game Import**: Automatically import games from IGDB into the local database when users add them to their backlog.
- Social features including friend requests and viewing friends' profiles.
- Bulk import of game data via CSV.

## Technologies

- **Language:** Java 21
- **Framework:** Spring Boot 3.5.9
- **Security:** Spring Security, JJWT (Java JWT)
- **Database:** PostgreSQL 15
- **Caching:** Redis 6.2
- **Persistence:** Spring Data JPA (Hibernate)
- **Build Tool:** Maven
- **Utilities:** Lombok, OpenCSV
- **Containerization:** Docker, Docker Compose

## Architecture

The application follows a standard layered architecture:
1.  **Controller Layer**: Handles HTTP requests and responses (REST controllers).
2.  **Service Layer**: Contains business logic and transaction management.
3.  **Repository Layer**: Interacts with the database using Spring Data JPA interfaces.
4.  **Model/Entity Layer**: Defines the data structure mapping to database tables.
5.  **DTO (Data Transfer Object) Layer**: Defines the structure of data sent between the client and server.

## Prerequisites

Ensure you have the following installed on your system:
- Java Development Kit (JDK) 21
- Maven
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)
- Redis (if running locally without Docker)

## Configuration

The application requires environment variables for database connections, security keys, and email services.

Create a `.env` file in the `tracker` directory (or ensure your environment provides these variables).

**Required Environment Variables:**

- `POSTGRES_DB`: Name of the PostgreSQL database.
- `POSTGRES_USER`: PostgreSQL username.
- `POSTGRES_PASSWORD`: PostgreSQL password.
- `DB_URL`: JDBC URL for connecting to the database (e.g., `jdbc:postgresql://gamebacklog_db:5432/game_backlog` for Docker or `jdbc:postgresql://localhost:5432/game_backlog` for local).
- `JWT_KEY`: A Base64-encoded 256-bit secret key for signing JWT tokens.
- `REDIS_PASSWORD`: Password for the Redis instance.
- `REDIS_HOST`: Hostname of the Redis server (defaults to `gamebacklog_redis_cache` in Docker).
- `REDIS_PORT`: Port of the Redis server (defaults to `6379`).
- `GOOGLE_SMTP_EMAIL`: Email address used for sending system emails (e.g., verification codes).
- `GOOGLE_SMTP_KEY`: App password or API key for the SMTP service.
- `IGDB_CLIENT_ID`: Your Twitch/IGDB Developer Client ID.
- `IGDB_CLIENT_SECRET`: Your Twitch/IGDB Developer Client Secret.

## Installation and Running

### Using Docker

This is the recommended way to run the application as it sets up the database, Redis cache, and backend service automatically.

1.  Navigate to the `tracker` directory.
2.  Ensure your `.env` file is configured.
3.  Run the following command:

    ```bash
    docker-compose up --build
    ```

The API will be accessible at `http://localhost:8080/v1`.

### Manual Setup

1.  Start your local PostgreSQL and Redis servers.
2.  Update `src/main/resources/application.yml` or set environment variables to point to your local database instances.
3.  Build the project using Maven:

    ```bash
    ./mvnw clean install
    ```

4.  Run the application:

    ```bash
    ./mvnw spring-boot:run
    ```

## API Endpoints

All endpoints are prefixed with `/v1`.

### Authentication

- `POST /auth/register`: Register a new user account.
- `POST /auth/login`: Authenticate and receive a JWT.
- `POST /auth/verify`: Verify a user account using the code sent via email.
- `POST /auth/forgot-password`: Request a password reset link.
- `POST /auth/reset-password`: Reset password using a valid token.

### Users

- `GET /users/all`: Retrieve all users (public profiles).
- `GET /users/{userId}`: Retrieve a specific user by ID.
- `GET /users?username={name}`: Search for users by username.
- `GET /users/me`: Get the currently authenticated user's profile.
- `PATCH /users/me/email`: Update email.
- `PATCH /users/me/password`: Update password.
- `PATCH /users/me/username`: Update username.
- `PATCH /users/me/public`: Update profile visibility (public/private).
- `DELETE /users/me`: Delete the current user account.

### Games

- `GET /games`: Retrieve a paginated list of games. Supports filtering by:
    - `page`, `size`
    - `name`
    - `price`
    - `releaseDate`
    - `developers`, `publishers`
    - `genres`, `categories`, `tags`
    - `windows`, `mac`, `linux` (OS support)
- `GET /games/{id}`: Retrieve details for a specific game.
- `GET /games/filters/genres`: Get a list of all available genres.
- `GET /games/filters/categories`: Get a list of all available categories.
- `GET /games/filters/tags`: Get a list of all available tags.
- `POST /games/uploadCsv`: Upload a CSV file to bulk import games (Admin/Auth required).
- `DELETE /games/{id}`: Delete a game (Admin/Auth required).

### IGDB (Global Game Database)

- `GET /igdb/search?name={query}&page={n}`: Search for games in the global IGDB database.
- `GET /igdb/{igdbId}`: Retrieve detailed information for a specific game from IGDB.

### User Library (Backlog)

- `GET /usergames`: Retrieve the current user's backlog.
- `POST /usergames`: Add a game to the backlog.
    - Body: `{ "gameId": 123, "status": "NOT_PLAYED" }`
- `PATCH /usergames/{userGameId}`: Update a backlog entry (status, rating, hours played).
- `DELETE /usergames/{userGameId}`: Remove a game from the backlog.
- `GET /usergames/stats`: Get statistics for the current user's backlog.
- `GET /usergames/allstats`: Get global statistics across all users.

### Friends System

- `POST /userfriend/add`: Send a friend request.
    - Body: `{ "targetUserUsername": "friendName" }`
- `POST /userfriend/accept/{id}`: Accept a friend request.
- `POST /userfriend/decline/{id}`: Decline a friend request.
- `DELETE /userfriend/remove`: Remove a friend.
- `GET /userfriend/all`: List all accepted friends.
- `GET /userfriend/friendRequests`: List all pending friend requests.
- `GET /userfriend/search`: Search for users to add as friends, displaying request status.

## Database Schema

- **users**: Stores user account information (credentials, profile settings).
- **games**: Stores static game data (title, description, metadata).
- **usergame**: Junction table linking Users and Games, storing user-specific data (status, rating, playtime).
- **userFriend**: Manages relationships between users (requests and accepted friendships).

## Testing

To run the unit and integration tests:

```bash
./mvnw test
```