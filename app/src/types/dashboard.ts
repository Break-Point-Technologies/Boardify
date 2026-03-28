export type DashboardDimension = 'list' | 'label' | 'member' | 'due';

export type DashboardChartKind = 'bar' | 'pie' | 'line';

export type DashboardLineTimeframe = 'week' | 'twoWeeks' | 'month';

export type DashboardTile = {
  id: string;
  kind: DashboardChartKind;
  dimension: DashboardDimension;
  lineTimeframe?: DashboardLineTimeframe;
};

export type DashboardSeriesRow = {
  id: string;
  label: string;
  value: number;
  color?: string;
};

export type DashboardLineChartData = {
  xLabels: string[];
  series: Array<{ id: string; label: string; color?: string; values: number[] }>;
};
