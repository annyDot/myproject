import { FormControl } from '@angular/forms';

export interface UserForm {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  country: FormControl<string | null>;
}
