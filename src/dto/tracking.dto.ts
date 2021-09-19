import {IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from 'class-validator';
import { Status } from 'src/entity/package.status';
//import { IsEqualTo} from './custom-validators';

export class TrackingDto {

    @IsNotEmpty()
    @IsNumber()
    readonly packId: number;

    @IsNotEmpty()
    @IsString()
    readonly status: Status;

    @IsNotEmpty()
    @IsString()
    readonly longitude: string;

    @IsNotEmpty()
    @IsString()
    readonly latitude: string;

}