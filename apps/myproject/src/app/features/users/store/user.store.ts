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
import { pipe, switchMap } from 'rxjs';
import { UserService } from '../../../api-services/user/user.api.service';
import { withSelected } from '../../../shared/features/with-selected.feature';
import { City } from '../../../shared/models/city.model';
import { Country } from '../../../shared/models/country.model';
import { PageState } from '../../../shared/models/page-state.model';
import { User } from '../../../shared/models/user.model';
import { STORE_IDS } from '../../../shared/stores/store-ids';
import { usersTableConfiguration } from '../models/users-table-config';
import { withUserActions } from './features/with-user-actions.feature';

export interface UserState extends PageState<User> {
  lookups: {
    countries: Country[];
    cities: City[];
  };
}

const initialState: UserState = {
  isLoading: false,
  data: [],
  tableConfiguration: usersTableConfiguration,
  lookups: {
    countries: [],
    cities: [],
  },
};

const storeId = STORE_IDS.USERS;

export const UserStore = signalStore(
  withState<UserState>(initialState),
  withSelected(),
  withMethods((store, userService = inject(UserService)) => ({
    loadData$: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true });

          return userService.get().pipe(
            tapResponse({
              next: (users) => {
                patchState(store, { data: users ?? [], isLoading: false });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            }),
          );
        }),
      ),
    ),
  })),
  withUserActions(storeId),
  withHooks({
    onInit(store) {
      store.loadData$();
    },
  }),
);
