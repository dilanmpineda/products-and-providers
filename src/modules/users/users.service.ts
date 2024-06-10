import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { AlreadyExistsException } from 'src/common/exceptions/already-exists';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();

    if (existingUser) {
      throw new AlreadyExistsException();
    }

    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new this.userModel({ ...userData, password: hashedPassword });
    return createUser.save()
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userModel.find().select('-password').exec();
    return users;
  }


  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findOne(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userModel.findById(id).select('-password').exec();
    return user ? user.toObject() : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'> | null> {
    const { password, ...userData } = updateUserDto;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id, {
      ...userData,
      ...(hashedPassword && { password: hashedPassword })
    },
      { new: true }).select('-password').exec();

    return updatedUser ? updatedUser.toObject() : null;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
