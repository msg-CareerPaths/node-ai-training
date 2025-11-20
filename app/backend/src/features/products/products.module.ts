import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../core/entities/product.entity';
import { SupplierEntity } from '../../core/entities/supplier.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, SupplierEntity])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductsModule {}
