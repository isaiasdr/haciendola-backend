import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginUserDto,
  RegisterUserDto,
} from './dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'user was created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: [RegisterUserDto] })
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @ApiResponse({ status: 200, description: 'user was logged' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: [LoginUserDto] })
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @ApiResponse({ status: 201, description: 'return user data and token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @Get('verify-token')
  @Auth()
  verifyToken(@GetUser() user: User) {
    return this.authService.verifyToken(user);
  }

  @ApiResponse({ status: 201, description: 'reset user password' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @ApiBody({ type: [ChangePasswordDto] })
  @Post('change-password')
  @Auth()
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    return this.authService.changePassword(changePasswordDto, user);
  }

  @ApiResponse({ status: 201, description: 'reset user password' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: [ForgotPasswordDto] })
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
