import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../core/entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductsModule {}
