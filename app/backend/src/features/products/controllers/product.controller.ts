import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductDto } from '../dtos/product.dto';
import {
    mapCreateProductDtoToEntity,
    mapProductEntitiesToDtos,
    mapProductEntityToDto,
    mapUpdateProductDtoToPartialEntity
} from '../utils/mappers/product.mapper';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../../core/enums/user-roles.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { mapSupplierEntitiesToDtos } from '../utils/mappers/product.mapper';
import { SupplierDto } from '../dtos/supplier.dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'List all products' })
    @ApiOkResponse({
        description: 'Products retrieved',
        type: ProductDto,
        isArray: true
    })
    async findAll(): Promise<ProductDto[]> {
        const products = await this.productService.findAll();
        return mapProductEntitiesToDtos(products);
    }

    @Get('suppliers')
    @ApiOperation({ summary: 'List all suppliers' })
    @ApiOkResponse({
        description: 'Suppliers retrieved',
        type: SupplierDto,
        isArray: true
    })
    async findAllSuppliers(): Promise<SupplierDto[]> {
        const suppliers = await this.productService.findAllSuppliers();
        return mapSupplierEntitiesToDtos(suppliers);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiOkResponse({ description: 'Product found', type: ProductDto })
    async findOne(@Param('id') id: string): Promise<ProductDto | null> {
        const product = await this.productService.findOne(id);
        return mapProductEntityToDto(product);
    }

    @Post()
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Create a new product' })
    @ApiCreatedResponse({ description: 'Product created', type: ProductDto })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async create(@Body() dto: CreateProductDto): Promise<ProductDto | null> {
        const entity = mapCreateProductDtoToEntity(dto);
        const created = await this.productService.create(entity);
        return mapProductEntityToDto(created);
    }

    @Patch(':id')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Update an existing product' })
    @ApiOkResponse({ description: 'Product updated', type: ProductDto })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto
    ): Promise<ProductDto | null> {
        const partialEntity = mapUpdateProductDtoToPartialEntity(dto);
        const updated = await this.productService.update(id, partialEntity);
        return mapProductEntityToDto(updated);
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiNoContentResponse({ description: 'Product deleted' })
    @ApiForbiddenResponse({ description: 'Invalid permissions' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.productService.remove(id);
    }
}
