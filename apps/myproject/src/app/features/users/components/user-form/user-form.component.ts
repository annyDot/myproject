import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  Modal,
  ModalButton,
  ModalEvent,
} from '@component-library/components';
import { UserForm, UserFormMode } from '../../models/user-form';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    FormsModule,
    CheckboxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements Modal, OnInit {
  @Input() buttons: ModalButton[] = [];
  @Input() mode: UserFormMode = UserFormMode.INFO;
  @Input() user!: User;
  modalOutput = output<ModalEvent['data']>();

  private fb = inject(FormBuilder);
  form: FormGroup<UserForm>;

  constructor() {
    this.form = this.fb.group({
      id: this.fb.control<string | null>({ value: null, disabled: true }),
      status: this.fb.control<string>('inactive'),
      name: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      surname: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      username: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      country: this.fb.control<string | null>(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.mode === UserFormMode.INFO) {
      this.form.patchValue(this.user);
      this.form.disable();
    }
    if (this.mode === UserFormMode.EDIT && this.user) {
      this.form.patchValue(this.user);
    } else {
      // strictly typed forms don't allow for removing
      (this.form as FormGroup).removeControl('id');
    }
  }

  onBtnClick(type: ModalEvent['type']) {
    if (this.form.valid && type === 'save') {
      this.modalOutput.emit({
        type,
        data:
          this.mode === UserFormMode.EDIT
            ? this.form.getRawValue()
            : this.form.value,
      });
    } else {
      this.modalOutput.emit({ type });
    }
  }
}
