import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import { MessageEntity } from './message.entity';
import { SupplierEntity } from './supplier.entity';

export const DatabaseEntities = [
    UserEntity,
    SupplierEntity,
    ProductEntity,
    OrderEntity,
    OrderItemEntity,
    MessageEntity
];
