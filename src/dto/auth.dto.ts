import {IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from 'class-validator';

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly token: string;

}