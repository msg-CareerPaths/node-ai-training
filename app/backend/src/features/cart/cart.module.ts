import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../core/entities/order.entity';
import { OrderItemEntity } from '../../core/entities/order-item.entity';
import { CartController } from './controllers/cart.controller';
import { OrdersController } from './controllers/orders.controller';
import { CartService } from './services/cart.service';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
        ProductsModule
    ],
    controllers: [CartController, OrdersController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule {}
