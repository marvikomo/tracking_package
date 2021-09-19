import {
  getConnection,
  getConnectionManager,
  getRepository,
  getManager,
} from "typeorm";
import { TrackingHistory } from "../entity/Tracking";
import { TrackingDto } from "../dto/tracking.dto";

export class TrackingService {


  public static create = async (data: TrackingDto) => {
    const trackingRepository = getManager().getRepository(TrackingHistory);
    const save_data = await trackingRepository.save(data);

    return save_data;
  };

  public static findById = async (request_id: number) => {
    const trackingHistoryRepository =
      getManager().getRepository(TrackingHistory);
    return await trackingHistoryRepository.findOne();
  };

  public static find = async (data) => {
    const trackingHistoryRepository =
      getManager().getRepository(TrackingHistory);
    return await trackingHistoryRepository.find(data);
  };

  public static checkIfStatusIsAllowed = async (id, status) => {
    return await getRepository(TrackingHistory)
      .createQueryBuilder("tracking")
      .where("tracking.packId = :id", { id })
      .andWhere("tracking.status = :status", { status: status.toString() })
      .getOne();
  };
}
