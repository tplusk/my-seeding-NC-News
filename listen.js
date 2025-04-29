const app = require("./db/seeds/app");

app.listen(9001, () => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is up and listening on port 9001.");
  }
});

module.exports = app;
