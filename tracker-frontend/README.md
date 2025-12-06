# GameBacklogTracker Frontend

This project is the frontend application for the GameBacklogTracker, built using React. It provides a user interface for managing a personal game backlog, including authentication, game browsing, dashboard insights, and user-specific game management.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly styling components.
- **React Router DOM**: For declarative routing in the application.
- **Context API**: For global state management, particularly for authentication.
- **Axios (or Fetch API)**: For making HTTP requests to the backend API.
- **React Icons**: For various icons used throughout the application.

## Features

- User Authentication (Login, Register, Logout)
- Dashboard with user statistics and game summaries
- Browse and discover games
- Manage user's personal game backlog (add, update, remove games)
- Filtering and pagination for game lists
- Responsive design for various screen sizes

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/GameBacklogTracker.git
    cd GameBacklogTracker/tracker-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `tracker-frontend` directory based on `.env.example` (if provided).
    A typical setup might include:

    ```
    REACT_APP_API_BASE_URL=http://localhost:8080/api
    ```

    Ensure this points to your running backend API.

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will typically run on `http://localhost:3000`.

## Usage

- **Register/Login**: Access the authentication pages to create an account or log in.
- **Dashboard**: View your personal game backlog statistics and recent activity.
- **Games**: Browse available games, apply filters, and add them to your backlog.
- **Library/Wishlist**: Manage your personal collection of games.

## Project Structure

```
tracker-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, logos
│   ├── components/
│   │   ├── auth/           # Login, Register pages/components
│   │   ├── common/         # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── dashboard/      # Dashboard specific components
│   │   ├── games/          # Game browsing and detail components
│   │   └── landingPage/    # Components for the landing page
│   ├── context/            # React Context for global state (e.g., AuthContext)
│   ├── App.jsx             # Main application component
│   ├── index.jsx           # Entry point for the React app
│   ├── index.css           # Global styles and Tailwind directives
│   └── ...                 # Other utility files, tests
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── ...
```

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## Contact

For any questions or suggestions, please open an issue in the repository.
