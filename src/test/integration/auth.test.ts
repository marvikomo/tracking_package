import "mocha";
import { expect } from "chai";
import { agent as request } from "supertest";
import faker from "faker";

import { app } from "../../index";
import { Status } from "../../entity/package.status";
import { response } from "express";

describe("Auth API", () => {
  describe("POST /api/generate-token", () => {
    it("should generate token for client", async () => {
      const res = await request(app)
        .post("/api/generate-token")
        .send({
          name: faker.name.firstName(),
          email: faker.internet.email(),
        });
       
      expect(res.status).to.equal(201);
      expect(res.body.data).to.have.property("token");
    });
  });

})