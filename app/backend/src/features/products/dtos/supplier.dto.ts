import { ApiProperty } from '@nestjs/swagger';

export class SupplierDto {
    @ApiProperty({ description: 'Supplier identifier', format: 'uuid' })
    id: string;

    @ApiProperty({ description: 'Name of the supplier' })
    name: string;

    @ApiProperty({
        description: 'What the supplier brand is known for or focused on'
    })
    brandDescription: string;
}
