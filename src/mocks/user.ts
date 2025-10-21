import { User } from '../types';

// Mock user data for authentication
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    avatar: 'https://via.placeholder.com/100x100/007AFF/FFFFFF?text=JD',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    phone: '+1 (555) 987-6543',
    avatar: 'https://via.placeholder.com/100x100/5856D6/FFFFFF?text=JS',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'test@apay.com',
    name: 'Test User',
    phone: '+1 (555) 555-5555',
    avatar: 'https://via.placeholder.com/100x100/34C759/FFFFFF?text=TU',
    createdAt: new Date().toISOString(),
  },
];

export const mockCredentials: Record<string, string> = {
  'john.doe@example.com': 'Password123!',
  'jane.smith@example.com': 'Password456!',
  'test@apay.com': 'Test123!',
};
