import { Injectable } from '@nestjs/common'
import { SelectQueryBuilder } from 'typeorm'
import { PageOptions } from './pagination.dto'
import { IPaginationService, PaginatedResult } from './pagination.interface'

@Injectable()
export class PaginationService implements IPaginationService {
  async paginate<T>(queryBuilder: SelectQueryBuilder<T>, options: PageOptions): Promise<PaginatedResult<T>> {
    const { page = 1, pageSize = 10 } = options
    const skip: number = (page - 1) * pageSize
    const take: number = pageSize
    const [data, totalCount] = await queryBuilder.skip(skip).take(take).getManyAndCount()
    return {
      data,
      page,
      pageSize,
      totalCount,
    }
  }
}
