import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    RelationId,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';
import { SupplierEntity } from './supplier.entity';

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

    @ManyToOne(() => SupplierEntity, supplier => supplier.products, {
        eager: true
    })
    @JoinColumn({ name: 'supplierId' })
    supplier: SupplierEntity;

    @RelationId((product: ProductEntity) => product.supplier)
    supplierId: string;
}
