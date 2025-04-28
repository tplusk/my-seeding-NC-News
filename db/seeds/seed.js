const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createRef } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics(
        slug VARCHAR(100) PRIMARY KEY,
        description VARCHAR(1000) NOT NULL,
        img_url varchar(1000) NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users(
        username VARCHAR(100) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        avatar_url VARCHAR(1000) NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        topic VARCHAR(100) REFERENCES topics(slug) NOT NULL,
        author VARCHAR(100) REFERENCES users(username) NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        author VARCHAR(100) REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const insertTopicsQuery = format(
        `INSERT INTO topics (slug, description, img_url)
         VALUES %L;`,
        formattedTopics
      );
      return db.query(insertTopicsQuery);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const insertUserQuery = format(
        `INSERT INTO users (username, name, avatar_url)
        VALUES %L;`,
        formattedUsers
      );
      return db.query(insertUserQuery);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        const legitArticle = convertTimestampToDate(article);
        return [
          legitArticle.title,
          legitArticle.topic,
          legitArticle.author,
          legitArticle.body,
          legitArticle.created_at,
          legitArticle.votes,
          legitArticle.article_img_url,
        ];
      });
      const insertArticlesQuery = format(
        `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url)
          VALUES %L RETURNING *;`,
        formattedArticles
      );
      return db.query(insertArticlesQuery);
    })
    .then((result) => {
      const articlesRefObject = createRef(result.rows);
      const formattedComments = commentData.map((comment) => {
        const legitComment = convertTimestampToDate(comment);
        return [
          articlesRefObject[comment.article_title],
          legitComment.body,
          legitComment.votes,
          legitComment.author,
          legitComment.created_at,
        ];
      });
      const insertCommentsQuery = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at)
           VALUES %L RETURNING *`,
        formattedComments
      );
      return db.query(insertCommentsQuery);
    })
    .then(() => {
      console.log("Seed complete");
    });
};
module.exports = seed;
