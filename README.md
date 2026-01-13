# Game Backlog Tracker

Game Backlog Tracker is a full-stack web application designed to help users organize their video game libraries. It allows users to track their progress, rate games, manage a wishlist, and interact with friends.

This repository is a monorepo containing both the server-side API and the client-side user interface.

## Repository Structure

The project is divided into two main directories:

*   **tracker/**: The backend API built with Java, Spring Boot, PostgreSQL, and Redis.
*   **tracker-frontend/**: The frontend application built with React and Tailwind CSS.

## Prerequisites

Before starting, ensure you have the following installed on your machine:

*   **Docker & Docker Compose**: Required for running the backend API, database, and cache.
*   **Node.js (v18 or higher) & npm**: Required for running the frontend application.
*   **Git**: For cloning the repository.

## Quick Start Guide

To run the application locally, you will need to set up the backend and frontend separately. Follow the steps below.

### 1. Backend Setup (Docker)

The backend relies on environment variables for database and security configurations.

1.  Navigate to the backend directory:
    ```bash
    cd tracker
    ```

2.  Create a `.env` file in the `tracker` directory. You can use the following template:

    ```env
    # Database Configuration
    POSTGRES_DB=game_backlog
    POSTGRES_USER=gameuser
    POSTGRES_PASSWORD=gamepass
    
    # JDBC URL for Docker internal network
    DB_URL=jdbc:postgresql://gamebacklog_db:5432/game_backlog

    # Redis Configuration
    REDIS_HOST=gamebacklog_redis_cache
    REDIS_PORT=6379
    REDIS_PASSWORD=your_redis_password

    # Security
    # Generate a secure Base64 key (e.g., using Python: import secrets; print(secrets.token_urlsafe(32)))
    JWT_KEY=YOUR_SECURE_BASE64_ENCODED_KEY

    # Email Service (Gmail SMTP)
    GOOGLE_SMTP_EMAIL=your_email@gmail.com
    GOOGLE_SMTP_KEY=your_app_password
    ```

3.  Build and start the services using Docker Compose:
    ```bash
    docker-compose up --build
    ```

    *   The API will be available at `http://localhost:8080/v1`.
    *   PostgreSQL will run on port `5433` (mapped from 5432).
    *   Redis will run on port `6379`.

### 2. Frontend Setup (React)

Once the backend is running, open a new terminal window to set up the frontend.

1.  Navigate to the frontend directory:
    ```bash
    cd tracker-frontend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```

    *   The application will automatically open in your browser at `http://localhost:3000`.
    *   The frontend is configured to proxy API requests to `http://localhost:8080`.

## Features

*   **User Accounts**: Secure registration, login, and profile management with email verification.
*   **Game Library**: Add games to your collection, categorize them by status (Playing, Completed, Ditched, Not Played), and track hours played.
*   **Kanban Dashboard**: A visual board to manage your current gaming progress.
*   **Advanced Search**: Filter games by platform, genre, developer, and release date.
*   **Social**: Find other users, send friend requests, and view their libraries (if public).
*   **Wishlist**: Keep track of games you want to play in the future.

## Technology Stack

### Backend
*   **Java 21**
*   **Spring Boot 3** (Web, Security, Data JPA, Mail)
*   **PostgreSQL** (Primary Database)
*   **Redis** (Caching)
*   **Docker** (Containerization)

### Frontend
*   **React 19**
*   **Tailwind CSS** (Styling)
*   **React Router DOM** (Routing)
*   **React DnD** (Drag and Drop functionality)

## Development Notes

*   **Database Access**: You can connect to the PostgreSQL database running in Docker using a tool like DBeaver or pgAdmin via `localhost:5433` using the credentials defined in your `.env` file.
*   **API Documentation**: Refer to the `README.md` file inside the `tracker` directory for a detailed list of API endpoints.