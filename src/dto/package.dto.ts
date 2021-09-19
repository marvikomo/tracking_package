import {
  IsNotEmpty,
  IsString
} from "class-validator";
import { Status } from "src/entity/package.status";

export class PackageDto {
  @IsNotEmpty()
  @IsString()
  readonly tracking_id: string;

  @IsNotEmpty()
  @IsString()
  readonly status: Status;
}
