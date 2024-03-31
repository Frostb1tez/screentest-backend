import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SendEmailDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email address to send the email to',
    example: 'bhite2000@hotmail.com',
  })
  sendTo: string

  @IsString()
  @ApiProperty({
    description: 'Subject of the email',
    example: 'Hello',
  })
  subject: string

  @IsString()
  @ApiProperty({
    description: 'Message of the email',
    example: '<p>Hello, how are you?</p>',
  })
  message: string
}
