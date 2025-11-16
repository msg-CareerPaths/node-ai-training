import { CartItemDto } from '../../dtos/cart-item.dto';
import { CartTotalResponseDto } from '../../dtos/cart-total-response.dto';
import { CartItemInput } from '../../types/cart.types';

export function mapCartItemDtoToInput(dto: CartItemDto): CartItemInput {
    return {
        productId: dto.productId,
        quantity: dto.quantity
    };
}

export function mapCartItemsDtoToInputs(
    dtos: CartItemDto[] = []
): CartItemInput[] {
    return dtos.map(mapCartItemDtoToInput);
}

export function mapCartTotalToDto(total: number): CartTotalResponseDto {
    return { total };
}
