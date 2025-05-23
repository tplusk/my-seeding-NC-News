const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
} = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  return selectCommentsByArticleId(article_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  return insertCommentsByArticleId(article_id, username, body)
    .then((comment) => res.status(201).send({ comment }))
    .catch((error) => {
      console.log(error);
    });
};
