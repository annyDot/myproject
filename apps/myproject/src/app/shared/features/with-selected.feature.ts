import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export function withSelected<T>() {
  return signalStoreFeature(
    withState({ selected: [] as T[] }),
    withMethods((store) => ({
      setSelected: (selected: T[]) => {
        patchState(store, { selected });
      },
    })),
  );
}
