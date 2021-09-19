import "mocha";
import { expect } from "chai";
import { agent as request } from "supertest";
import faker from "faker";

import { app } from "../../index";
import { Status } from "../../entity/package.status";
import { response } from "express";

describe("Validation TEST", () => {
  describe("POST /api/generate-token", () => {
    it("should return bad-request", async () => {
      const res = await request(app)
        .post("/api/generate-token")
        .send({
          
        });
       
      expect(res.status).to.equal(403);
    });
  });

})