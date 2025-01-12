import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableColumnConfig, TableData } from '../../shared/models/table.model';
import { IconComponent } from '../icon/icon.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  configuration = input<TableColumnConfig[]>([]);
  data = input<TableData[]>([]);
}
