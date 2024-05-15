import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
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
