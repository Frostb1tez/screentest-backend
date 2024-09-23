import type { SelectQueryBuilder } from 'typeorm'
import type { PageOptions } from './pagination.dto'

export interface PaginatedResult<T> {
  data: T[]
  page: number
  pageSize: number
  totalCount: number
}

export interface IPaginationService {
  paginate<T>(queryBuilder: SelectQueryBuilder<T>, options: PageOptions): Promise<PaginatedResult<T>>
}
