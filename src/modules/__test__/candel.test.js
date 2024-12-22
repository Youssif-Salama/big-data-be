import supertest from "supertest";
import { app } from "../../../index.js";

describe("Candle API Tests", () => {
  // Test: Get all candles
  it("should get all candles", async () => {
    const response = await supertest(app).get("/api/v1/candel");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  // Test: Get specific candle by ID
  it("should get a specific candle by ID", async () => {
    const response = await supertest(app).get("/api/v1/candel/EOD|PL.COMM|1655762399");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data[0]._id).toBe("EOD|PL.COMM|1655762399");
  });
});
