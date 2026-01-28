import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

interface Route {
  id: string;
  parentId: string | null;
  name: string;
  path: string;
  icon?: string;
  routes?: Route[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [IconComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  routes = input.required<Route[]>();
  activeRouteId: string | null = null;
  activeRoute: string | null = null;

  activateRoute(route: Route): void {
    this.activeRouteId = route.id;
    this.activeRoute = route.path;
  }

  isActive(route: Route): boolean {
    return this.activeRouteId === route.id;
  }
}
