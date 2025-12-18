import { Plus, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { RouteCard } from '@/components/routes/RouteCard';
import { mockRoutes } from '@/data/mockData';

const Routes = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const filteredRoutes = mockRoutes.filter(r => 
    filter === 'all' || r.status === filter
  );

  return (
    <div>
      <Header title="Маршруты" subtitle="Управление маршрутами" />
      
      <div className="px-4 py-4 space-y-4">
        {/* Date Selector */}
        <div className="tg-card flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Calendar size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Дата</p>
            <p className="font-medium text-foreground">15 января 2024</p>
          </div>
          <button className="tg-button-secondary text-sm py-2">
            Изменить
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {[
            { key: 'all', label: 'Все' },
            { key: 'in_progress', label: 'В процессе' },
            { key: 'pending', label: 'Ожидают' },
            { key: 'completed', label: 'Завершены' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Routes List */}
        <div className="space-y-3">
          {filteredRoutes.map((route, index) => (
            <div key={route.id} style={{ animationDelay: `${index * 50}ms` }}>
              <RouteCard route={route} />
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Нет маршрутов</p>
          </div>
        )}

        {/* Add Button */}
        <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:brightness-110 active:scale-95 transition-all">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Routes;
