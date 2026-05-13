# Lead Management System

A full-stack web application designed to help manage leads efficiently. The system allows users to create, view, update, and delete leads, providing a clean and responsive user interface to track potential customers.

## Features

- **Add Leads**: Capture new leads with details like Name, Phone Number, and Source.
- **View Leads**: See all your leads in a structured list, ordered by creation time.
- **Update Status**: Easily update the status of each lead (e.g., *Interested*, *Not Interested*, *Converted*).
- **Delete Leads**: Remove leads from the system when they are no longer needed.
- **Responsive Design**: The frontend is built with Tailwind CSS ensuring a smooth experience across devices.

## Tech Stack

### Frontend
- React (bootstrapped with Vite)
- Tailwind CSS
- React Hook Form
- Axios

### Backend
- Node.js
- Express
- PostgreSQL (pg driver)
- CORS
- dotenv

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/sahiljayant19/lead-management-system.git
   cd lead-management-system
   ```

2. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies**:
   ```bash
   cd ../server
   npm install
   ```

### Database Setup

1. Open your PostgreSQL terminal or preferred GUI tool (like pgAdmin).
2. Create a new database for the project (e.g., `lead_management`).
3. Connect to your new database and run the following SQL command to create the `leads` table:
   ```sql
   CREATE TABLE leads (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       phone VARCHAR(50) NOT NULL,
       source VARCHAR(255) NOT NULL,
       status VARCHAR(50) DEFAULT 'Interested',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Environment Variables

In the `server` directory, create a `.env` file and add your PostgreSQL credentials and server port:

```env
PORT=5000
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

### Running the Application

1. **Start the Backend Server**:
   From the `server` directory, run:
   ```bash
   npm run dev
   ```
   The server should start on `http://localhost:5000`.

2. **Start the Frontend Client**:
   From the `client` directory, run:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173` (or the port specified by Vite).

## API Endpoints

The backend provides the following RESTful API endpoints under `http://localhost:5000/api/leads`:

- `GET /` - Retrieve all leads
- `POST /` - Add a new lead (requires `name`, `phone`, `source`)
- `PUT /:id` - Update the status of an existing lead (requires `status`)
- `DELETE /:id` - Delete a lead by ID
