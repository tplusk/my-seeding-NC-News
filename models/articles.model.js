const db = require("../db/connection");

exports.selectArticleById = (articleID) => {
  return db
    .query(
      `SELECT 
         articles.article_id,
         articles.title,
         articles.topic,
         articles.author,
         articles.body,
         articles.created_at,
         articles.votes,
         articles.article_img_url,
         COUNT(comments.comment_id)::INT AS comment_count
       FROM articles
       LEFT JOIN comments 
       ON articles.article_id = comments.article_id
       WHERE articles.article_id = $1
       GROUP BY articles.article_id;`,
      [articleID]
    )
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
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const validSortColumns = [
  "article_id",
  "title",
  "author",
  "created_at",
  "votes",
  "topic",
];

exports.sortArticles = (sort_by = "created_at", order = "desc") => {
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
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id):: INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY $(sort_by) $(order);`
    )
    .then(({ rows }) => rows);
};

exports.sortArticlesByTopic = (
  topic,
  sort_by = "created_at",
  order = "desc"
) => {
  const validOrders = ["asc", "desc"];
  const validSortColumns = [
    "article_id",
    "title",
    "author",
    "created_at",
    "votes",
    "topic",
    "comment_count",
  ];

  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: `Invalid sort_by query. Must be one of: ${validSortColumns.join(
        ", "
      )}.`,
    });
  }
  order = order.toLowerCase();
  if (!validOrders.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid order query, Must be 'asc' or 'desc'.",
    });
  }
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN  comments ON articles.articles_id = comments.article_id WHERE topic = $1 GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`,
      [topic]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found!" });
      }
      return rows;
    });
};
