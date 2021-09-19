import "mocha";
import { expect } from "chai";
import { agent as request } from "supertest";
import faker from "faker";

import { app } from "../../index";
import { Status } from "../../entity/package.status";
import { response } from "express";

describe("API", () => {
  // console.log("hett", result)

  describe("POST /api/log-progress", () => {
    let result;
    let response;
    before(async () => {
      result = await request(app).post("/api/generate-token").send({
        name: faker.name.firstName(),
        email: faker.internet.email(),
      });

      response = await request(app)
        .post("/api/package")
        .set("Authorization", result.body.data.token);
    });

    it("should log progress for package to pickup", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.PICKED_UP,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(201);
      expect(res.body.data.status).to.equal(Status.PICKED_UP);
    });

    it("should not log to pickup more than once", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.PICKED_UP,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(400);
    });
    it("should log progress of package to in-transit", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.IN_TRANSIT,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(201);
      expect(res.body.data.status).to.equal(Status.IN_TRANSIT);
    });

    it("should log progress of package to ware-house", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.WAREHOUSE,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(201);
      expect(res.body.data.status).to.equal(Status.WAREHOUSE);
    });

    it("should log to in-transit again", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.IN_TRANSIT,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(201);
      expect(res.body.data.status).to.equal(Status.IN_TRANSIT);
    });

    it("should log to ware-house again", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.WAREHOUSE,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(201);
      expect(res.body.data.status).to.equal(Status.WAREHOUSE);
    });

    it("should log to delivered", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.DELIVERED,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(201);
      expect(res.body.data.status).to.equal(Status.DELIVERED);
    });

    it("should not log to deliverd more than once", async () => {
      const res = await request(app)
        .post("/api/log-progress")
        .send({
          package_id: response.body.data.id,
          status: Status.DELIVERED,
          latitude: 0.456,
          longitude: 0.99,
        })
        .set("Authorization", result.body.data.token);
      expect(res.status).to.equal(400);
    });

    describe("GET api/track/:tracking_id", ()=>{
      it("should get transaction history", async()=>{
        const res = await request(app)
        .get("/api/track/"+response.body.data.tracking_id)
        .set("Authorization", result.body.data.token);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an("array");

      })
    })

  });


});
