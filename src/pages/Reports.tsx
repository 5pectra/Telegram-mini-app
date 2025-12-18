import { Download, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ReportCard } from '@/components/reports/ReportCard';
import { mockReports } from '@/data/mockData';

const Reports = () => {
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  const filteredReports = mockReports.filter(r => 
    filter === 'all' || r.status === filter
  );

  const stats = {
    total: mockReports.length,
    approved: mockReports.filter(r => r.status === 'approved').length,
    pending: mockReports.filter(r => r.status === 'pending').length,
  };

  return (
    <div>
      <Header title="Отчёты" subtitle="Фотоотчёты мерчендайзеров" />
      
      <div className="px-4 py-4 space-y-4">
        {/* Summary Card */}
        <div className="tg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Calendar size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">За сегодня</p>
                <p className="font-semibold text-foreground">{stats.total} отчётов</p>
              </div>
            </div>
            <button className="tg-button-secondary flex items-center gap-2 text-sm py-2">
              <Download size={16} />
              Экспорт
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 text-center p-3 rounded-xl bg-success/10">
              <p className="text-2xl font-bold text-success">{stats.approved}</p>
              <p className="text-xs text-muted-foreground">Принято</p>
            </div>
            <div className="flex-1 text-center p-3 rounded-xl bg-warning/10">
              <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">На проверке</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {[
            { key: 'all', label: 'Все' },
            { key: 'pending', label: 'На проверке' },
            { key: 'approved', label: 'Принятые' },
            { key: 'rejected', label: 'Отклонённые' },
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

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <div key={report.id} style={{ animationDelay: `${index * 50}ms` }}>
              <ReportCard report={report} />
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Нет отчётов</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
