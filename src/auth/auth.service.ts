import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import * as bcript from 'bcrypt';

import { ForgotPasswordDto, LoginUserDto, RegisterUserDto } from './dto';
import { MailerService } from '../mailer/mailer.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('DB Connected');
  }

  private async signJWT(payload: any) {
    return this.jwtService.sign(payload);
  }

  async findByEmail(email: string) {
    try {
      const user = await this.user.findUniqueOrThrow({
        where: { email },
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    registerUserDto.email = registerUserDto.email.toLowerCase();
    registerUserDto.firstname = registerUserDto.firstname.trim().toLowerCase();
    registerUserDto.lastname = registerUserDto.lastname.trim().toLowerCase();

    const { password, confirmPassword, email, firstname, lastname } =
      registerUserDto;

    const user = await this.findByEmail(email.trim().toLowerCase());

    if (user) throw new BadRequestException('User already exist');

    if (password !== confirmPassword)
      throw new BadRequestException('Passwords not match');

    const hashedPassord = bcript.hashSync(password, 10);

    try {
      const newUser = await this.user.create({
        data: {
          email,
          firstname,
          lastname,
          password: hashedPassord,
        },
        select: {
          email: true,
          lastname: true,
          firstname: true,
          id: true,
        },
      });

      return {
        user: newUser,
        token: await this.signJWT(newUser),
      };
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        `Unhandled error, contact the admin`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    loginUserDto.email = loginUserDto.email.toLowerCase();
    const { email, password } = loginUserDto;

    const user = await this.findByEmail(email);

    if (!user) throw new BadRequestException('email or password incorrect');

    if (!bcript.compareSync(password, user.password))
      throw new BadRequestException('email or password incorrect');

    const { password: _, ...rest } = user;

    return {
      user: rest,
      token: await this.signJWT(rest),
    };
  }

  async verifyToken(user: User) {
    const { password: _, ...rest } = user;

    return {
      user: rest,
      token: await this.signJWT(rest),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const token = await this.signJWT({ email });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      htmlBody: `
        <p>
          Hi, Someone has requested a password reset for your Haciendola-App Account. 
          You can set a new password using the link below:
        </p>

        <a href="${envs.frontend_url}/forgot-password/${token}" target='_blank'>
          Click Here
        </a>
      `,
    });

    return 'email sent';
  }

  async changePassword(changePasswordDto: ChangePasswordDto, user: User) {
    try {
      const { confirmPassword, password } = changePasswordDto;

      if (password !== confirmPassword)
        throw new BadRequestException('Passwords not match');

      const updatedUser = await this.user.update({
        where: { id: user.id },
        data: { password: bcript.hashSync(password, 10) },
        select: {
          email: true,
          lastname: true,
          firstname: true,
          id: true,
        },
      });

      return {
        user: updatedUser,
        token: await this.signJWT(updatedUser),
      };
    } catch (error) {
      throw new HttpException(
        `Unhandled error, contact the admin`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
