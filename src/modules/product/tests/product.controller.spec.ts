import { Test, TestingModule } from '@nestjs/testing'
import { PaginatedResult } from 'src/common/pagination/pagination.interface'
import { Product } from 'src/entities'
import { Language } from 'src/entities/product-translation.entity'
import { CreateProductDto } from '../dto/create-product.dto'
import { SearchProductDto } from '../dto/search-product.dto'
import { ProductController } from '../product.controller'
import { ProductService } from '../product.service'

describe('ProductController', () => {
  let productController: ProductController
  let productService: ProductService

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile()

    productController = module.get<ProductController>(ProductController)
    productService = module.get<ProductService>(ProductService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should call ProductService create method with correct arguments and return the result', async () => {
      const createProductDto: CreateProductDto = {
        sku: 'SKU123',
        price: 10,
        translations: [
          { language: Language.English, name: 'Product', description: 'Product Description' },
          { language: Language.Thai, name: 'สินค้า', description: 'รายละเอียดสินค้า' },
        ],
      }

      const mockProduct = {
        id: 1,
        sku: 'SKU123',
        price: 10,
        translations: createProductDto.translations,
      }

      jest.spyOn(productService, 'create').mockResolvedValue(mockProduct as Product)

      const result = await productController.create(createProductDto)

      expect(productService.create).toHaveBeenCalledWith(createProductDto)
      expect(result).toEqual(mockProduct)
    })
  })

  describe('findAll', () => {
    it('should call ProductService findAll method with correct arguments and return the paginated result', async () => {
      const searchProductDto: SearchProductDto = {
        language: Language.English,
        search: 'product',
        page: 1,
        pageSize: 10,
      }

      const paginatedResult: PaginatedResult<Product> = {
        data: [
          {
            id: 1,
            sku: 'SKU123',
            price: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
            translations: [
              {
                id: 1,
                language: Language.English,
                name: 'Product',
                description: 'Product Description',
                productId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 2,
                language: Language.Thai,
                name: 'สินค้า',
                description: 'รายละเอียดสินค้า',
                productId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
        ],
        page: 1,
        pageSize: 10,
        totalCount: 1,
      }

      jest.spyOn(productService, 'findAll').mockResolvedValue(paginatedResult)

      const result = await productController.findAll(searchProductDto)

      expect(productService.findAll).toHaveBeenCalledWith(searchProductDto)
      expect(result).toEqual(paginatedResult)
    })
  })
})
