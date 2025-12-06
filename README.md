# GameBacklogTracker

The GameBacklogTracker is a full-stack application designed to help users manage their video game backlogs. It allows users to track games they own, games they want to play, their progress, ratings, and more. The application consists of a RESTful API backend built with Spring Boot and a dynamic frontend user interface built with React.

## Features

### Backend (RESTful API)

- User Authentication and Authorization (JWT-based)
- User Management
- Game Data Management
- User-specific Game Backlog Management
- Search and Filtering Capabilities
- Role-based Access Control

### Frontend (User Interface)

- Intuitive Dashboard with user statistics
- Browse and discover games
- Add, update, and remove games from your personal backlog
- Filter and sort games in your library
- Responsive design for various devices

## Technologies Used

### Backend

- **Java**: Programming language
- **Spring Boot**: Framework for building the RESTful API
- **Spring Security**: For authentication and authorization (JWT)
- **Maven**: Dependency management and build automation
- **JPA/Hibernate**: For database interaction and object-relational mapping
- **H2 Database (Development)**: In-memory database for development
- **PostgreSQL (Production/Docker)**: Relational database for production environments (or similar)

### Frontend

- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router DOM**: For client-side routing
- **Context API**: For global state management (e.g., authentication)
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library

## Architecture

The application follows a client-server architecture:

- The **Frontend** (React application) communicates with the **Backend** (Spring Boot API) via RESTful HTTP requests.
- The **Backend** handles business logic, data persistence, and security, interacting with a relational database.
- JWT (JSON Web Tokens) are used for securing API endpoints and maintaining user sessions.

## Getting Started

To set up and run the entire GameBacklogTracker project locally, follow these steps.

### Prerequisites

- **Java Development Kit (JDK) 17+**
- **Maven 3.6+**
- **Node.js 18+**
- **npm 9+ or Yarn 1.22+**
- (Optional for Docker setup) **Docker and Docker Compose**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/GameBacklogTracker.git
cd GameBacklogTracker
```

### 2. Backend Setup

Navigate to the `tracker` directory:

```bash
cd tracker
```

**a. Database Configuration:**
The backend is configured to use an in-memory H2 database for development by default, which means you can run it directly without external database setup.
For production or persistent data, you can configure `src/main/resources/application.yml` to connect to a PostgreSQL or other relational database.

**b. Build the Backend:**

```bash
./mvnw clean install
```

**c. Run the Backend:**

```bash
./mvnw spring-boot:run
```

The backend API will start on `http://localhost:8080` (or configured port).

### 3. Frontend Setup

Open a **new terminal** and navigate to the `tracker-frontend` directory:

```bash
cd ../tracker-frontend
```

**a. Install Dependencies:**

```bash
npm install
# or
yarn install
```

**b. Environment Variables:**
Create a `.env` file in the `tracker-frontend` directory. Ensure `REACT_APP_API_BASE_URL` points to your running backend.

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

**c. Run the Frontend:**

```bash
npm start
# or
yarn start
```

The React application will open in your browser, typically at `http://localhost:3000`.

### Running with Docker (Recommended)

If you have Docker and Docker Compose installed, you can run both backend and database using the provided `docker-compose.yml` (located in the `tracker` directory).

1.  **Build Docker images:**
    ```bash
    docker-compose build
    ```
2.  **Start services:**
    ```bash
    docker-compose up
    ```
    This will start both the backend and database, as defined in the `docker-compose.yml`.
3.  **Start frontend**
    ```bash
    npm start
    ```
    Make sure you have installed dependencied before running frontend.

## Project Structure (Monorepo)

```
GameBacklogTracker/
├── tracker/                    # Backend (Spring Boot API)
│   ├── src/                    # Java source code, resources
│   ├── pom.xml                 # Maven project file
│   └── docker-compose.yml      # Docker Compose for backend and optional database
└── tracker-frontend/           # Frontend (React Application)
    ├── public/                 # Static assets
    ├── src/                    # React components, styles, logic
    ├── package.json            # Node.js dependencies
    └── tailwind.config.js      # Tailwind CSS configuration
```

## Contact

For any questions or suggestions, please open an issue in the GitHub repository.
