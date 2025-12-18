import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { MerchandiserCard } from '@/components/merchandisers/MerchandiserCard';
import { mockMerchandisers } from '@/data/mockData';

const Merchandisers = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'blocked'>('all');

  const filteredMerchandisers = mockMerchandisers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                          m.telegramId.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Header title="Команда" subtitle={`${mockMerchandisers.length} мерчендайзеров`} />
      
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по имени или Telegram..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tg-input w-full pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Все' },
            { key: 'active', label: 'Активные' },
            { key: 'blocked', label: 'Заблокированные' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredMerchandisers.map((m, index) => (
            <div key={m.id} style={{ animationDelay: `${index * 50}ms` }}>
              <MerchandiserCard merchandiser={m} />
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:brightness-110 active:scale-95 transition-all">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Merchandisers;
