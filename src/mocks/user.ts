import { User } from '../types';

// Mock user data for authentication
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@apay.com',
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    avatar: require('../assets/images/profile1.jpg'),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'jane@apay.com',
    name: 'Jane Smith',
    phone: '+1 (555) 987-6543',
    avatar: require('../assets/images/profile2.jpg'),
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'test@apay.com',
    name: 'Test User',
    phone: '+1 (555) 555-5555',
    avatar: require('../assets/images/profile3.jpg'),
    createdAt: new Date().toISOString(),
  },
];

export const mockCredentials: Record<string, string> = {
  'john@apay.com': 'Password123!',
  'jane@apay.com': 'Password456!',
  'test@apay.com': 'Test123!',
};
