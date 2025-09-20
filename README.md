# Simple Listing Apartments App 🏠

A full-stack application for managing apartment listings with Docker containerization.

## Table of Contents
- [Quick Start](#-quick-start)
- [Backend Documentation](#️-backend-documentation)
- [Frontend Documentation](#️-frontend-documentation)

---

## 🚀 Quick Start

### Prerequisites
- Docker
- Docker Compose

### Installation
```bash
# Navigate to the project directory
git clone git@github.com:eslam733/simple-listing-apartments-app.git
cd simple-listing-apartments-app
docker-compose build
docker-compose up -d
```

### Access Services
- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Frontend**: [http://localhost:3000](http://localhost:3000)

### Postman Collection
You can find the Postman collection for testing the API [here](Api%20Collection.postman_collection.json). 

### Database Seeding
When the containers start, a database seeder automatically runs to populate the database with initial projects and apartments. This ensures you have sample data available immediately for testing.

---

## 🛠️ Backend Documentation

### Tech Stack
- Express.js
- Node.js
- MongoDB
- Docker

### Endpoints
| Method | Endpoint                | Description                           |
|--------|-------------------------|---------------------------------------|
| GET    | `/api/apartments`        | List all apartments                   |
| GET    | `/api/apartments/:id`    | Get details of a specific apartment   |
| POST   | `/api/apartments`        | Create a new apartment entry          |
| GET    | `/api/projects`          | List all projects                     |

---

## 🖥️ Frontend Documentation

### Tech Stack
- Next.js
- React
- Axios
- Tailwind CSS

### Pages
| Page      | Route             | Description                              |
|-----------|-------------------|------------------------------------------|
| Listing   | `/`               | Main apartment listing view              |
| Details   | `/apartment/[id]` | Individual apartment details             |
| Create    | `/create`         | Form for adding new apartments           |
