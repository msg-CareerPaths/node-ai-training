import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../core/enums/order-status.enum';

export class UpdateOrderStatusDto {
    @ApiProperty({
        description: 'New status for the order',
        enum: OrderStatus
    })
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
