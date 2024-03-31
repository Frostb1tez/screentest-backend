import type { SendEmailDto } from './dto/send-email.dto'

import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  private transporter
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('nodemailer.host'),
      port: this.configService.get('nodemailer.port'),
    })
  }
  async sendEmail({ sendTo, message, subject }: SendEmailDto) {
    const mailOptions = {
      from: this.configService.get('nodemailer.user'),
      to: sendTo,
      subject: subject,
      text: message,
    }
    await this.transporter.sendMail(mailOptions)
    return { statusCode: HttpStatus.OK, message: 'Email sent successfully' }
  }
}
