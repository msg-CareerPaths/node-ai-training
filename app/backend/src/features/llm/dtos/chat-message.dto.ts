import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '../../../core/enums/message-type.enum';
import { MessageSender } from '../../../core/enums/message-sender.enum';

export class ChatMessageDto {
    @ApiProperty({
        description: 'Unique identifier of the message',
        example: '5a4a6a3b-0dce-4a59-9d79-3b9a6d5c1234'
    })
    id: string;

    @ApiProperty({
        description: 'Identifier of the user that owns the message',
        example: '7c8c2a33-0b4e-4a1f-b9e5-0acb01e6e321'
    })
    userId: string;

    @ApiProperty({
        description: 'Conversation or session group identifier',
        example: 'a2d9f4c1-0e4b-4b3c-8f0e-01b2c3d4e5f6',
        nullable: true
    })
    groupId: string | null;

    @ApiProperty({
        description: 'ISO-8601 timestamp of when the message was created',
        example: '2025-11-18T10:15:30.000Z'
    })
    timestamp: string;

    @ApiProperty({
        description: 'Who sent the message',
        enum: MessageSender,
        example: MessageSender.Client
    })
    sender: MessageSender;

    @ApiProperty({
        description: 'Message content as plain text',
        example: 'Hello, how can I use this API?'
    })
    content: string;

    @ApiProperty({
        description:
            'Whether the response for this message is fully generated and the exchange is complete',
        example: false
    })
    complete: boolean;

    @ApiProperty({
        description: 'Type of the message content',
        enum: MessageType,
        example: MessageType.Message
    })
    messageType: MessageType;
}

export class ChatMessagePayload {
    @ApiProperty({
        description: 'Identifier of the user sending the message',
        example: '7c8c2a33-0b4e-4a1f-b9e5-0acb01e6e321'
    })
    userId: string;

    @ApiProperty({
        description: 'Message content from the client to the assistant',
        example: 'Hi there, can you help me with my order?'
    })
    content: string;
}
