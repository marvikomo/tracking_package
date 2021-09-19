import { Request, Response } from "express";
import { PackageService } from "../services/package.service";
import { generateTrackingId } from "../util/generateTrackingId";
import { PackageDto } from "../dto/package.dto";
import { ResponseHelper } from "../util/response/response-handler";

const sendResponse = ResponseHelper.sendResponse;

export class PackageController {
  /**
 * The idea is that package for this request is been created and tracking_id is given back to the client
 * extra details could be required
 */
  static addPackage = async (req: Request, res: Response) => {
    try {
      let tracking_id = generateTrackingId();
      let save_data: PackageDto = {
        tracking_id,
        status: 0,
      };

      let create = await PackageService.create(save_data);
      return sendResponse(
        res,
        201,
        false,
        create,
        "Request added successfully"
      );
    } catch (err) {
      return sendResponse(res, 500, err);
    }
  };

  static getPackageStatus = async (req: Request, res: Response) => {
    try {
      let tracking_id = req.params.tracking_id;
      let result = await PackageService.getPackageStatus(tracking_id);
      return sendResponse(res, 200, false, result, "successful");
    } catch (err) {
      return sendResponse(res, 500, err);
    }
  };
}
