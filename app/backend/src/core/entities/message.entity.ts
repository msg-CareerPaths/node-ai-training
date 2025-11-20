import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { MessageSender } from '../enums/message-sender.enum';
import { UserEntity } from './user.entity';

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'userId' })
    user!: UserEntity;

    @Column({ type: 'timestamptz' })
    timestamp: Date;

    @Column({
        type: 'enum',
        enum: MessageSender,
        enumName: 'message_sender_enum'
    })
    sender!: MessageSender;

    @Column('uuid', { nullable: true })
    groupId!: string | null;

    @Column()
    content!: string;
}
