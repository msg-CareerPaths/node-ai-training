import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('suppliers')
export class SupplierEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    brandDescription: string;

    @OneToMany(() => ProductEntity, product => product.supplier)
    products: ProductEntity[];
}
