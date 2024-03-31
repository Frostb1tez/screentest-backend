import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  @ApiProperty({
    example: 'johndoe',
    description: 'username',
  })
  username: string

  @IsNotEmpty()
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'email',
  })
  email: string

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    description: 'password',
  })
  password: string

  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'full name',
  })
  fullName: string

  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'avatar url',
  })
  avatarUrl?: string

  @IsOptional()
  @ApiProperty({
    example: 'Any other relevant user details',
    description: 'other description',
  })
  otherDetails?: string
}
