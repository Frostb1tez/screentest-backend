import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { PaginatedResult } from 'src/common/pagination/pagination.interface'
import { Product } from 'src/entities'
import { CreateProductDto } from './dto/create-product.dto'
import { SearchProductDto } from './dto/search-product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto)
  }

  @Get()
  findAll(@Query() searchProductDto: SearchProductDto): Promise<PaginatedResult<Product>> {
    return this.productService.findAll(searchProductDto)
  }
}
