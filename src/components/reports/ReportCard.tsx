import { Clock, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { Report } from '@/types';

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
}

export const ReportCard = ({ report, onClick }: ReportCardProps) => {
  const statusConfig = {
    approved: { label: 'Принят', class: 'status-success' },
    pending: { label: 'На проверке', class: 'status-warning' },
    rejected: { label: 'Отклонён', class: 'bg-destructive/20 text-destructive' },
  };

  const status = statusConfig[report.status];

  return (
    <div 
      className="tg-card-interactive animate-slide-up"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-foreground">{report.storeName}</h3>
          <p className="text-sm text-muted-foreground">{report.merchandiserName}</p>
        </div>
        <span className={`status-badge ${status.class}`}>{status.label}</span>
      </div>
      
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1 aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
          <img 
            src={report.photoBefore} 
            alt="До" 
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-background/80 backdrop-blur-sm rounded text-[10px] font-medium">
            ДО
          </span>
        </div>
        <div className="relative flex-1 aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
          <img 
            src={report.photoAfter} 
            alt="После" 
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-background/80 backdrop-blur-sm rounded text-[10px] font-medium">
            ПОСЛЕ
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {report.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {report.storeAddress}
          </span>
          {report.comment && (
            <span className="flex items-center gap-1 text-primary">
              <MessageSquare size={12} />
              Комментарий
            </span>
          )}
        </div>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </div>
  );
};
