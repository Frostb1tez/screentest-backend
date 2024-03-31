import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum Provider {
  LOCAL = 'local',
  FACEBOOK = 'facebook',
  LINE = 'line',
  GMAIL = 'gmail',
  APPLE = 'apple',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ unique: true })
  username: string

  @Column()
  fullName: string

  @Column({ nullable: true })
  avatarUrl?: string

  @Column({ nullable: true })
  otherDetails?: string

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  provider: Provider

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10)
  }
  @BeforeInsert()
  @BeforeUpdate()
  emailtoLowerCase() {
    if (this.email) this.email = this.email.toLowerCase()
  }

  @BeforeInsert()
  @BeforeUpdate()
  usernametoLowerCase() {
    if (this.username) this.username = this.username.toLowerCase()
  }
}
