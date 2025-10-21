import { Transaction, WalletBalance, CoinPrice } from '../types';

// Simple mock data
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
];

export const mockWalletBalances: WalletBalance = {
  BTC: 1.25,
  ETH: 5.8,
  USDT: 2500,
};

export const mockCoinPrices: CoinPrice = {
  BTC: 45000,
  ETH: 3200,
  USDT: 1,
};
