import type { SignInPasswordDto } from './dto/sign-in.dto'
import type { SignUpDto } from './dto/sign-up.dto'

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from 'src/entities'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //TODO: should define for getMe function
  async getMe(id: number) {
    const user = await this.usersRepository.findOne(id)
    if (!user) throw new NotFoundException('user not found')
    const { password, ...userWithoutPassword } = user
    return { user: userWithoutPassword }
  }

  async createUser(dto: SignUpDto): Promise<User> {
    const { email, username } = dto
    const userEntity = await this.usersRepository.findOne({ where: [{ email }, { username }] })
    if (userEntity) throw new ConflictException('duplicate username or email')
    const user = this.usersRepository.create(dto)
    return this.usersRepository.save(user)
  }

  async login(dto: SignInPasswordDto) {
    const { identity, password } = dto
    const userEntity = await this.usersRepository.findOne({ where: [{ email: identity }, { username: identity }] })
    if (!userEntity) throw new NotFoundException('username or password invalid')

    const { password: userPassword, ...user } = userEntity
    const isPasswordValidate = await bcrypt.compare(password, userPassword)
    if (!isPasswordValidate) throw new NotFoundException('username or password invalid')

    const jwtToken = await this.signJwtToken(userEntity)

    return { success: true, accessToken: jwtToken, user }
  }

  private async signJwtToken(user: User): Promise<string> {
    const { id, username, email } = user
    return this.jwtService.sign({ id, username, email })
  }
}
