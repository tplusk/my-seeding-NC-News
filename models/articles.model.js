const db = require("../db/connection");

exports.selectArticleById = (articleID) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleID])
    .then(({ rows }) => {
      return rows[0];
    });
};
