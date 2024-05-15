import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { envs } from 'src/config';
import { SendMailOptions } from './interfaces/send-email.interface';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.nodemailer_host,
      port: envs.nodemailer_port,
      auth: {
        user: envs.nodemailer_user,
        pass: envs.nodemailer_password,
      },
    });
  }

  async sendMail(options: SendMailOptions) {
    const { htmlBody, subject, to } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
