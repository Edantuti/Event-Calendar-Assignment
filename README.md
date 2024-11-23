
# Event Calendar Assignment

A web implementation of an event calendar app.

---

## Features

- Frontend built with **React.js** (Vite) and compatible with an **Express-based REST API**.
- Basic user authentication using **JWT**.
- Manage events: **Create**, **Edit**, **Delete** with details (Title, Description, Start/End Time).
- Toggle between **Monthly** and **Weekly** calendar views.
- Event data stored securely in a **PostgreSQL** database.
- **Privacy-focused**: No event data leaks.

---

## Setup Instructions

### Clone the Repository

Use the following commands to clone the repository and navigate to the project directory:

```bash
git clone git@github.com:Edantuti/event-calendar-assignment.git
cd event-calendar-assignment
```

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Configure the `.env` file with the necessary database credentials(Below Provided Credentials are dummy):

    ```env
    POSTGRES_URL=http://localhost:5432
    POSTGRES_USER=sam_sepi0l
    POSTGRES_DB=sd
    POSTGRES_PASSWORD=1234567
    DEV=false
    ```

4. Start the backend server:

    ```bash
    pnpm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Start the development server:

    ```bash
    pnpm dev
    ```

---

### Ready to Go!

Your **Event Calendar App** is now running. Visit the provided local URL from the frontend setup to use the application.
[Live Link](https://event-calendar-assignment-sigma.vercel.app/)
