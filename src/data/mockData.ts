import { Merchandiser, Store, Route, Report, DashboardStats } from '@/types';

export const mockMerchandisers: Merchandiser[] = [
  {
    id: '1',
    name: 'Алексей Петров',
    phone: '+7 (999) 123-45-67',
    telegramId: '@alex_merchandiser',
    status: 'active',
    completedToday: 5,
    totalPoints: 127,
  },
  {
    id: '2',
    name: 'Мария Иванова',
    phone: '+7 (999) 234-56-78',
    telegramId: '@maria_merch',
    status: 'active',
    completedToday: 8,
    totalPoints: 245,
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    phone: '+7 (999) 345-67-89',
    telegramId: '@dmitry_s',
    status: 'active',
    completedToday: 3,
    totalPoints: 89,
  },
  {
    id: '4',
    name: 'Елена Козлова',
    phone: '+7 (999) 456-78-90',
    telegramId: '@elena_k',
    status: 'blocked',
    completedToday: 0,
    totalPoints: 56,
  },
];

export const mockStores: Store[] = [
  { id: '1', name: 'Магнит', address: 'ул. Ленина, 15', lat: 55.7558, lng: 37.6173, category: 'Супермаркет' },
  { id: '2', name: 'Пятёрочка', address: 'ул. Пушкина, 23', lat: 55.7599, lng: 37.6180, category: 'Супермаркет' },
  { id: '3', name: 'Лента', address: 'пр. Мира, 45', lat: 55.7612, lng: 37.6295, category: 'Гипермаркет' },
  { id: '4', name: 'Перекрёсток', address: 'ул. Гагарина, 8', lat: 55.7520, lng: 37.6115, category: 'Супермаркет' },
  { id: '5', name: 'ВкусВилл', address: 'ул. Советская, 32', lat: 55.7545, lng: 37.6250, category: 'Продукты' },
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    date: '2024-01-15',
    merchandiserId: '1',
    merchandiserName: 'Алексей Петров',
    status: 'in_progress',
    points: [
      { id: '1', store: mockStores[0], order: 1, status: 'completed', visitTime: '09:15' },
      { id: '2', store: mockStores[1], order: 2, status: 'completed', visitTime: '10:30' },
      { id: '3', store: mockStores[2], order: 3, status: 'in_progress' },
      { id: '4', store: mockStores[3], order: 4, status: 'pending' },
    ],
  },
  {
    id: '2',
    date: '2024-01-15',
    merchandiserId: '2',
    merchandiserName: 'Мария Иванова',
    status: 'completed',
    points: [
      { id: '5', store: mockStores[1], order: 1, status: 'completed', visitTime: '08:45' },
      { id: '6', store: mockStores[4], order: 2, status: 'completed', visitTime: '09:50' },
      { id: '7', store: mockStores[2], order: 3, status: 'completed', visitTime: '11:15' },
    ],
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    merchandiserId: '1',
    merchandiserName: 'Алексей Петров',
    storeId: '1',
    storeName: 'Магнит',
    storeAddress: 'ул. Ленина, 15',
    date: '2024-01-15',
    time: '09:15',
    photoBefore: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop',
    photoAfter: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
    lat: 55.7558,
    lng: 37.6173,
    status: 'approved',
  },
  {
    id: '2',
    merchandiserId: '2',
    merchandiserName: 'Мария Иванова',
    storeId: '2',
    storeName: 'Пятёрочка',
    storeAddress: 'ул. Пушкина, 23',
    date: '2024-01-15',
    time: '08:45',
    photoBefore: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    photoAfter: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
    lat: 55.7599,
    lng: 37.6180,
    status: 'pending',
  },
  {
    id: '3',
    merchandiserId: '1',
    merchandiserName: 'Алексей Петров',
    storeId: '3',
    storeName: 'Лента',
    storeAddress: 'пр. Мира, 45',
    date: '2024-01-15',
    time: '10:30',
    photoBefore: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop',
    photoAfter: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
    lat: 55.7612,
    lng: 37.6295,
    status: 'approved',
    comment: 'Нет места для нового товара',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalMerchandisers: 12,
  activeToday: 8,
  completedVisits: 47,
  pendingVisits: 15,
  completionRate: 76,
};
