import { ApiProperty } from '@nestjs/swagger';

export class CartTotalResponseDto {
    @ApiProperty({
        description: 'Total price of the cart',
        type: Number
    })
    total: number;
}
