const express = require("express");
const app = express();
const db = require("../connection");
const { getApi } = require("../../controllers/api.controller");
// for post and patch
app.use(express.json());

app.get("/api", getApi);

module.exports = app;
