# BigData App

![Node.js](https://img.shields.io/badge/Node.js-v16-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-v4-lightgrey?style=for-the-badge&logo=express)
![Redis](https://img.shields.io/badge/Redis-v6-red?style=for-the-badge&logo=redis)
![Docker](https://img.shields.io/badge/Docker-v20-blue?style=for-the-badge&logo=docker)

A **Node.js** and **Express.js** application for handling JSON data with advanced features:

- Pagination
- Sorting
- Searching (supports nested arrays)
- Filtering
- Field selection
- Redis-based caching

This app is Dockerized for easy deployment and scalable performance.

---

## Features

### 🔹 Pagination
- Allows you to fetch data in pages.
- Parameters: `page`, `limit`.
- Includes metadata for total items and pages.

### 🔹 Sorting
- Sort JSON data by specified fields.
- Parameter: `sortBy` (e.g., `?sortBy=name:asc`).

### 🔹 Searching
- Search JSON data, including nested arrays.
- Parameter: `search` (e.g., `?search=keyword`).

### 🔹 Filtering
- Filter results based on specific fields and values.
- Parameter: `filters` (e.g., `?filters={"field":"value"}`).

### 🔹 Selecting
- Fetch only specific fields from the data.
- Parameter: `selectors` (e.g., `?selectors=name,age`).

### 🔹 Redis Caching
- Uses Redis to cache responses for improved performance.

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/)

---

## Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Youssif-Salama/big-data-be.git
cd bigdata-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the App Locally

```bash
node app.js
```

Visit `http://localhost:3000` to access the app.

---

## Docker Deployment

### 1️⃣ Build the Docker Image

```bash
docker build -t youssif0001/bigdata.be:latest .
```

### 2️⃣ Run the Container

```bash
docker run -d -p 3000:3000 --name bigdata-container youssif0001/bigdata.be:latest
```

Visit `http://localhost:3000` to access the app.

### 3️⃣ Pull and Run from Docker Hub

If the image is already pushed to Docker Hub:

```bash
docker pull youssif0001/bigdata.be:latest
docker run -d -p 3000:3000 --name bigdata-container youssif0001/bigdata.be:latest
```

---

## API Endpoints

### 🔹 `GET /data`
Fetch data with pagination, sorting, filtering, searching, and selecting.

#### Query Parameters:
- `page`: Page number (default: 1).
- `limit`: Number of items per page (default: 10).
- `sortBy`: Field to sort by (e.g., `name:asc`).
- `search`: Keyword to search.
- `filters`: JSON string for filtering fields.
- `selectors`: Comma-separated list of fields to select.

### Example Request:

```bash
curl "http://localhost:3000/data?page=2&limit=5&sortBy=name:asc&search=John&filters={\"age\":25}&selectors=name,age"
```

---

## Redis Integration

Ensure Redis is running locally or in a container:

```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

Configure Redis in the app by updating the `.env` file:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---


### Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
