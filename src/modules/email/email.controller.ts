import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { SendEmailDto } from './dto/send-email.dto'
import { EmailService } from './email.service'

@Controller('email')
@ApiTags('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.emailService.sendEmail(sendEmailDto)
  }
}
