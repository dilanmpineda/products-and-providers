import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Provider } from 'src/modules/providers/schema/provider.schema';

@Schema()
export class Product extends Document {
  @Prop({required: true, unique: true })
  name: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  stock: number;

  @Prop({required: true })
  type: string;

  @Prop({type: String, ref: 'Provider', required: true})
  provider: Provider;
}

export const ProductSchema = SchemaFactory.createForClass(Product);