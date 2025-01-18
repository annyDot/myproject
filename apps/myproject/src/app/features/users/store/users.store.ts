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
import { EMPTY, exhaustMap, pipe, tap } from 'rxjs';
import { ModalService } from '../../../shared/services/modal.service';
import { UserService } from '../../../shared/services/user.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../shared/store-features/withRequestStatus.feature';
import { AddUserComponent } from '../add-user/add-user.component';
import { User } from '../models/user.interface';

interface UserState {
  data: User[];
}

const initialState: UserState = {
  data: [],
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
          exhaustMap(() => {
            // todo
            modalService.open(AddUserComponent);
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
