# NC News

A full-stack news application that allows users to read articles, comment, and interact with content.  
Live demo: [NC News on Render](https://my-seeding-nc-news.onrender.com)

---

## Setup & Installation

### Clone the Repository

git clone https://github.com/tplusk/my-seeding-NC-News

```bash
cd my-seeding-NC-News
```

Install Dependencies

```bash
npm install
```

Environment Variables
Create two .env files in the root directory:

For development (.env.development)

```bash
PGDATABASE=nc_news
```

For testing (.env.test)

```bash
PGDATABASE=nc_news_test
```

Database Setup & Seeding
Run the following commands to set up and populate the database:

```bash
npm run setup-dbs
npm run seed-dev
```

Running tests to execute the full test suite:

```bash
npm test
```

Local Development
Start the local development server:

```bash
npm start
```

The server will be running on http://localhost:3000 by default.

Project Structure
my-seeding-NC-News/

```bash
│
├── db/
├── **tests**/
├── controllers/
├── models/
├── routes/
├── app.js
```

# API Documentation

A RESTful API providing access to topics, articles, users, and comments. Once the server is running, you can access the API documentation. This will provide details about all available endpoints, accepted queries, and example responses.

---

## Endpoints

| Method     | Endpoint                             | Description                                   |
| ---------- | ------------------------------------ | --------------------------------------------- |
| **GET**    | `/api`                               | API documentation                             |
| **GET**    | `/api/topics`                        | Get all topics                                |
| **GET**    | `/api/articles`                      | Get all articles (supports filters & sorting) |
| **GET**    | `/api/articles/:article_id`          | Get specific article by ID                    |
| **GET**    | `/api/articles/:article_id/comments` | Get comments for a specific article           |
| **GET**    | `/api/users`                         | Get all users                                 |
| **POST**   | `/api/articles/:article_id/comments` | Post a new comment to an article              |
| **PATCH**  | `/api/articles/:article_id`          | Update article votes                          |
| **PATCH**  | `/api/comments/:comment_id`          | Update comment votes                          |
| **DELETE** | `/api/comments/:comment_id`          | Delete a comment                              |

---

## Tech Stack

- **Node.js / Express.js** – RESTful API framework
- **PostgreSQL** – Relational database implementation
- **Jest / Supertest** – Automated testing suite
- **Nodemon** – Development server with hot reloading
- **dotenv** – Environment configuration
- **Husky** – Git hooks integration for quality control

---

## Skills

### **Test-Driven Development (TDD)**

- Writing tests **before** implementing functionality
- Test coverage includes:
  - API endpoints
  - Edge cases
  - Error handling
  - Data validation
  - Password hashing

### **MVC Architecture**

- Clear separation of **Models**, **Views**, and **Controllers** for maintainability

### **RESTful Design**

- Following REST principles for clean, consistent API endpoints

### **Incremental Development**

- Features developed in small increments with **Git** version control

---
