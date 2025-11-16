import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => UserEntity, { eager: true })
    user: UserEntity;

    @OneToMany(() => OrderItemEntity, item => item.order, { cascade: true })
    items: OrderItemEntity[];

    @Column({
        type: 'enum',
        enum: OrderStatus,
        enumName: 'order_status_enum',
        default: OrderStatus.Pending
    })
    status: OrderStatus;

    @Column({ type: 'decimal' })
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
