import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/input.component';
import {
  TableColumnAction,
  TableColumnConfig,
  TableConfiguration,
  TableData,
} from './interface/table.interface';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [CommonModule, IconComponent, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  configuration = input.required<TableConfiguration>();
  data = input<TableData[]>([]);
  globalFiltering = input<boolean>(false);

  actionClicked = output<{
    action: TableColumnAction;
    selectedRow: TableData;
  }>();

  selectedRow: TableData | null = null;
  searchQuery = signal<string>('');

  filteredData = computed<TableData[]>(() => {
    const query = this.searchQuery();
    if (!query) return this.data();

    return this.data().filter((item) =>
      this.getColumnKeys().some((key) =>
        String(item[this.configuration().columns[key].displayValue] || '')
          .toLowerCase()
          .includes(query)
      )
    );
  });

  onRowClick(selectedRow: TableData): void {
    this.selectedRow = selectedRow;
  }

  onActionClick(action: TableColumnAction, row: TableData): void {
    this.actionClicked.emit({ action, selectedRow: row });
  }

  filterData(query: string): void {
    this.searchQuery.set(query.toLowerCase());
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
