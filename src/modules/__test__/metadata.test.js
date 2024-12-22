import supertest from "supertest";
import {app} from "../../../index.js";

describe("Excahnge API Tests", () => {

  // Test: Get all metadata
  it("should get all metadata",async()=>{
    const response=await supertest(app).get("/api/v1/meta-data");
    expect(response?.statusCode).toBe(200);
    expect(response?._body?.ok).toBe(true);
  })

  // Test: Get specific metadata by ID
  it("should get all metadata",async()=>{
    const response=await supertest(app).get("/api/v1/meta-data/EOD|18MS.XETRA");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data[0]._id).toBe("EOD|18MS.XETRA")
  })
})