import { inject } from '@angular/core';
import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User } from 'apps/myproject/src/app/shared/models/user.model';
import { ModalService } from 'apps/myproject/src/app/shared/services/modal.service';
import { StoreIdValue } from 'apps/myproject/src/app/shared/stores/store-ids';
import { pipe, switchMap } from 'rxjs';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserState } from '../user.store';

export function withUserInfo<_>(storeId: StoreIdValue) {
  return signalStoreFeature(
    {
      state: type<UserState>(),
      methods: type<{
        setSelected(selected: User[]): void;
      }>(),
    },
    withMethods((store, modalService = inject(ModalService)) => {
      return {
        info$: rxMethod<User>(
          pipe(
            switchMap((user) =>
              modalService.open(UserFormComponent, {
                title: 'User Info',
                buttons: [{ type: 'ok', label: 'OK' }],
                componentInputs: {
                  mode: 'view',
                  user,
                },
              }),
            ),
          ),
        ),
      };
    }),
  );
}
