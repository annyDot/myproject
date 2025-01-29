import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  imports: [CommonModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  icon = input('');
  class = input('icon-primary');
  size = input('24px');
  color = input();
  tooltip = input('');
}
