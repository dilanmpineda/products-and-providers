import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { AlreadyExistsException } from 'src/common/exceptions/already-exists';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private readonly productsModel: Model<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const { name } = createProductDto;
    const existingProduct = await this.productsModel.findOne({ name: name.toLowerCase() });

    if (existingProduct) {
      throw new AlreadyExistsException();
    }
    const createProduct = new this.productsModel({ ...createProductDto, name: name.toLowerCase() });
    return createProduct.save();
  }

  async findAll() {
    const products = await this.productsModel.find().exec();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productsModel.findById(id).exec();
    return product ? product.toObject() : null;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productsModel.findByIdAndUpdate(
      id, {
      ...updateProductDto
    },
      { new: true }
    ).exec();

    return updatedProduct ? updatedProduct.toObject() : null;
  }

  remove(id: string) {
    return this.productsModel.findByIdAndDelete(id).exec();
  }

  async findByType(type: string) {
    const products = await this.productsModel.find({ type }).exec();
    return products;
  }
}
