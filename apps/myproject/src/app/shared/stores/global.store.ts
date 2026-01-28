import { signalStore, withMethods } from '@ngrx/signals';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  // withAuthUser(),
  withMethods((store) => ({})),
);
