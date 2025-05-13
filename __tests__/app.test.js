const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpointsJson).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of topic objects which have slug and description properties ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
          expect(topic).not.toHaveProperty("img_url");
        });
      });
  });
});

describe("GET /api/articles/1", () => {
  test("200: Responds with an article object with the correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
});

describe("GET /api/articles/chokito", () => {
  test("400: Responds with bad request if sent an invalid ID", () => {
    return request(app)
      .get("/api/articles/chokito")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
});

describe("GET /api/articles/987651", () => {
  test("404: Responds with not found if trying to get a resource by a valid ID that does not exist in the database", () => {
    return request(app)
      .get("/api/articles/987651")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found!");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an articles array of article objects, each of which should have the correct properties, body property excluded in this case", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(13);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
          expect(article).not.toHaveProperty("body");
        });
      });
  });
});

describe("GET /api/articles/1/comments", () => {
  test("200: Responds with an array of comments for the given article_id of which each have the correct properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });
});

describe("GET /api/articles/2348765/comments", () => {
  test("404: Responds with not found, if the article doesn't exists yet or it has been deleted", () => {
    return request(app)
      .get("/api/articles/2348765/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found!");
      });
  });
});

describe("GET /api/articles/notAnId/comments", () => {
  test("400: Responds with bad request if sent an invalid id", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with the posted comment", () => {
    const commentPost = { username: "icellusedkars", body: "nice one" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(commentPost)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          comment_id: 19,
          author: "icellusedkars",
          body: "nice one",
          article_id: 2,
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
});

// describe("POST /api/articles/someArticle/comments", () => {
//   test("400: Responds with a bad request if ", () => {
//     return request(app)
//       .post("/api/articles/someArticle/comments")
//       .expect(400)
//       .then(({ body }) => {
//         expect(body);
//       });
//   });
// });
