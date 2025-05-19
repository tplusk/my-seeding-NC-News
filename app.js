const express = require("express");
const app = express();
const db = require("./db/connection");
const { getApi } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles.controller");
const {
  getCommentsByArticleId,
  postCommentsByArticleId,
} = require("./controllers/comments.controller");
app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Not Found!" });
});

// error handling
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: "Bad Request!" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request!" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Not Found!" });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error!" });
});

module.exports = app;
