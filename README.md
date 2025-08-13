# NC News

A full-stack news application that allows users to read articles, comment, and interact with content.  
Live demo: [NC News on Render](https://my-seeding-nc-news.onrender.com)

---

## Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/tplusk/my-seeding-NC-News
cd my-seeding-NC-News
Install Dependencies
npm install
Environment Variables
Create two .env files in the root directory:

For development (.env.development)

PGDATABASE=nc_news
For testing (.env.test)

PGDATABASE=nc_news_test
Database Setup & Seeding
Run the following commands to set up and populate the database:

npm run setup-dbs
npm run seed-dev
Running Tests
To execute the full test suite:

npm test
Local Development
Start the local development server:

npm start
The server will be running on http://localhost:3000 by default.

Project Structure
my-seeding-NC-News/
│
├── db/
├── __tests__/
├── controllers/
├── models/
├── routes/
├── app.js

```
