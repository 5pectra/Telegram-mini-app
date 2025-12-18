import { User, MapPin, MoreVertical } from 'lucide-react';
import { Merchandiser } from '@/types';

interface MerchandiserCardProps {
  merchandiser: Merchandiser;
  onClick?: () => void;
}

export const MerchandiserCard = ({ merchandiser, onClick }: MerchandiserCardProps) => {
  return (
    <div 
      className="tg-card-interactive flex items-center gap-3 animate-slide-up"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
        <User size={24} className="text-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-foreground truncate">{merchandiser.name}</h3>
          <span className={merchandiser.status === 'active' ? 'status-success' : 'status-pending'}>
            {merchandiser.status === 'active' ? 'Активен' : 'Заблокирован'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{merchandiser.telegramId}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={12} />
            {merchandiser.completedToday} сегодня
          </span>
          <span className="text-xs text-primary font-medium">
            {merchandiser.totalPoints} баллов
          </span>
        </div>
      </div>
      
      <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
        <MoreVertical size={18} className="text-muted-foreground" />
      </button>
    </div>
  );
};
