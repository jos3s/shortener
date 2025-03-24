import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  _saltRounds = 10;

  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      this._saltRounds,
    );

    const user = new User(createUserDto.email, passwordHash);

    await this.usersRepository.save(user);
    return user;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(email: string) {
    return await this.usersRepository.findOneBy({
      email: email,
    });
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
