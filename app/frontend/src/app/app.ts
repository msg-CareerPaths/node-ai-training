import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWidgetComponent } from './features/chat/components/containers/chat-widget/chat-widget.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatWidgetComponent],
  template: `
    <router-outlet />
    <app-chat-widget />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('frontend');
}
