import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignInPasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'example_user',
    description: 'can be email or username',
  })
  @Transform((param) => param.value.toLowerCase())
  identity: string

  @IsNotEmpty()
  @ApiProperty({
    example: 'example_user',
    description: 'password',
  })
  password: string
}
