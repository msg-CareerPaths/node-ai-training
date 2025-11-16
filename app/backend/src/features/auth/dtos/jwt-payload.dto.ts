import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
    @ApiProperty({ description: 'The JWT token used for access' })
    access_token: string;
}
