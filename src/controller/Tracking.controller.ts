import { Request, Response } from "express";
import { PackageService } from "../services/package.service";
import { TrackingDto } from "../dto/tracking.dto";
import { TrackingService } from "../services/tracking.service";
import { Status } from "../entity/package.status";
import { ResponseHelper } from "../util/response/response-handler";

const sendResponse = ResponseHelper.sendResponse;

/**
 * This handles all tracking logics.
 */
export class TrackingHistory {
  static logProgress = async (req: Request, res: Response) => {
    try {
      const { package_id, status, latitude, longitude } = req.body;

      let save_data: TrackingDto = {
        packId: package_id,
        status,
        latitude,
        longitude,
      };

      if (status == Status.PICKED_UP || status == Status.DELIVERED) {
        let check = await TrackingService.checkIfStatusIsAllowed(
          package_id,
          status
        );
        if (check) {
          return sendResponse(
            res,
            400,
            true,
            false,
            "picked_up or deliverd can not be updated more than once"
          );
        }
      }

      let create = await TrackingService.create(save_data);
      await PackageService.updatePackageStatus(package_id, status);
      return sendResponse(
        res,
        201,
        false,
        create,
        "progress successful logged"
      );
    } catch (err) {
      console.log("err", err);
      return sendResponse(res, 500, err);
    }
  };

  static trackPackage = async (req: Request, res: Response) => {
    try {
      let tracking_id = req.params.tracking_id;
      let result = await PackageService.find({
        where: [{ tracking_id }],
        relations: ["trackings"],
        order: {
            status: "trackings.ASC"
        },
      });

      return sendResponse(res, 200, false, result, "successful");
    } catch (err) {
      return sendResponse(res, 500, err);
    }
  };
}
