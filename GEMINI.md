# GEMINI.md

## Project Overview
This project is a containerized full-stack "Task Manager" application created for the Docker course defense (**soutenance**). It demonstrates advanced Docker concepts including multi-service orchestration, network isolation, and data persistence.

### Core Technologies
- **Docker**: Container engine.
- **Docker Compose**: Orchestration tool for multi-container deployment.
- **Node.js (Express)**: Backend API handling business logic.
- **MongoDB**: NoSQL database for task storage.
- **Nginx**: High-performance web server and reverse proxy.

## Architecture & Security
- **Service Isolation**: 
    - `frontend` and `backend` communicate over the `frontend-backend` network.
    - `backend` and `mongodb` communicate over the `backend-db` network.
    - **Security**: The database is inaccessible from the frontend, preventing direct exposure.
- **Data Persistence**: A named volume `mongodb_data` is used to ensure tasks survive container restarts and removals.
- **Reliability**:
    - **Healthchecks**: The backend waits for MongoDB to be "healthy" before starting.
    - **Restart Policies**: All containers are configured to restart automatically on failure.

## Getting Started

### Building and Running
To deploy the entire stack:
```bash
docker compose up --build -d
```
Access the application at: **`http://localhost:8080`**

### Verifying Persistence
1. Add tasks in the UI.
2. Run `docker compose down`.
3. Run `docker compose up -d`.
4. Refresh the browser; your tasks will still be there.

## Documentation Reference
- **`etapes.md`**: Detailed implementation steps, technical choices, and testing guide.
- **`f8r0rxn.pdf`**: Original project requirements.
