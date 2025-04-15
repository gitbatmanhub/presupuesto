import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { comparePassword } from './config/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async existeUser(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return comparePassword(password, hash);
  }
}
