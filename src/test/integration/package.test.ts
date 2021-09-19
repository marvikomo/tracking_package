import "mocha";
import { expect } from "chai";
import { agent as request } from "supertest";
import faker from "faker";

import { app } from "../../index";
import { Status } from "../../entity/package.status";
import { response } from "express";

describe("Package API", () => {
    let result;
    beforeEach(async () => {
      
      result =  await request(app)
      .post("/api/generate-token")
      .send({
        name: faker.name.firstName(),
        email: faker.internet.email(),
      });
      
    });
  
    describe("POST /api/package", () => {
       
      it("should add package for tracking", async () => {
        const res = await request(app)
          .post("/api/package")
          .set("Authorization", result.body.data.token);
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an("object");
        expect(res.body.data).to.have.property("status");
      });
    });
    

})