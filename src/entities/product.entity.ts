import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { ProductTranslation } from './product-translation.entity'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  sku: string

  @Column('decimal')
  price: number

  @CreateDateColumn({ update: false })
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => ProductTranslation, (translation) => translation.product, {
    cascade: true,
  })
  translations: ProductTranslation[]
}
