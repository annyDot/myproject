import { signalStoreFeature, type } from '@ngrx/signals';
import { User } from 'apps/myproject/src/app/shared/models/user.model';
import { StoreIdValue } from 'apps/myproject/src/app/shared/stores/store-ids';
import { UserState } from '../user.store';
import { withUserAdd } from './with-user-add.feature';
import { withUserEdit } from './with-user-edit.feature';
import { withUserInfo } from './with-user-info.feature';

export function withUserActions<_>(storeId: StoreIdValue) {
  return signalStoreFeature(
    {
      state: type<UserState>(),
      methods: type<{
        setSelected(selected: User[]): void;
      }>(),
    },
    withUserAdd(storeId),
    withUserEdit(storeId),
    withUserInfo(storeId),
  );
}
