const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  amendArticleVotes,
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
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number") {
    return res.status(400).send({ msg: "Invalid or missing inc_votes" });
  }

  amendArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch(next);
};
