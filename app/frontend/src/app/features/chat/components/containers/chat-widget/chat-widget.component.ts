import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat-widget',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './chat-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWidgetComponent {
  readonly isOpen = signal(false);

  toggleChat() {
    this.isOpen.update((open) => !open);
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}
