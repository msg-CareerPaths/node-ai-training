import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MessageSender } from '../enums/message-sender.enum';

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('uuid')
    userId!: string;

    @Column()
    timestamp: Date;

    @Column({
        type: 'enum',
        enum: MessageSender
    })
    sender!: MessageSender;

    @Column('uuid', { nullable: true })
    groupId!: string | null;

    @Column()
    content!: string;
}
