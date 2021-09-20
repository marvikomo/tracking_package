import express, {Application, Request, Response, NextFunction} from "express"
import {PackageController} from "./controller/Package.controller";
import { TrackingHistory } from "./controller/Tracking.controller";
import { AuthController } from "./controller/Auth.controller";
import {checkJwt} from "./middleware/authorization"
import {validate, generate_token, log_progress} from "./middleware/validator"
 const router = express.Router();

/**
 * Auth Routes
 */
 router.post("/generate-token", validate(generate_token), AuthController.generateAccessToken);

 /**
 * Package Routes
 */
 router.post("/package", checkJwt, PackageController.addPackage)
 router.get("/status/:tracking_id", checkJwt, PackageController.getPackageStatus)
 /**
 * Tracking Routes
 */
 router.post("/log-progress", validate(log_progress), checkJwt, TrackingHistory.logProgress)
 router.get("/track/:tracking_id",checkJwt, TrackingHistory.packageStatusHisrory)

 export default router;