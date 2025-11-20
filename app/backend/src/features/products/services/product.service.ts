import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../core/entities/product.entity';
import { SupplierEntity } from '../../../core/entities/supplier.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(SupplierEntity)
        private readonly supplierRepository: Repository<SupplierEntity>
    ) {}

    findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find({
            relations: ['supplier']
        });
    }

    async findOne(id: string): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['supplier']
        });

        if (!product) {
            throw new NotFoundException(`Product with id "${id}" not found`);
        }

        return product;
    }

    async create(product: ProductEntity): Promise<ProductEntity> {
        const supplier = await this.findSupplierOrFail(product.supplierId);
        const entity = this.productRepository.create({
            ...product,
            supplier
        });

        return this.productRepository.save(entity);
    }

    async update(
        id: string,
        partial: Partial<ProductEntity>
    ): Promise<ProductEntity> {
        const existing = await this.findOne(id);

        const supplier = partial.supplierId
            ? await this.findSupplierOrFail(partial.supplierId)
            : existing.supplier;

        const updated: ProductEntity = {
            ...existing,
            name: partial.name ?? existing.name,
            category: partial.category ?? existing.category,
            image: partial.image ?? existing.image,
            price: partial.price ?? existing.price,
            description: partial.description ?? existing.description,
            supplierId: partial.supplierId ?? existing.supplierId,
            supplier
        };

        return this.productRepository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const existing = await this.findOne(id);
        await this.productRepository.remove(existing);
    }

    findAllSuppliers(): Promise<SupplierEntity[]> {
        return this.supplierRepository.find();
    }

    private async findSupplierOrFail(id: string): Promise<SupplierEntity> {
        const supplier = await this.supplierRepository.findOne({
            where: { id }
        });

        if (!supplier) {
            throw new NotFoundException(`Supplier with id "${id}" not found`);
        }

        return supplier;
    }
}
