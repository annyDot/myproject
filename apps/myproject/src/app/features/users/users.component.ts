import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, TableComponent } from '@component-library/components';
import { UserStore } from './store/users.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [CommonModule, ButtonComponent, TableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserStore],
})
export class UsersComponent {
  store = inject(UserStore);

  addUser(): void {
    this.store.addUser$();
  }
}
