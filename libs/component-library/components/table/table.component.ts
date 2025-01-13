import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TableColumnConfig, TableData } from './interface/table.interface';
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
