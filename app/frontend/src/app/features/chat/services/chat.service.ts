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

@Injectable()
export class ChatService {
  private readonly wsClientService = inject(WsClientService);
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
          this._infoMessage.set(message);
          return;
        }
        if (message.messageType === MessageType.Message) {
          this.addMessage(message);
        }
      });
  }

  public sendMessage(message: ChatMessagePayloadDto): void {
    this.wsClientService.emit(AppConstants.LLM_NAMESPACE, AppConstants.LLM_CHAT_EVENT, message);
  }

  private addMessage(message: ChatMessageDto): void {
    let existingMessages = this._messages();
    const foundGroupMessage = existingMessages.find((m) => m.groupId === message?.groupId);

    if (foundGroupMessage) {
      existingMessages = [...existingMessages]
        .filter((m) => m.id === foundGroupMessage.id)
        .concat(message);
    } else {
      existingMessages = [...existingMessages, message];
    }

    existingMessages.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    this._messages.set(existingMessages);
  }
}
