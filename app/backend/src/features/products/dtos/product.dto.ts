import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../../../core/enums/product-category.enum';

export class ProductDto {
    @ApiProperty({ description: 'Product identifier', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Name of the product' })
    name: string;

    @ApiProperty({
        description: 'Product category',
        enum: ProductCategory
    })
    category: ProductCategory;

    @ApiProperty({ description: 'Image URL for the product' })
    image: string;

    @ApiProperty({ description: 'Price of the product', type: Number })
    price: number;

    @ApiProperty({ description: 'Detailed product description' })
    description: string;
}
