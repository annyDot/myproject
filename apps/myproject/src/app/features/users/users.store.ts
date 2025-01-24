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

import { TableConfiguration } from '@component-library/components';
import { EMPTY, exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../shared/store-features/withRequestStatus.feature';
import { UserFormComponent } from './components/user-form/user-form.component';
import { User } from './models/user.interface';
import { usersTableConfiguration } from './models/users-table-config';
import { UserService } from './user.service';

interface UserState {
  data: User[];
  tableConfiguration: TableConfiguration;
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
                  patchState(store, { data: users ?? [] }, setFulfilled());
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
          switchMap(() =>
            modalService.open(UserFormComponent, {
              title: 'Add New User',
              buttons: [
                { type: 'save', label: 'Add User' },
                { type: 'cancel', label: 'Cancel' },
              ],
              componentInputs: {
                mode: 'add',
              },
            })
          ),
          switchMap((event) => {
            if (event && event.type === 'save') {
              return userService.addUser(event.data).pipe(
                tapResponse({
                  next: (newUser) => {
                    patchState(
                      store,
                      { data: [...(store.data() ?? []), newUser] },
                      setFulfilled()
                    );
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  },
                })
              );
            }
            patchState(store, setFulfilled());
            return EMPTY;
          })
        )
      ),
      editUser$: rxMethod<User>(
        pipe(
          switchMap((user) =>
            modalService.open(UserFormComponent, {
              title: 'Edit User',
              buttons: [
                { type: 'save', label: 'Save Changes' },
                { type: 'cancel', label: 'Cancel' },
              ],
              componentInputs: {
                mode: 'edit',
                user,
              },
            })
          ),
          switchMap((event) => {
            if (event && event.type === 'save') {
              return userService.updateUser(event.data).pipe(
                tapResponse({
                  next: (updatedUser) => {
                    patchState(
                      store,
                      {
                        data: store
                          .data()
                          .map((user) =>
                            user.id === updatedUser.id ? updatedUser : user
                          ),
                      },
                      setFulfilled()
                    );
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  },
                })
              );
            }
            patchState(store, setFulfilled());
            return EMPTY;
          })
        )
      ),
      viewUser$: rxMethod<User>(
        pipe(
          switchMap((user) =>
            modalService.open(UserFormComponent, {
              title: 'View User',
              buttons: [{ type: 'ok', label: 'OK' }],
              componentInputs: {
                mode: 'view',
                user,
              },
            })
          )
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
