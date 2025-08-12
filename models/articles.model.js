const db = require("../db/connection");

exports.selectArticleById = (articleID) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleID])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found!" });
      }
      return rows[0];
    });
};

exports.selectArticles = () => {
  return db
    .query(
      `SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id)::INT AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.sendCommentByArticleId = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [username, body, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.sortArticles = (sort_by = "created_at", order = "desc") => {
  const validColumns = [
    "article_id",
    "title",
    "author",
    "created_at",
    "votes",
    "topic",
  ];
  const validOrders = ["asc", "desc"];
  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: `Invalid sort_by query. Must be one of: ${validSortColumns.join(
        ", "
      )}`,
    });
  }

  order = order.toLowerCase();
  if (!validOrders.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid order query. Must be 'asc' or 'desc'.",
    });
  }
  return db
    .query(
      `SELECT article_id, title, author, created_at, votes, topic FROM articles ORDER BY $(sort_by) $(order);`
    )
    .then(({ rows }) => rows);
};
