import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsString, ValidateNested } from 'class-validator'

import { Language } from 'src/entities/product-translation.entity'

import { ProductTranslationDto } from './create-product-translation.dto'

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Product SKU',
    example: 'SKU123',
  })
  sku: string

  @IsNumber()
  @ApiProperty({
    description: 'Product price',
    example: 10,
  })
  price: number

  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  @ApiProperty({
    description: 'Product translations',
    type: ProductTranslationDto,
    example: [
      {
        language: Language.English,
        name: 'Product name',
        description: 'Product description',
      },
      {
        language: Language.Thai,
        name: 'ชื่อสินค้า',
        description: 'รายละเอียดสินค้า',
      },
    ],
  })
  translations: ProductTranslationDto[]
}
