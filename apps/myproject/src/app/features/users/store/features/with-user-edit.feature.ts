import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { UserService } from 'apps/myproject/src/app/api-services/user/user.api.service';
import { User } from 'apps/myproject/src/app/shared/models/user.model';
import { ModalService } from 'apps/myproject/src/app/shared/services/modal.service';
import { StoreIdValue } from 'apps/myproject/src/app/shared/stores/store-ids';
import { EMPTY, filter, pipe, switchMap } from 'rxjs';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserState } from '../user.store';

export function withUserEdit<_>(storeId: StoreIdValue) {
  return signalStoreFeature(
    {
      state: type<UserState>(),
      methods: type<{
        setSelected(selected: User[]): void;
      }>(),
    },
    withMethods(
      (
        store,
        modalService = inject(ModalService),
        userService = inject(UserService),
      ) => ({
        edit$: rxMethod<User>(
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
              }),
            ),
            filter((event) => event?.type === 'save'),
            switchMap(({ data }) =>
              userService.update(data).pipe(
                tapResponse({
                  next: (updatedUser) => {
                    patchState(store, {
                      data: store
                        .data()
                        .map((user) =>
                          user.id === updatedUser.id ? updatedUser : user,
                        ),
                    });
                  },
                  error: () => EMPTY,
                }),
              ),
            ),
          ),
        ),
      }),
    ),
  );
}
