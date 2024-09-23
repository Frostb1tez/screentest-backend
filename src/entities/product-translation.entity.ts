import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Product } from './product.entity'

export enum Language {
  English = 'en',
  Thai = 'th',
  // add more language options
}

@Entity('product_translations')
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: Language,
  })
  language: Language

  @Column()
  name: string

  @Column('text')
  description: string

  @Column()
  productId: number

  @CreateDateColumn({ update: false })
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Product, (product) => product.translations, { onDelete: 'CASCADE' })
  product?: Product
}
