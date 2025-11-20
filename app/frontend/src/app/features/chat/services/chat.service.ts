import { DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import {
  ChatMessageDto,
  ChatMessagePayloadDto,
} from '../../../core/types/dtos/ws/chat-message-ws.dto';
import { WsClientService } from '../../../core/services/ws-client.service';
import { AppConstants } from '../../../core/types/constants/app.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageType } from '../../../core/types/enums/message-type.enum';
import { filter, take } from 'rxjs';
import { setOneByKey, upsertByKey } from '../../../core/utils/array.utils';
import { mapChatPayloadToDto } from '../utils/chat-mappers.utils';
import { EnvironmentConfig } from '../../../core/types/providers/environment-config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {
  private readonly wsClientService = inject(WsClientService);
  private readonly environmentConfig = inject(EnvironmentConfig);
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _messages = signal<ChatMessageDto[]>([]);
  private readonly _infoMessage = signal<ChatMessageDto | null>(null);
  private readonly _initialized = signal<boolean>(false);

  public get messages(): Signal<ChatMessageDto[]> {
    return this._messages.asReadonly();
  }

  public get infoMessage(): Signal<ChatMessageDto | null> {
    return this._infoMessage.asReadonly();
  }

  public get initialized(): Signal<boolean> {
    return this._initialized.asReadonly();
  }

  public init(): void {
    this._initialized.set(false);
    this.wsClientService
      .initializeConnection(AppConstants.LLM_NAMESPACE)
      .pipe(take(1))
      .subscribe(() => this._initialized.set(true));

    this.wsClientService
      .listen<ChatMessageDto>(AppConstants.LLM_NAMESPACE, AppConstants.LLM_CHAT_EVENT)
      .pipe(
        filter(() => this._initialized()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((message: ChatMessageDto) => {
        if (message.messageType === MessageType.Info) {
          this.addInfoMessage(message);
          return;
        }
        if (message.messageType === MessageType.Message) {
          this.addMessage(message);
          return;
        }
      });
  }

  public sendMessage(message: ChatMessagePayloadDto): void {
    this.updateMessages([...this._messages(), mapChatPayloadToDto(message)]);
    this.wsClientService.emit(AppConstants.LLM_NAMESPACE, AppConstants.LLM_CHAT_EVENT, message);
  }

  public getMessages(): void {
    this.httpClient
      .get<ChatMessageDto[]>(`${this.environmentConfig.apiUrl}/chat/messages`)
      .pipe(take(1))
      .subscribe((messages) => {
        this.updateMessages(messages);
      });
  }

  public clearMessages(): void {
    this.httpClient
      .post<void>(`${this.environmentConfig.apiUrl}/chat/clear`, {})
      .pipe(take(1))
      .subscribe(() => {
        this.updateMessages([]);
      });
  }

  private addMessage(message: ChatMessageDto): void {
    let existingMessages = this._messages();
    const foundGroupMessage = existingMessages.find((m) => m.groupId === message?.groupId);

    if (foundGroupMessage) {
      existingMessages = setOneByKey<ChatMessageDto, 'groupId'>(
        [...existingMessages],
        message,
        'groupId',
      );
    } else {
      existingMessages = upsertByKey<ChatMessageDto, 'id'>([...existingMessages], message, 'id');
    }

    this.updateMessages(existingMessages);
    if (message.complete) {
      this._infoMessage.set(null);
    }
  }

  private addInfoMessage(message: ChatMessageDto, clearDelay = 2000): void {
    this._infoMessage.set(message);
    setTimeout(() => {
      this._infoMessage.set(null);
    }, clearDelay);
  }

  private updateMessages(newMessages: ChatMessageDto[]): void {
    newMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    this._messages.set(newMessages);
  }
}
