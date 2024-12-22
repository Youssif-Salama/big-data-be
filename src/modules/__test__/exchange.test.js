import supertest from "supertest";
import {app} from "../../../index.js";

describe("Excahnge API Tests", () => {

  // Test: Get all exchanges
  it("should get all exchanges",async()=>{
    const response=await supertest(app).get("/api/v1/exchange");
    expect(response?.statusCode).toBe(200);
    expect(response?._body?.ok).toBe(true);
  })

  // Test: Get specific exhange by ID
  it("should get all exchanges",async()=>{
    const response=await supertest(app).get("/api/v1/exchange/EOD|ALEZX.US");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data[0]._id).toBe("EOD|ALEZX.US")
  })
})