import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.registerUser();
  }

  @Post('login')
  loginUser() {
    return this.authService.loginUser();
  }

  @Get('verify-token')
  verifyToken() {
    return this.authService.verifyToken();
  }

  //Revalidate??

  //Forget Password?
}
