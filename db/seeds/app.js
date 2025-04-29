const express = require("express");
const app = express();
const db = require("../connection");
const { getApi } = require("../../controllers/api.controller");
const { getTopics } = require("../../controllers/topics.controller");

// for accessing body of request
// app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

module.exports = app;
