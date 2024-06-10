import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './schema/provider.schema';
import { Model } from 'mongoose';
import { AlreadyExistsException } from 'src/common/exceptions/already-exists';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectModel(Provider.name) private readonly providerModel: Model<Provider>
  ) { }

  async create(createProviderDto: CreateProviderDto) {
    const { name } = createProviderDto;
    const existingProvider = await this.providerModel.findOne({ name: name.toLowerCase() });

    if (existingProvider) {
      throw new AlreadyExistsException();
    }
    const createProvider = new this.providerModel({ ...createProviderDto, name: name.toLowerCase() });
    return createProvider.save();
  }

  async findAll() {
    const providers = await this.providerModel.find().exec();
    return providers;
  }

  async findOne(id: string) {
    const provider = await this.providerModel.findById(id).exec();
    return provider ? provider.toObject() : null;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const updatedProvider = await this.providerModel.findByIdAndUpdate(
      id, {
      ...updateProviderDto
    },
      { new: true }
    ).exec();

    return updatedProvider ? updatedProvider.toObject() : null;
  }

  remove(id: string) {
    return this.providerModel.findByIdAndDelete(id).exec();
  }

  async findByType(type: string) {
    const providers = await this.providerModel.find({ type }).exec();
    return providers;
  }
}
