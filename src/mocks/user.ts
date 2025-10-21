import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/100x100/007AFF/FFFFFF?text=JD',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/100x100/5856D6/FFFFFF?text=JS',
  },
  {
    id: '3',
    email: 'test@apay.com',
    name: 'Test User',
    avatar: 'https://via.placeholder.com/100x100/34C759/FFFFFF?text=TU',
  },
];

export const mockCredentials = {
  'john.doe@example.com': 'password123',
  'jane.smith@example.com': 'password456',
  'test@apay.com': 'test123',
};
