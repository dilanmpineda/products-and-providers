import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Product } from "src/modules/products/schema/product.schema";

export class CreateProviderDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @IsNotEmpty()
    readonly address: string;
    
    @IsString()
    @IsNotEmpty()
    readonly type: string;

    @IsOptional()
    @IsArray()
    readonly products: Product[]
}
