const app = require("./db/seeds/app");

app.listen(9001, () => {
  console.log("Server is up and listening on port 9001.");
});

module.exports = app;
