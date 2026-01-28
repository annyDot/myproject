import { TableConfiguration } from '@component-library/components';

export interface PageState<T> {
  data: T[];
  tableConfiguration: TableConfiguration;
  isLoading: boolean;
}
