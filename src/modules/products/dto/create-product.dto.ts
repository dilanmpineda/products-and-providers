import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    readonly stock: number;
    
    @IsString()
    @IsNotEmpty()
    readonly type: string;

    @IsString()
    readonly provider: string
}
