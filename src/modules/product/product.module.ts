import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product, ProductTranslation } from 'src/entities'

import { PaginationModule } from 'src/common/pagination/pagination.module'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTranslation]), PaginationModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
