import { ApiProperty } from '@nestjs/swagger';

export class WalkthroughFileListDto {
    @ApiProperty({
        description: 'Available walkthrough asset filenames',
        example: ['products-walkthrough.txt', 'cart-walkthrough.txt'],
        isArray: true,
        type: String
    })
    files: string[];
}
