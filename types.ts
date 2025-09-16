
export interface Campaign {
  id: number;
  name: string;
  // FIX: Updated status types to match the French values used in the mock data and components.
  status: 'Actif' | 'En pause' | 'Terminée';
  budget: number;
  spent: number;
  roi: number;
}

export interface Metric {
    icon: JSX.Element;
    title: string;
    value: number;
    change: number;
    changeType: 'increase' | 'decrease';
}

export interface EngagementData {
    name: string;
    uv: number;
    pv: number;
}

export interface ConversionData {
    name: string;
    value: number;
}

export interface ChartData {
    engagement: EngagementData[];
    conversion: ConversionData[];
}

export interface MarketingData {
    metrics: Omit<Metric, 'icon'>[];
    campaigns: Campaign[];
    chartData: ChartData;
}