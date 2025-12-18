export interface Merchandiser {
  id: string;
  name: string;
  phone: string;
  telegramId: string;
  avatar?: string;
  status: 'active' | 'blocked';
  completedToday: number;
  totalPoints: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
}

export interface RoutePoint {
  id: string;
  store: Store;
  order: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  visitTime?: string;
  photoBefore?: string;
  photoAfter?: string;
  comment?: string;
}

export interface Route {
  id: string;
  date: string;
  merchandiserId: string;
  merchandiserName: string;
  points: RoutePoint[];
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Report {
  id: string;
  merchandiserId: string;
  merchandiserName: string;
  storeId: string;
  storeName: string;
  storeAddress: string;
  date: string;
  time: string;
  photoBefore: string;
  photoAfter: string;
  lat: number;
  lng: number;
  status: 'approved' | 'pending' | 'rejected';
  comment?: string;
}

export interface DashboardStats {
  totalMerchandisers: number;
  activeToday: number;
  completedVisits: number;
  pendingVisits: number;
  completionRate: number;
}
