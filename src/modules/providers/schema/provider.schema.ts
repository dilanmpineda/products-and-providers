import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/modules/products/schema/product.schema';

@Schema()
export class Provider extends Document {
  @Prop({required: true, unique: true })
  name: string;

  @Prop({required: true})
  address: string;

  @Prop({required: true })
  type: string;

  @Prop({type: Array, ref: 'Product', required: true})
  products: Product[];
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);