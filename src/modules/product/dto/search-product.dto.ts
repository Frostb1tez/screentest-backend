import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PageOptions } from 'src/common/pagination/pagination.dto'
import { Language } from 'src/entities/product-translation.entity'

export class SearchProductDto extends PageOptions {
  @IsString()
  @IsOptional()
  search?: string

  @IsString()
  @IsEnum(Language)
  @IsOptional()
  language?: Language
}
