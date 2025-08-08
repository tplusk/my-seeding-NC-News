const {
  selectArticleById,
  selectArticles,
  sendCommentByArticleId,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticleById(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

exports.getArticles = (req, res) => {
  return selectArticles().then((articles) =>
    res.status(200).send({ articles })
  );
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article } = req.params;
  // const { username, body } = req.body;

  return sendCommentByArticleId(article, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
