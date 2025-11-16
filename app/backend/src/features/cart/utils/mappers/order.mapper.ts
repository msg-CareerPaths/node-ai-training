import { OrderItemDto } from '../../dtos/order-item.dto';
import { OrderDto } from '../../dtos/order.dto';
import { OrderItemEntity } from '../../../../core/entities/order-item.entity';
import { OrderEntity } from '../../../../core/entities/order.entity';
import { mapProductEntityToDto } from '../../../products/utils/mappers/product.mapper';

export function mapOrderItemEntityToDto(
    entity: OrderItemEntity
): OrderItemDto | null {
    if (!entity) return null;

    return {
        id: entity.id || '',
        product: mapProductEntityToDto(entity.product)!,
        quantity: entity.quantity,
        priceAtPurchase: entity.priceAtPurchase
    };
}

export function mapOrderItemEntitiesToDtos(
    entities: OrderItemEntity[] = []
): OrderItemDto[] {
    return entities
        .map(mapOrderItemEntityToDto)
        .filter(Boolean) as OrderItemDto[];
}

export function mapOrderEntityToDto(entity: OrderEntity): OrderDto | null {
    if (!entity) return null;

    return {
        id: entity.id || '',
        status: entity.status,
        totalPrice: entity.totalPrice,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        items: mapOrderItemEntitiesToDtos(entity.items || [])
    };
}

export function mapOrderEntitiesToDtos(
    entities: OrderEntity[] = []
): OrderDto[] {
    return entities.map(mapOrderEntityToDto).filter(Boolean) as OrderDto[];
}
