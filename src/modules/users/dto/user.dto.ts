import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  userName: string;

  @ApiProperty({ type: String, required: true, minLength: 8 })
  password: number;

  @ApiProperty({ type: String, required: true })
  firstName: string;

  @ApiProperty({ type: String, required: false })
  lastName: string;
}

export class UpdateUserDto {
  @ApiProperty({ type: String, required: true })
  firstName: string;

  @ApiProperty({ type: String, required: false })
  lastName: string;
}
