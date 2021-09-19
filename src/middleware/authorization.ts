import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseHelper } from "../util/response/response-handler";
import { AuthService } from "../services/auth.service";
const sendResponse = ResponseHelper.sendResponse;
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let auth: any = req.headers["authorization"]
    ? req.headers["authorization"]
    : req.headers["Authorization"];

  let token = auth ? auth : null;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (!err) {
        if (await AuthService.checkIfTokenExists(token)) {
          next();
        } else {
          sendResponse(res, 401);
        }
      } else {
        sendResponse(res, 401);
      }
    });
  } else {
    sendResponse(res, 401);
  }
};
