import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { OrderDto } from '../dtos/order.dto';
import {
    mapOrderEntitiesToDtos,
    mapOrderEntityToDto
} from '../utils/mappers/order.mapper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { User } from '../../auth/decorators/user.decorator';
import type { AuthUserData } from '../../auth/types/jwt.types';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../../core/enums/user-roles.enum';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    @Roles(UserRole.Admin)
    @ApiOperation({
        summary: 'List all orders'
    })
    @ApiOkResponse({
        description: 'All orders retrieved',
        type: OrderDto,
        isArray: true
    })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async findAllOrders(): Promise<OrderDto[]> {
        const orders = await this.cartService.findAllOrders();
        return mapOrderEntitiesToDtos(orders);
    }

    @Get('my')
    @ApiOperation({
        summary: 'List all orders for the currently authenticated user'
    })
    @ApiOkResponse({
        description: 'Orders retrieved',
        type: OrderDto,
        isArray: true
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async findMyOrders(@User() user: AuthUserData): Promise<OrderDto[]> {
        const orders = await this.cartService.findOrdersForUser(user.id);
        return mapOrderEntitiesToDtos(orders);
    }

    @Get(':id')
    @ApiOperation({
        summary:
            'Get a specific order by id for the currently authenticated user'
    })
    @ApiOkResponse({
        description: 'Order retrieved',
        type: OrderDto
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async findOrderById(
        @User() user: AuthUserData,
        @Param('id') id: string
    ): Promise<OrderDto | null> {
        const order = await this.cartService.findOrderForUser(user.id, id);
        return mapOrderEntityToDto(order);
    }

    @Patch(':id/status')
    @Roles(UserRole.Admin)
    @ApiOperation({
        summary: 'Update the status of an order'
    })
    @ApiOkResponse({
        description: 'Order status updated',
        type: OrderDto
    })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    @ApiUnauthorizedResponse({
        description: 'Invalid authentication credentials.'
    })
    async updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateOrderStatusDto
    ): Promise<OrderDto | null> {
        const order = await this.cartService.updateOrderStatus(id, dto.status);
        return mapOrderEntityToDto(order);
    }
}
