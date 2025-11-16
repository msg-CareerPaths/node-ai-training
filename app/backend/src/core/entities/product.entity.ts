import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ProductCategory,
        enumName: 'product_category_enum'
    })
    category: ProductCategory;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column()
    description: string;
}
