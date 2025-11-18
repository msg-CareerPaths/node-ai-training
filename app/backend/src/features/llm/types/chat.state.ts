import { Subject } from 'rxjs';
import { MessageEntity } from '../../../core/entities/message.entity';

export interface ChatState {
    groupId: string;
    messageStream: Subject<MessageEntity>;
    infoStream: Subject<MessageEntity>;
}
