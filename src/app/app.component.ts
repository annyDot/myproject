import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
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
