import { FormControl } from '@angular/forms';

export enum UserFormMode {
  VIEW = 'view',
  ADD = 'add',
  EDIT = 'edit',
}
export interface UserForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  country: FormControl<string | null>;
  status: FormControl<string | null>;
}
