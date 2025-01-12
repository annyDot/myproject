export interface TableColumnConfig {
  id: number;
  name: string;
  icon?: string;
  showProperty: string;
}

export interface TableData {
  [key: string]: any;
}
