import { Transaction } from '../types';
import { mockWalletBalances, mockCoinPrices } from './wallet';

// Re-export wallet data for backward compatibility
export { mockWalletBalances, mockCoinPrices };

// Transaction mock data
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    amount: 0.5,
    currency: 'BTC',
    description: 'Received from John',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
  },
  {
    id: '2',
    type: 'send',
    amount: 0.1,
    currency: 'BTC',
    description: 'Sent to Alice',
    timestamp: '2024-01-14T15:45:00Z',
    status: 'completed',
  },
  {
    id: '3',
    type: 'swap',
    amount: 2.5,
    currency: 'ETH',
    description: 'Swapped BTC to ETH',
    timestamp: '2024-01-13T09:20:00Z',
    status: 'completed',
  },
  {
    id: '4',
    type: 'receive',
    amount: 1000,
    currency: 'USDT',
    description: 'Received from Bob',
    timestamp: '2024-01-12T14:15:00Z',
    status: 'completed',
  },
  {
    id: '5',
    type: 'send',
    amount: 500,
    currency: 'USDT',
    description: 'Payment for services',
    timestamp: '2024-01-11T11:30:00Z',
    status: 'pending',
  },
  {
    id: '6',
    type: 'receive',
    amount: 12.5,
    currency: 'BNB',
    description: 'Staking rewards',
    timestamp: '2024-01-10T08:20:00Z',
    status: 'completed',
  },
  {
    id: '7',
    type: 'swap',
    amount: 1000,
    currency: 'ADA',
    description: 'Swapped USDT to ADA',
    timestamp: '2024-01-09T16:45:00Z',
    status: 'completed',
  },
  {
    id: '8',
    type: 'send',
    amount: 5.0,
    currency: 'SOL',
    description: 'Sent to DeFi protocol',
    timestamp: '2024-01-08T12:30:00Z',
    status: 'completed',
  },
  {
    id: '9',
    type: 'receive',
    amount: 150,
    currency: 'DOT',
    description: 'Parachain rewards',
    timestamp: '2024-01-07T14:15:00Z',
    status: 'completed',
  },
  {
    id: '10',
    type: 'send',
    amount: 200,
    currency: 'MATIC',
    description: 'Gas fee payment',
    timestamp: '2024-01-06T09:10:00Z',
    status: 'failed',
  },
];
