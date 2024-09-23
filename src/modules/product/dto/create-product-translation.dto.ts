import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { Language } from 'src/entities/product-translation.entity'

export class ProductTranslationDto {
  @IsString()
  @IsEnum(Language)
  @IsNotEmpty()
  language: Language

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string
}
