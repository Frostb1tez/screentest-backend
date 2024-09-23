import type { TestingModule } from '@nestjs/testing'

import { Test } from '@nestjs/testing'

import { NotFoundException } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { PaginationService } from 'src/common/pagination/pagination.service'
import { Product, ProductTranslation } from 'src/entities'
import { Language } from 'src/entities/product-translation.entity'
import { Repository } from 'typeorm'
import { CreateProductDto } from '../dto/create-product.dto'
import { SearchProductDto } from '../dto/search-product.dto'
import { ProductService } from '../product.service'

describe('ProductService', () => {
  let service: ProductService
  let paginationService: PaginationService
  let productRepository: Repository<Product>
  let translationRepository: Repository<ProductTranslation>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        PaginationService,
        { provide: getRepositoryToken(Product), useClass: Repository },
        { provide: getRepositoryToken(ProductTranslation), useClass: Repository },
        { provide: PaginationService, useValue: { paginate: jest.fn() } },
      ],
    }).compile()

    service = module.get<ProductService>(ProductService)
    paginationService = module.get<PaginationService>(PaginationService)
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product))
    translationRepository = module.get<Repository<ProductTranslation>>(getRepositoryToken(ProductTranslation))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(paginationService).toBeDefined()
    expect(productRepository).toBeDefined()
    expect(translationRepository).toBeDefined()
  })

  describe('create', () => {
    const createProductDto: CreateProductDto = {
      sku: 'SKU123',
      price: 10,
      translations: [
        { language: Language.English, name: 'Product', description: 'Product Description' },
        { language: Language.Thai, name: 'สินค้า', description: 'รายละเอียดสินค้า' },
      ],
    }

    it('should create a new product if SKU does not exist', async () => {
      const product = new Product()
      const translation = createProductDto.translations.map((t) => {
        const productTranslation = new ProductTranslation()
        productTranslation.language = t.language
        productTranslation.name = t.name
        productTranslation.description = t.description
        return productTranslation
      })
      product.id = 1
      product.price = createProductDto.price
      product.sku = createProductDto.sku
      product.translations = translation

      const findOneSpy = jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined)
      const createSpy = jest.spyOn(productRepository, 'create').mockReturnValue(product)
      const saveSpy = jest.spyOn(productRepository, 'save').mockResolvedValue(product)
      const translationCreateSpy = jest
        .spyOn(translationRepository, 'create')
        .mockReturnValue(translation[0])
        .mockReturnValue(translation[1])

      const result = await service.create(createProductDto)

      expect(findOneSpy).toHaveBeenCalledWith({ where: { sku: 'SKU123' } })
      expect(createSpy).toHaveBeenCalledWith({ sku: createProductDto.sku, price: createProductDto.price })
      expect(translationCreateSpy).toHaveBeenCalledWith(createProductDto.translations[0])
      expect(translationCreateSpy).toHaveBeenCalledWith(createProductDto.translations[1])
      expect(saveSpy).toHaveBeenCalledWith(product)
      expect(result).toEqual(product)
    })

    it('should throw an error if SKU already exists', async () => {
      const product = new Product()
      product.id = 1
      product.sku = 'SKU123'

      const findOneSpy = jest.spyOn(productRepository, 'findOne').mockResolvedValue(product)

      await expect(service.create(createProductDto)).rejects.toThrowError(
        new NotFoundException(`Product with SKU ${createProductDto.sku} already exists`),
      )
      expect(findOneSpy).toHaveBeenCalledWith({ where: { sku: 'SKU123' } })
    })
  })

  describe('findAll', () => {
    it('should return paginated products with search criteria', async () => {
      const mockResult = {
        data: [
          {
            id: 1,
            sku: 'SKU123',
            price: 100,
            translations: [
              { id: 1, language: Language.English, name: 'Product', description: 'Product Description' },
              { id: 2, language: Language.Thai, name: 'สินค้า', description: 'รายละเอียดสินค้า' },
            ],
          },
        ],
        page: 1,
        pageSize: 10,
        totalCount: 1,
      }
      const searchProductDto: SearchProductDto = {
        language: Language.English,
        search: 'product',
        page: 1,
        pageSize: 10,
      }

      const createQueryBuilderSpy = jest.spyOn(productRepository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
      } as any)

      const paginateSpy = jest.spyOn(paginationService, 'paginate').mockResolvedValue(mockResult)

      const result = await service.findAll(searchProductDto)

      expect(createQueryBuilderSpy).toHaveBeenCalled()
      expect(paginateSpy).toHaveBeenCalled()
      expect(result).toEqual(mockResult)
    })
  })
})
