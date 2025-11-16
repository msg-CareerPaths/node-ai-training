import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../core/enums/order-status.enum';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
    @ApiProperty({ description: 'Order identifier', format: 'uuid' })
    id: string;

    @ApiProperty({
        description: 'Current status of the order',
        enum: OrderStatus
    })
    status: OrderStatus;

    @ApiProperty({
        description: 'Total price of the order',
        type: Number
    })
    totalPrice: number;

    @ApiProperty({
        description: 'When the order was created'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'When the order was last updated'
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'Items contained in this order',
        type: OrderItemDto,
        isArray: true
    })
    items: OrderItemDto[];
}
