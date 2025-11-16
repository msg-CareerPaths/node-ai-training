import { ProductDto } from '../../dtos/product.dto';
import { CreateProductDto } from '../../dtos/create-product.dto';
import { UpdateProductDto } from '../../dtos/update-product.dto';
import { ProductEntity } from '../../../../core/entities/product.entity';

export function mapProductEntityToDto(
    entity: ProductEntity
): ProductDto | null {
    if (!entity) return null;

    return {
        id: entity.id || '',
        name: entity.name,
        category: entity.category,
        image: entity.image,
        price: entity.price,
        description: entity.description
    };
}

export function mapProductEntitiesToDtos(
    entities: ProductEntity[] = []
): ProductDto[] {
    return entities.map(mapProductEntityToDto) as ProductDto[];
}

export function mapCreateProductDtoToEntity(
    dto: CreateProductDto
): ProductEntity {
    return {
        ...new ProductEntity(),
        name: dto.name,
        category: dto.category,
        image: dto.image,
        price: dto.price,
        description: dto.description
    };
}

export function mapUpdateProductDtoToPartialEntity(
    dto: UpdateProductDto
): Partial<ProductEntity> {
    return {
        name: dto.name ?? undefined,
        category: dto.category ?? undefined,
        image: dto.image ?? undefined,
        price: dto.price ?? undefined,
        description: dto.description ?? undefined
    };
}
