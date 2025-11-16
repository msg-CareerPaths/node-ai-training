import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../core/entities/order.entity';
import { ReportEntity } from '../../core/entities/report.entity';
import { OrderItemEntity } from '../../core/entities/order-item.entity';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { ReportsGenerationService } from './services/reports-generation.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, ReportEntity])
    ],
    controllers: [ReportsController],
    providers: [ReportsService, ReportsGenerationService]
})
export class ReportsModule {}
