import { Users, MapPin, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { RouteCard } from '@/components/routes/RouteCard';
import { mockDashboardStats, mockRoutes } from '@/data/mockData';

const Dashboard = () => {
  const stats = mockDashboardStats;
  const activeRoutes = mockRoutes.filter(r => r.status === 'in_progress');

  return (
    <div>
      <Header title="Админ-панель" subtitle="Мерчендайзинг" />
      
      <div className="px-4 py-4 space-y-6">
        {/* Progress Overview */}
        <div className="tg-card flex items-center gap-6 animate-slide-up">
          <ProgressRing progress={stats.completionRate} />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Сегодня
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              {stats.completedVisits} из {stats.completedVisits + stats.pendingVisits} визитов
            </p>
            <div className="flex items-center gap-2 text-sm text-success">
              <TrendingUp size={16} />
              <span>+12% к вчерашнему дню</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard 
            icon={Users} 
            label="Мерчендайзеров" 
            value={stats.totalMerchandisers}
            change={`${stats.activeToday} онлайн`}
            trend="up"
          />
          <StatCard 
            icon={CheckCircle} 
            label="Выполнено" 
            value={stats.completedVisits}
            change="+8"
            trend="up"
          />
          <StatCard 
            icon={Clock} 
            label="В ожидании" 
            value={stats.pendingVisits}
          />
          <StatCard 
            icon={MapPin} 
            label="Точек всего" 
            value={62}
          />
        </div>

        {/* Active Routes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">
              Активные маршруты
            </h2>
            <button className="text-sm text-primary font-medium">
              Все
            </button>
          </div>
          <div className="space-y-3">
            {activeRoutes.map((route, index) => (
              <div key={route.id} style={{ animationDelay: `${index * 100}ms` }}>
                <RouteCard route={route} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
