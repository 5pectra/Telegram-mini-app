import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { Route } from '@/types';

interface RouteCardProps {
  route: Route;
  onClick?: () => void;
}

export const RouteCard = ({ route, onClick }: RouteCardProps) => {
  const completedCount = route.points.filter(p => p.status === 'completed').length;
  const progress = Math.round((completedCount / route.points.length) * 100);
  
  const statusConfig = {
    pending: { label: 'Ожидает', class: 'status-pending' },
    in_progress: { label: 'В процессе', class: 'status-warning' },
    completed: { label: 'Завершён', class: 'status-success' },
  };

  const status = statusConfig[route.status];

  return (
    <div 
      className="tg-card-interactive animate-slide-up"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-medium text-foreground">{route.merchandiserName}</h3>
          <p className="text-sm text-muted-foreground">{route.date}</p>
        </div>
        <span className={status.class}>{status.label}</span>
      </div>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} className="text-primary" />
          <span>{route.points.length} точек</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock size={14} />
          <span>{completedCount} выполнено</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">{progress}%</span>
        <ChevronRight size={18} className="text-muted-foreground" />
      </div>
    </div>
  );
};
