import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {}
