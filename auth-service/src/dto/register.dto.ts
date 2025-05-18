import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({description: 'email'})
    @IsEmail()
    email: string;

    @ApiProperty({description: 'password'})
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({description: 'name'})
    @IsNotEmpty()
    name: string;

}