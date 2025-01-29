export interface TableConfiguration {
  actions: TableColumnAction[];
  columns: Record<string, TableColumnConfig>;
}

export interface TableColumnConfig {
  id: number;
  name: string;
  displayValue: string;
  useBooleanIcons?: {
    trueValue: string | boolean;
    falseValue: string | boolean;
  };
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
