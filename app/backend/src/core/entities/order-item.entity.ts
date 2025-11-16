import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => ProductEntity, { eager: true })
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column()
    priceAtPurchase: number;

    @ManyToOne(() => OrderEntity, order => order.items, { onDelete: 'CASCADE' })
    order: OrderEntity;
}
