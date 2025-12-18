import { Home, Users, MapPin, FileText, Store } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Главная', path: '/' },
  { icon: Users, label: 'Команда', path: '/merchandisers' },
  { icon: MapPin, label: 'Маршруты', path: '/routes' },
  { icon: Store, label: 'Точки', path: '/stores' },
  { icon: FileText, label: 'Отчёты', path: '/reports' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 px-2 pb-safe z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={isActive ? 'tg-nav-item-active' : 'tg-nav-item'}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
