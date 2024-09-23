import type { CreateProductDto } from './dto/create-product.dto'

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PaginatedResult } from 'src/common/pagination/pagination.interface'
import { PaginationService } from 'src/common/pagination/pagination.service'
import { Product, ProductTranslation } from 'src/entities'
import { SearchProductDto } from './dto/search-product.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation) private readonly translationRepository: Repository<ProductTranslation>,
    private readonly paginationService: PaginationService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { sku, price, translations } = createProductDto

    const existingProduct = await this.productRepository.findOne({ where: { sku } })
    if (existingProduct) {
      throw new NotFoundException(`Product with SKU ${sku} already exists`)
    }

    const product = this.productRepository.create({ sku, price })

    product.translations = translations.map((translation) => this.translationRepository.create(translation))

    return this.productRepository.save(product)
  }

  findAll(searchProductDto: SearchProductDto): Promise<PaginatedResult<Product>> {
    const { language, search, ...pageOptions } = searchProductDto

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.translations', 'translation')

    if (language) {
      queryBuilder.where('translation.language = :language', { language })
    }

    if (search) {
      queryBuilder.andWhere('translation.name ILIKE :search OR translation.description ILIKE :search', {
        search: `%${search}%`,
      })
    }

    return this.paginationService.paginate(queryBuilder, pageOptions)
  }
}
