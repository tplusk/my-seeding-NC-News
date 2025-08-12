const db = require("../db/connection");
const format = require("pg-format");

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comments.comment_id,
       comments.votes,
       comments.created_at,
       comments.author,
       comments.body,
       comments.article_id 
       FROM comments 
       WHERE comments.article_id = $1                
       ORDER BY comments.created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return db
          .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
          .then(({ rows }) => {
            if (!rows.length) {
              return Promise.reject({ status: 404, msg: "Not Found!" });
            }
            return [];
          });
      }
      return rows;
    });
};

exports.insertCommentsByArticleId = (article_id, username, body) => {
  const sqlString = format(
    `INSERT INTO comments (article_id, author, body, votes) VALUES %L RETURNING *;`,
    [[article_id, username, body, 0]]
  );
  return db.query(sqlString).then(({ rows }) => {
    return rows[0];
  });
};

exports.amendArticleVotes = (article_id, inc_votes) => {
  const queryStr = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
  `;

  return db.query(queryStr, [inc_votes, article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return rows[0];
  });
};

exports.removeCommentsById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found!" });
      }
      return result.rows;
    });
};
