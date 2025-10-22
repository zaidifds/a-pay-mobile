import { WalletBalance, CoinPrice } from '../types';

// Mock wallet balances for different cryptocurrencies
export const mockWalletBalances: WalletBalance = {
  BTC: 1.25,
  ETH: 5.8,
  USDT: 2500,
  BNB: 12.5,
  ADA: 1000,
  SOL: 25.3,
  DOT: 150,
  MATIC: 500,
};

// Mock coin prices in USD
export const mockCoinPrices: CoinPrice = {
  BTC: 45000,
  ETH: 3200,
  USDT: 1,
  BNB: 350,
  ADA: 0.45,
  SOL: 95,
  DOT: 8.5,
  MATIC: 0.85,
};

// Mock portfolio data
export const mockPortfolioData = {
  totalValue: 125000,
  totalValueChange: 2500,
  totalValueChangePercent: 2.04,
  assets: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 1.25,
      price: 45000,
      value: 56250,
      change24h: 2.5,
      change24hPercent: 0.056,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 5.8,
      price: 3200,
      value: 18560,
      change24h: -120,
      change24hPercent: -0.036,
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      balance: 2500,
      price: 1,
      value: 2500,
      change24h: 0,
      change24hPercent: 0,
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      balance: 12.5,
      price: 350,
      value: 4375,
      change24h: 15,
      change24hPercent: 0.043,
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      balance: 1000,
      price: 0.45,
      value: 450,
      change24h: 0.02,
      change24hPercent: 0.044,
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: 25.3,
      price: 95,
      value: 2403.5,
      change24h: -2.5,
      change24hPercent: -0.026,
    },
    {
      symbol: 'DOT',
      name: 'Polkadot',
      balance: 150,
      price: 8.5,
      value: 1275,
      change24h: 0.3,
      change24hPercent: 0.035,
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      balance: 500,
      price: 0.85,
      value: 425,
      change24h: 0.05,
      change24hPercent: 0.059,
    },
  ],
};

// Mock exchange rates for different currencies
export const mockExchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
};

// Mock staking data
export const mockStakingData = {
  totalStaked: 5000,
  totalRewards: 125.5,
  activeStakes: [
    {
      id: '1',
      asset: 'ETH',
      amount: 2.5,
      apy: 5.2,
      duration: '30 days',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active',
    },
    {
      id: '2',
      asset: 'ADA',
      amount: 500,
      apy: 4.8,
      duration: '90 days',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'active',
    },
  ],
};

// Mock DeFi positions
export const mockDeFiPositions = [
  {
    id: '1',
    protocol: 'Uniswap V3',
    asset: 'ETH/USDC',
    type: 'Liquidity Pool',
    amount: 1000,
    apy: 12.5,
    value: 1000,
    change24h: 25,
    change24hPercent: 2.5,
  },
  {
    id: '2',
    protocol: 'Compound',
    asset: 'USDC',
    type: 'Lending',
    amount: 5000,
    apy: 3.2,
    value: 5000,
    change24h: 8,
    change24hPercent: 0.16,
  },
  {
    id: '3',
    protocol: 'Aave',
    asset: 'ETH',
    type: 'Borrowing',
    amount: -1.5,
    apy: 2.8,
    value: -4800,
    change24h: -12,
    change24hPercent: -0.25,
  },
];

// Mock NFT holdings
export const mockNFTHoldings = [
  {
    id: '1',
    name: 'CryptoPunk #1234',
    collection: 'CryptoPunks',
    image: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=CP',
    floorPrice: 45.5,
    lastSale: 50.2,
    value: 45.5,
    change24h: 2.1,
    change24hPercent: 4.8,
  },
  {
    id: '2',
    name: 'Bored Ape #5678',
    collection: 'Bored Ape Yacht Club',
    image: 'https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=BA',
    floorPrice: 12.8,
    lastSale: 15.0,
    value: 12.8,
    change24h: -0.5,
    change24hPercent: -3.8,
  },
];
