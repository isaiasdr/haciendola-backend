import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'John',
    minLength: 2,
    description: 'firstname of the user',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(2)
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    minLength: 2,
    description: 'lastname of the user',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'email to register',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Test1234&',
    description: 'Password value',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'Test1234&',
    description: 'Confirm Password value',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  confirmPassword: string;
}
