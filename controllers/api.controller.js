const endpointsJson = require("../endpoints.json");

exports.getApi = (req, res) => {
  res.status(200).send({ endpointsJson });
};
