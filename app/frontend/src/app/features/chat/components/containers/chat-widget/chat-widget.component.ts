import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../../services/chat.service';
import { MessageSender } from '../../../../../core/types/enums/message-sender.enum';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-chat-widget',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [ChatService],
  templateUrl: './chat-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWidgetComponent implements OnInit {
  private readonly chatService = inject(ChatService);
  private readonly authService = inject(AuthService);
  protected readonly isOpen = signal(false);
  protected readonly messages = this.chatService.messages;
  protected readonly infoMessage = this.chatService.infoMessage;
  protected readonly initialized = this.chatService.initialized;
  protected readonly MessageSender = MessageSender;
  protected readonly messageInput = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  ngOnInit() {
    this.chatService.init();
  }

  toggleChat() {
    this.isOpen.update((open) => !open);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const user = this.authService.getUser();
    if (this.messageInput.invalid || !user) {
      return;
    }
    const message = this.messageInput.getRawValue();
    this.chatService.sendMessage({ content: message, userId: user.id });
  }
}
