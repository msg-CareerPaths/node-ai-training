import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID
} from 'class-validator';
import { ProductCategory } from '../../../core/enums/product-category.enum';

export class UpdateProductDto {
    @ApiPropertyOptional({ description: 'Name of the product' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: 'Product category',
        enum: ProductCategory
    })
    @IsEnum(ProductCategory)
    @IsOptional()
    category?: ProductCategory;

    @ApiPropertyOptional({ description: 'Image URL for the product' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    image?: string;

    @ApiPropertyOptional({ description: 'Price of the product', type: Number })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({
        description: 'Detailed product description'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'Identifier of the product supplier',
        format: 'uuid'
    })
    @IsUUID()
    @IsOptional()
    supplierId?: string;
}
