import app from "./../../src/app";
import request from "supertest";

describe("GET /suggestions", () => {
  it("should return city suggestions", async () => {
    const res = await request(app).get("/suggestions").query({
      q: "saint",
      latitude: 44.9477,
      longitude: -93.104,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("suggestions");
  });

  it("should return error", async () => {
    const res = await request(app).get("/suggestions");
    expect(res.statusCode).toEqual(400);
  });
});
