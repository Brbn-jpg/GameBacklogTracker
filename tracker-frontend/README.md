# GameLog Frontend

This repository contains the client-side application for GameLog, a video game backlog tracking system. Built with React and Tailwind CSS, it provides a modern, responsive interface for users to manage their game libraries, track progress via a Kanban board, and interact with other users.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## Overview

GameLog Frontend is a Single Page Application (SPA) designed to interface with the GameBacklogTracker backend API. It focuses on user experience, utilizing glassmorphism design principles, drag-and-drop interactions for status management, and dynamic data visualization for user statistics.

## Features

### User Management
- **Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Profile Management**: Users can update their username, email, password, and toggle profile visibility (Public/Private).
- **Password Recovery**: Integrated flow for forgot password and reset password via email tokens.

### Dashboard & Library
- **Kanban Board**: A drag-and-drop interface to move games between statuses: Ditched, Not Played, Playing, and Completed.
- **Statistics**: Visual breakdown of total games, hours played, and average ratings.
- **Library Management**: Comprehensive list view of all owned games with filtering capabilities.
- **Wishlist**: dedicated section for games users plan to acquire.

### Game Discovery
- **Browsing**: Paginated view of available games.
- **Advanced Filtering**: Filter games by name, price, release date, developers, publishers, platforms (Windows, Mac, Linux), genres, categories, and tags.
- **Game Details**: Detailed view including description, developer info, screenshots (with lightbox viewer), and personal tracking data (status, rating, hours).

### Social System
- **Friend Discovery**: Search for other users by username.
- **Friend Requests**: Send, accept, and decline friend requests.
- **Friend Profiles**: View friends' libraries and statistics (subject to privacy settings).

## Technology Stack

- **Core Framework**: React 19
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 3
- **State Management**: React Context API (AuthContext)
- **Interactions**: React DnD (Drag and Drop)
- **Notifications**: React Hot Toast
- **HTTP Client**: Native Fetch API
- **Build Tooling**: React Scripts with React App Rewired

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18 or higher is recommended.
- **npm**: Generally installed with Node.js.
- **Backend API**: The GameBacklogTracker backend service must be running locally on port 8080.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd tracker-frontend
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

## Configuration

The application is currently configured to communicate with the backend at `http://localhost:8080/v1`.

If your backend service is running on a different host or port, you will need to update the API fetch calls located in the service components.

## Running the Application

### Development Mode

To start the application in development mode:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### Production Build

To build the application for production to the `build` folder:

```bash
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Project Structure

The project follows a component-based architecture:

```
src/
├── assets/             # Static images and logos
├── components/
│   ├── auth/           # Login, Register, Password Reset forms
│   ├── common/         # Reusable components (Navbar, Footer, Pagination, Lightbox)
│   ├── dashboard/      # Main user dashboard, Kanban board, Stats
│   ├── friends/        # Friend search, lists, and request management
│   ├── games/          # Game browsing, filtering, and detail pages
│   ├── landingPage/    # Public landing page components
│   ├── library/        # User game library views
│   ├── settings/       # User account settings forms
│   └── wishlist/       # Wishlist management
├── context/            # Global state providers (AuthContext)
├── App.jsx             # Main application router and layout
├── index.css           # Global Tailwind CSS directives
└── index.jsx           # Application entry point
```

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in the development mode.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Launches the test runner in the interactive watch mode.
- **`npm run eject`**: Removes the single build dependency from your project (use with caution).