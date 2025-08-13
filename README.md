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
