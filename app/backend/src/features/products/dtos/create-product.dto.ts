import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID
} from 'class-validator';
import { ProductCategory } from '../../../core/enums/product-category.enum';

export class CreateProductDto {
    @ApiProperty({ description: 'Name of the product' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Product category',
        enum: ProductCategory
    })
    @IsEnum(ProductCategory)
    category: ProductCategory;

    @ApiProperty({ description: 'Image URL for the product' })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ description: 'Price of the product', type: Number })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({ description: 'Detailed product description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Identifier of the product supplier',
        format: 'uuid'
    })
    @IsUUID()
    @IsNotEmpty()
    supplierId: string;
}
