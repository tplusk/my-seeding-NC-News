const { selectArticleById } = require("../models/articles.model");

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  return selectArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  });
};
