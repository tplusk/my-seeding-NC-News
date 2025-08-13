const cors = require("cors");
const express = require("express");
const app = express();
const db = require("./db/connection");

const { getApi } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles.controller");
const {
  getCommentsByArticleId,
  postCommentsByArticleId,
  updateArticleVotes,
  deleteCommentByCommentId,
} = require("./controllers/comments.controller");
const { sortArticlesByTopic } = require("./models/articles.model");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:topic", (req, res, next) => {
  const { topic } = req.params;
  sortArticlesByTopic(topic)
    .then((articles) => res.status(200).send({ articles }))
    .catch(next);
});

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", updateArticleVotes);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.all("/*splat", (req, res) => {
  res.status(404).send({ msg: "Not Found!" });
});

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
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found!" });
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
