import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ReportType } from '../enums/report-type.enum';
import { ReportKind } from '../enums/report-kind.enum';

@Entity('reports')
export class ReportEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    filename: string;

    @Column({
        type: 'enum',
        enum: ReportType,
        enumName: 'report_type_enum'
    })
    type: ReportType;

    @Column({
        type: 'enum',
        enum: ReportKind,
        enumName: 'report_kind_enum'
    })
    reportKind: ReportKind;

    @Column({ type: 'bytea' })
    data: Buffer;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
