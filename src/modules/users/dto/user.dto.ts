import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    username: string;

    @ApiProperty({ type: String, required: true, minLength: 8 })
    @IsString()
    @MinLength(8, {
        message:
            'Password is too short. Minimal length is $constraint1 characters',
    })
    password: number;

    @ApiProperty({ type: String, required: true })
    @IsString()
    firstName: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    lastName: string;
}

export class UpdateUserDto {
    @ApiProperty({ type: String, required: true })
    @IsString()
    firstName: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    lastName: string;
}
