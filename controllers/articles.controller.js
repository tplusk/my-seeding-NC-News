const {
  selectArticleById,
  selectArticles,
  sendCommentByArticleId,
  sortArticles,
  sortArticlesByTopic,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticleById(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.params;
  if (topic) {
    sortArticlesByTopic(topic, sort_by, order)
      .then((articles) => res.status(200).send({ articles }))
      .catch(next);
  } else if (sort_by || order) {
    sortArticles(sort_by, order)
      .then((articles) => res.status(200).send({ articles }))
      .catch(next);
  } else {
    selectArticles()
      .then((articles) => res.status(200).send({ articles }))
      .catch(next);
  }
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  sendCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getArticlesByCreatedAt = (req, res, next) => {
  const { sort_by = "created_at", order = "desc" } = req.query;
  res
    .status(200)
    .send({ msg: `Sorting by ${sort_by} in ${order} order.` })
    .catch(next);
};

exports.getArticlesByTopic = (req, res, next) => {
  const { topic } = req.query;
  return sortArticlesByTopic(topic)
    .then((articles) => res.status(200).send({ articles }))
    .catch(next);
};
