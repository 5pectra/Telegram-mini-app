import { MapPin, Navigation } from 'lucide-react';
import { Store } from '@/types';

interface StoreCardProps {
  store: Store;
  onClick?: () => void;
}

export const StoreCard = ({ store, onClick }: StoreCardProps) => {
  return (
    <div 
      className="tg-card-interactive flex items-center gap-3 animate-slide-up"
      onClick={onClick}
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-success/30 to-success/10 flex items-center justify-center flex-shrink-0">
        <MapPin size={20} className="text-success" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate">{store.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{store.address}</p>
        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-secondary text-muted-foreground">
          {store.category}
        </span>
      </div>
      
      <button className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
        <Navigation size={18} className="text-primary" />
      </button>
    </div>
  );
};
