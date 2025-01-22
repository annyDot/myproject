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
  InputComponent,
  Modal,
  ModalButton,
  ModalEvent,
} from '@component-library/components';
import { UserForm } from '../../models/user-form';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserComponent implements Modal, OnInit {
  @Input() buttons: ModalButton[] = [];
  @Input() isEditMode = false;
  @Input() user!: User;
  modalOutput = output<ModalEvent['data']>();

  form: FormGroup<UserForm>;
  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
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
    if (this.user) {
      this.form.patchValue(this.user);
    }

    if (!this.isEditMode) {
      this.form.disable();
    }
  }

  onBtnClick(type: ModalEvent['type']) {
    if (this.form.valid && type === 'save') {
      this.modalOutput.emit({ type, data: this.form.value });
    } else {
      this.modalOutput.emit({ type });
    }
  }
}
