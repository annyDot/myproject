import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NavbarComponent,
  SidebarComponent,
} from '@component-library/components';
import { LoginComponent } from './features/login/login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    OverlayModule,
    PortalModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  mockRoutes = [
    {
      id: '1',
      parentId: null,
      name: 'Home',
      path: '/',
      icon: 'home',
    },
    {
      id: '2',
      parentId: null,
      name: 'Users',
      path: '/users',
      icon: 'group',
    },
  ];
}
