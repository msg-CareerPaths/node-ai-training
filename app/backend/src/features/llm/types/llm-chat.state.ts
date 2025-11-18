import { Subject } from 'rxjs';
import { MessageEntity } from '../../../core/entities/message.entity';

export interface LlmChatState {
    groupId: string;
    messageStream: Subject<MessageEntity>;
    infoStream: Subject<MessageEntity>;
}
