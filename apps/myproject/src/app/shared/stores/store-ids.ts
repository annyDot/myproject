export const STORE_IDS = {
  USERS: '[Users]',
};

export type StoreId = keyof typeof STORE_IDS;
export type StoreIdValue = (typeof STORE_IDS)[StoreId];
