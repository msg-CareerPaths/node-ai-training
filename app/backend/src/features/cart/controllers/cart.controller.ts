import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { CartTotalRequestDto } from '../dtos/cart-total-request.dto';
import { CartTotalResponseDto } from '../dtos/cart-total-response.dto';
import { OrderDto } from '../dtos/order.dto';
import {
    mapCartItemsDtoToInputs,
    mapCartTotalToDto
} from '../utils/mappers/cart.mapper';
import { mapOrderEntityToDto } from '../utils/mappers/order.mapper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { User } from '../../auth/decorators/user.decorator';
import type { AuthUserData } from '../../auth/types/jwt.types';

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('total')
    @ApiOperation({
        summary: 'Calculate the total price of a shopping cart'
    })
    @ApiOkResponse({
        description: 'Cart total calculated',
        type: CartTotalResponseDto
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async calculateTotal(
        @Body() dto: CartTotalRequestDto
    ): Promise<CartTotalResponseDto> {
        const items = mapCartItemsDtoToInputs(dto.items);
        const total = await this.cartService.calculateTotal(items);
        return mapCartTotalToDto(total);
    }

    @Post('checkout')
    @ApiOperation({
        summary: 'Place an order for the current user from the shopping cart'
    })
    @ApiCreatedResponse({
        description: 'Order created from cart contents',
        type: OrderDto
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async checkout(
        @User() user: AuthUserData,
        @Body() dto: CartTotalRequestDto
    ): Promise<OrderDto | null> {
        const items = mapCartItemsDtoToInputs(dto.items);
        const order = await this.cartService.placeOrderForUser(user.id, items);
        return mapOrderEntityToDto(order);
    }
}
