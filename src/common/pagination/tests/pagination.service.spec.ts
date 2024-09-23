import { SelectQueryBuilder } from 'typeorm'
import { PageOptions } from '../pagination.dto'
import { PaginatedResult } from '../pagination.interface'
import { PaginationService } from '../pagination.service'

describe('PaginationService', () => {
  let paginationService: PaginationService
  let queryBuilder: SelectQueryBuilder<any>

  beforeEach(() => {
    paginationService = new PaginationService()

    queryBuilder = {
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
    } as any
  })

  describe('paginate', () => {
    it('should return paginated results with the correct data', async () => {
      const mockData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]
      const mockTotalCount = 20
      const options: PageOptions = { page: 2, pageSize: 5 }

      jest.spyOn(queryBuilder, 'getManyAndCount').mockResolvedValue([mockData, mockTotalCount])

      const result: PaginatedResult<any> = await paginationService.paginate(queryBuilder, options)

      expect(queryBuilder.skip).toHaveBeenCalledWith(5)
      expect(queryBuilder.take).toHaveBeenCalledWith(5)
      expect(queryBuilder.getManyAndCount).toHaveBeenCalled()

      expect(result).toEqual({
        data: mockData,
        page: 2,
        pageSize: 5,
        totalCount: 20,
      })
    })

    it('should handle default pagination options if none are provided', async () => {
      const mockData = [{ id: 1, name: 'Default Item' }]
      const mockTotalCount = 10
      const options: PageOptions = {}

      jest.spyOn(queryBuilder, 'getManyAndCount').mockResolvedValue([mockData, mockTotalCount])

      const result: PaginatedResult<any> = await paginationService.paginate(queryBuilder, options)

      expect(queryBuilder.skip).toHaveBeenCalledWith(0) // (page 1 - 1) * pageSize (default is 10)
      expect(queryBuilder.take).toHaveBeenCalledWith(10) // default pageSize is 10
      expect(queryBuilder.getManyAndCount).toHaveBeenCalled()

      expect(result).toEqual({
        data: mockData,
        page: 1,
        pageSize: 10,
        totalCount: 10,
      })
    })

    it('should return empty results if no data is found', async () => {
      const mockData = []
      const mockTotalCount = 0
      const options: PageOptions = { page: 1, pageSize: 5 }

      jest.spyOn(queryBuilder, 'getManyAndCount').mockResolvedValue([mockData, mockTotalCount])

      const result: PaginatedResult<any> = await paginationService.paginate(queryBuilder, options)

      expect(queryBuilder.skip).toHaveBeenCalledWith(0)
      expect(queryBuilder.take).toHaveBeenCalledWith(5)
      expect(queryBuilder.getManyAndCount).toHaveBeenCalled()

      expect(result).toEqual({
        data: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,
      })
    })
  })
})
