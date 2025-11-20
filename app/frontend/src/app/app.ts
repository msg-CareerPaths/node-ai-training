import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWidgetComponent } from './features/chat/components/containers/chat-widget/chat-widget.component';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatWidgetComponent],
  template: `
    <router-outlet />
    @if (isAuthenticated()) {
      <app-chat-widget />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly authService = inject(AuthService);
  protected isAuthenticated = this.authService.isAuthenticated;
}
