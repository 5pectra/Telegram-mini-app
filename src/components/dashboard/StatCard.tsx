import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  iconColor?: string;
}

export const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  trend = 'neutral',
  iconColor = 'text-primary'
}: StatCardProps) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-lg bg-primary/10 ${iconColor}`}>
          <Icon size={18} />
        </div>
        {change && (
          <span className={`text-xs font-medium ${trendColors[trend]}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
};
