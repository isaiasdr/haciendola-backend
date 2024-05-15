import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description:
      'email to send an email with the instructions to change the password',
    nullable: false,
    required: true,
  })
  @IsEmail()
  email: string;
}
