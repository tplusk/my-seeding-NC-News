const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../db/seeds/app");
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

describe("GET /api/articles/:article_id", () => {
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
        expect(body.msg).toBe("Bad request!");
      });
  });
});

xdescribe("GET /api/articles/987651", () => {
  test("404: Responds with not found if trying to get a resource by a valid ID that does not exist in the database", () => {
    return request(app)
      .get("/api/articles/987651")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found!");
      });
  });
});

xdescribe("GET /api/articles", () => {
  test("200: Responds with an articles array of article objects, each of which should have the correct properties, body property excluded in this case", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).toMatchObject([
            {
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            },
          ]);
          expect(article).not.toHaveProperty("body");
        });
      });
  });
});
// xdescribe("artticles should be sorted by date in descending order", () => {
//   test("", () => {})
// })
// xdescribe("", () => {
//   test("", () => {})
// })
