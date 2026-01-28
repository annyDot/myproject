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
import { EMPTY, pipe, switchMap } from 'rxjs';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserState } from '../user.store';

export function withUserAdd<_>(storeId: StoreIdValue) {
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
      ) => {
        return {
          add$: rxMethod<void>(
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
                }),
              ),
              switchMap((event) => {
                if (event?.type === 'save') {
                  return userService.create(event.data).pipe(
                    tapResponse({
                      next: (newUser) => {
                        patchState(store, {
                          data: [...(store.data() ?? []), newUser],
                        });
                      },
                      error: () => EMPTY,
                    }),
                  );
                }

                return EMPTY;
              }),
            ),
          ),
        };
      },
    ),
  );
}
