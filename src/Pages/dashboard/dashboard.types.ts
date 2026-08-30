import type { ReactNode } from "react";

export interface MetricCard {
  id: string;
  label: string;
  value: number;
  currency?: string;
  change: number;
  period: string;
}

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
}

export interface DashboardConfig<TData, TChart> {
  brandName: string;
  currency: string;
  metrics: MetricCard[];
  tableData: TData[];
  chartData: TChart[];
}