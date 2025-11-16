import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../core/entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {}

    findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }

    async findOne(id: string): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new NotFoundException(`Product with id "${id}" not found`);
        }

        return product;
    }

    async create(product: ProductEntity): Promise<ProductEntity> {
        const entity = this.productRepository.create(product);
        return this.productRepository.save(entity);
    }

    async update(
        id: string,
        partial: Partial<ProductEntity>
    ): Promise<ProductEntity> {
        const existing = await this.findOne(id);

        const updated: ProductEntity = {
            ...existing,
            name: partial.name ?? existing.name,
            category: partial.category ?? existing.category,
            image: partial.image ?? existing.image,
            price: partial.price ?? existing.price,
            description: partial.description ?? existing.description
        };

        return this.productRepository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const existing = await this.findOne(id);
        await this.productRepository.remove(existing);
    }
}
