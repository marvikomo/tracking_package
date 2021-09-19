import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseHelper } from "../util/response/response-handler";
import { AuthDto } from "../dto/auth.dto";
import { generateAuthToken } from "../util/generateAuthToken";

const sendResponse = ResponseHelper.sendResponse;

/**
 * This controller is to demonstrate client generating access token, though it for development use
 */

export class AuthController {

    static generateAccessToken = async (req:Request, res: Response)=>{
      try{
      const { name, email } = req.body;
      
      let token = await generateAuthToken({name, email});
      let save_data: AuthDto = {
        name,
        email,
        token
      };
      let create: any = await AuthService.createUser(save_data);
      
      return sendResponse(
        res,
        201,
        false,
        { ...create, token },
        "Token generated"
      );

      }catch(err){
        return sendResponse(res, 500, err);
      }

    }

}
