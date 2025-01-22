import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ButtonComponent,
  TableColumnAction,
  TableComponent,
  TableData,
} from '@component-library/components';
import { User } from '../../models/user.interface';
import { UserStore } from '../../users.store';

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

  onTableAction(event: {
    action: TableColumnAction;
    selectedRow: TableData;
  }): void {
    const { action, selectedRow: user } = event;
    if (action.name === 'edit') {
      this.store.editUser$(user as User);
    } else if (action.name === 'view') {
      this.store.viewUser$(user as User);
    }
  }
}
