import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class PageOptions {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? +value : 1))
  @Min(1)
  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  page?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? +value : 10))
  @Min(1)
  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  pageSize?: number
}
