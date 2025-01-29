import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import {
  TableColumnAction,
  TableColumnConfig,
  TableConfiguration,
  TableData,
} from './interface/table.interface';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  configuration = input.required<TableConfiguration>();
  data = input<TableData[]>([]);
  actionClicked = output<{
    action: TableColumnAction;
    selectedRow: TableData;
  }>();

  selectedRow: TableData | null = null;

  onRowClick(selectedRow: TableData): void {
    this.selectedRow = selectedRow;
  }

  onActionClick(action: TableColumnAction, row: TableData): void {
    this.actionClicked.emit({ action, selectedRow: row });
  }

  getColumnKeys(): string[] {
    return this.configuration()?.columns
      ? Object.keys(this.configuration().columns)
      : [];
  }

  getBooleanIcon(column: TableColumnConfig, value: string | boolean): string {
    if (!column.useBooleanIcons) return '';

    if (value === column.useBooleanIcons.trueValue || value === true) {
      return 'check';
    }
    if (value === column.useBooleanIcons.falseValue || value === false) {
      return 'close';
    }

    return '';
  }
}
