import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-root-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './root-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootLayoutComponent {}
