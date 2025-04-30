const express = require("express");
const app = express();
const db = require("../connection");
const { getApi } = require("../../controllers/api.controller");
const { getTopics } = require("../../controllers/topics.controller");
const { getArticleById } = require("../../controllers/articles.controller");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  console.log(err);
  //   if (err.status === 400) {
  res.status(400).send({ msg: "Bad request!" });
  //   } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  //   if (err.status === 404) {
  res.status(404).send({ msg: "Not found!" });
  //   } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error!" });
});

module.exports = app;
