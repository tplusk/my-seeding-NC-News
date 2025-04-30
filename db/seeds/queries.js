const db = require("../connection");
// const users = require("../data/test-data/users");

function usersQuery() {
  return db
    .query(`SELECT * FROM users;`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("Error with getting all of the users", err);
    });
}

function codingTopics() {
  return db.query(`
        WHERE `);
}

module.exports = { usersQuery };
