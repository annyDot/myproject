import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { TableColumnConfig } from '@component-library/components';
import { EMPTY, exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { ModalService } from '../../../shared/services/modal.service';
import { UserService } from '../../../shared/services/user.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../shared/store-features/withRequestStatus.feature';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { User } from '../models/user.interface';
import { usersTableConfiguration } from '../models/users-table-config';

interface UserState {
  data: User[];
  tableConfiguration: TableColumnConfig[];
}

const initialState: UserState = {
  data: [],
  tableConfiguration: usersTableConfiguration,
};

export const UserStore = signalStore(
  withState<UserState>(initialState),
  withRequestStatus(),
  withMethods(
    (
      store,
      userService = inject(UserService),
      modalService = inject(ModalService)
    ) => ({
      loadData$: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap(() => {
            return userService.getUsers().pipe(
              tapResponse({
                next: (users) => {
                  patchState(store, { data: users }, setFulfilled());
                },
                error: (error: { message: string }) => {
                  patchState(store, setError(error.message));
                },
              })
            );
          })
        )
      ),
      addUser$: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            modalService.open(AddUserComponent, {
              title: 'Add New User',
              buttons: [
                { type: 'save', label: 'Add User' },
                { type: 'cancel', label: 'Cancel' },
              ],
              componentInputs: {},
            })
          ),
          tap((event) => {
            if (event && event.type === 'save') {
              return userService.addUser({ ...event.data, status: 'active' });
            }
            return EMPTY;
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      store.loadData$();
    },
  })
);
