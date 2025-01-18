import { FormControl } from '@angular/forms';

export interface AddUserForm {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  country: FormControl<string | null>;
}
