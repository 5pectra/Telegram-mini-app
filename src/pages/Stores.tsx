import { Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StoreCard } from '@/components/stores/StoreCard';
import { mockStores } from '@/data/mockData';

const Stores = () => {
  const [search, setSearch] = useState('');

  const filteredStores = mockStores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header title="Торговые точки" subtitle={`${mockStores.length} точек в базе`} />
      
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск магазина..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tg-input w-full pl-10"
            />
          </div>
          <button className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
            <Filter size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {['Все', 'Супермаркет', 'Гипермаркет', 'Продукты'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                cat === 'Все'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stores List */}
        <div className="space-y-3">
          {filteredStores.map((store, index) => (
            <div key={store.id} style={{ animationDelay: `${index * 50}ms` }}>
              <StoreCard store={store} />
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

export default Stores;
