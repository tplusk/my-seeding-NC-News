## NC News Seeding

https://my-seeding-nc-news.onrender.com

##Setup

#Installation

1. Clone the repository from https://github.com/tplusk/my-seeding-NC-News

2. Install dependencies:
   npm install
3. Set up environment variables:
   Create two .env files in the root directory:

#For development:

// .env.development
PGDATABASE=dev_dialogue

#For testing:

// .env.test
PGDATABASE=dev_dialogue_test 4. Set up and seed the database:
npm run setup-dbs
npm run seed-dev
Running Tests
Run the test suite with:

npm test
Local Development
To run the server locally:

npm start
