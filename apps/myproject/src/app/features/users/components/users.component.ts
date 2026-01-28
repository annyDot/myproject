import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ButtonComponent,
  TableColumnAction,
  TableComponent,
  TableData,
} from '@component-library/components';
import { User } from '../../../shared/models/user.model';
import { UserStore } from '../store/user.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [ButtonComponent, TableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserStore],
})
export class UsersComponent {
  store = inject(UserStore);

  addUser(): void {
    this.store.add$();
  }

  onTableAction(event: {
    action: TableColumnAction;
    selectedRow: TableData;
  }): void {
    const { action, selectedRow: user } = event;
    if (action.name === 'edit') {
      this.store.edit$(user as User);
    } else if (action.name === 'view') {
      this.store.info$(user as User);
    }
  }
}
