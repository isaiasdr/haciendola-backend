import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'email to login',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Test1234&',
    description: 'password to login',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}
