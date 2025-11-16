import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../../core/entities/order.entity';
import { OrderItemEntity } from '../../../core/entities/order-item.entity';
import { ProductService } from '../../products/services/product.service';
import { CartItemInput } from '../types/cart.types';
import { OrderStatus } from '../../../core/enums/order-status.enum';
import { UserEntity } from '../../../core/entities/user.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
        private readonly productService: ProductService
    ) {}

    async calculateTotal(items: CartItemInput[]): Promise<number> {
        if (!items || items.length === 0) {
            return 0;
        }

        let total = 0;

        for (const item of items) {
            if (item.quantity <= 0) {
                throw new BadRequestException(
                    'Quantity for each cart item must be greater than zero'
                );
            }

            const product = await this.productService.findOne(item.productId);

            if (!product) {
                throw new NotFoundException(
                    `Product with id "${item.productId}" not found`
                );
            }

            total += product.price * item.quantity;
        }

        return total;
    }

    async placeOrderForUser(
        userId: string,
        items: CartItemInput[]
    ): Promise<OrderEntity> {
        if (!items || items.length === 0) {
            throw new BadRequestException(
                'Cart must contain at least one item'
            );
        }

        const { orderItems, total } = await this.buildOrderItems(items);

        const user = { id: userId } as UserEntity;

        const order = this.orderRepository.create({
            user,
            status: OrderStatus.Pending,
            totalPrice: total
        });

        const savedOrder = await this.orderRepository.save(order);

        const orderItemEntities = orderItems.map(item =>
            this.orderItemRepository.create({
                ...item,
                order: savedOrder
            })
        );

        await this.orderItemRepository.save(orderItemEntities);

        return this.findOrderById(savedOrder.id!);
    }

    async findAllOrders(): Promise<OrderEntity[]> {
        return this.orderRepository.find({
            relations: ['items', 'items.product', 'user'],
            order: { createdAt: 'DESC' }
        });
    }

    async findOrdersForUser(userId: string): Promise<OrderEntity[]> {
        return this.orderRepository.find({
            where: {
                user: { id: userId }
            },
            relations: ['items', 'items.product', 'user']
        });
    }

    async findOrderForUser(
        userId: string,
        orderId: string
    ): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            where: {
                id: orderId,
                user: { id: userId }
            },
            relations: ['items', 'items.product', 'user']
        });

        if (!order) {
            throw new NotFoundException(
                `Order with id "${orderId}" not found for this user`
            );
        }

        return order;
    }

    async findOrderById(orderId: string): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['items', 'items.product', 'user']
        });

        if (!order) {
            throw new NotFoundException(`Order with id "${orderId}" not found`);
        }

        return order;
    }

    async updateOrderStatus(
        orderId: string,
        status: OrderStatus
    ): Promise<OrderEntity> {
        const order = await this.findOrderById(orderId);
        order.status = status;

        return this.orderRepository.save(order);
    }

    private async buildOrderItems(items: CartItemInput[]): Promise<{
        orderItems: Partial<OrderItemEntity>[];
        total: number;
    }> {
        let total = 0;
        const orderItems: Partial<OrderItemEntity>[] = [];

        for (const item of items) {
            if (item.quantity <= 0) {
                throw new BadRequestException(
                    'Quantity for each cart item must be greater than zero'
                );
            }

            const product = await this.productService.findOne(item.productId);

            if (!product) {
                throw new NotFoundException(
                    `Product with id "${item.productId}" not found`
                );
            }

            const priceAtPurchase = product.price;
            total += priceAtPurchase * item.quantity;

            orderItems.push({
                product,
                quantity: item.quantity,
                priceAtPurchase
            });
        }

        return { orderItems, total };
    }
}
