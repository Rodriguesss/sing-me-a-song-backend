import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { recommendationFactory, findRecommendationDatabaseSeed } from "../factories/recommendationFactory.js";

async function disconnect() {
  await prisma.$disconnect();
}

const ENDPOINT = "/recommendations";

describe("GET /recommendations", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 200 with array of recommendations", async () => {
    const { status, body } = await supertest(app).get(`${ENDPOINT}`);

    expect(status).toEqual(200);
    expect(body.length > 0).toBe(true);
  });
})

describe("GET /recommendations/random", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 200 with array of recommendations array", async () => {
    const { status, body } = await supertest(app).get(`${ENDPOINT}/random`);

    expect(status).toEqual(200);
    expect(typeof body).toBe("object");
  });
});

describe("GET /recommendations/top/:amount", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 200 with array of recommendations array", async () => {
    const { status, body } = await supertest(app).get(`${ENDPOINT}/top/3`);

    expect(status).toEqual(200);
    expect(body.length > 0).toBe(true);
  });
});

describe("GET /recommendations/:id", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 200 with array of recommendations array", async () => {
    const { status, body } = await supertest(app).get(`${ENDPOINT}/1`);

    expect(status).toEqual(200);
    expect(typeof body).toBe("object");
  });

  it("id does not exist in the database should return 200", async () => {
    const { status, body } = await supertest(app).get(`${ENDPOINT}/50`);

    expect(status).toEqual(200);
    expect(body).toEqual({});
  });
});

describe("POST /recommendations", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 201", async () => {
    const { status } = await supertest(app).post(`${ENDPOINT}`).send(recommendationFactory);

    expect(status).toEqual(201);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 200", async () => {
    const { score, oldScore, status } = await upvoteOrDownvote('upvote');

    expect(score > oldScore).toBe(true);
    expect(status).toEqual(200);
  });
})

describe("POST /recommendations/:id/downvote", () => {
  afterAll(async () => {
    disconnect();
  });

  it("should return 200", async () => {
    const { score, oldScore, status } = await upvoteOrDownvote('downvote');

    expect(score < oldScore).toBe(true);
    expect(status).toEqual(200);
  });
})

async function upvoteOrDownvote(vote: string) {
  const DATABASE_SEED_RECOMMENDATION_ID = 1;
  const { id, score: oldScore } = await findRecommendationDatabaseSeed(DATABASE_SEED_RECOMMENDATION_ID);
  const { status } = await supertest(app).post(`${ENDPOINT}/${id}/${vote}`);
  const { score } = await findRecommendationDatabaseSeed(DATABASE_SEED_RECOMMENDATION_ID);

  return { score, oldScore, status };
}