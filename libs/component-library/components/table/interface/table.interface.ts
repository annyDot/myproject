export interface TableConfiguration {
  actions: TableColumnAction[];
  columns: Record<string, TableColumnConfig>;
}

export interface TableColumnConfig {
  id: number;
  name: string;
  showProperty: string;
  icon?: string;
  actions?: TableColumnAction[];
}

export interface TableColumnAction {
  name: string;
  icon: string;
  label: string;
  tooltip?: boolean;
}

export interface TableData {
  [key: string]: any;
}
