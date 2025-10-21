import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockWalletBalances, mockCoinPrices } from '../../mocks/transactions';
import { WalletBalance, CoinPrice } from '../../types';

interface WalletState {
  balances: WalletBalance;
  prices: CoinPrice;
  isBalanceVisible: boolean;
}

const initialState: WalletState = {
  balances: mockWalletBalances,
  prices: mockCoinPrices,
  isBalanceVisible: true,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    toggleBalanceVisibility: state => {
      state.isBalanceVisible = !state.isBalanceVisible;
    },
    addToBalance: (
      state,
      action: PayloadAction<{ currency: string; amount: number }>,
    ) => {
      const { currency, amount } = action.payload;
      state.balances[currency] = (state.balances[currency] || 0) + amount;
    },
    swapBalances: (
      state,
      action: PayloadAction<{
        fromCurrency: string;
        toCurrency: string;
        fromAmount: number;
        toAmount: number;
      }>,
    ) => {
      const { fromCurrency, toCurrency, fromAmount, toAmount } = action.payload;
      state.balances[fromCurrency] = Math.max(
        0,
        (state.balances[fromCurrency] || 0) - fromAmount,
      );
      state.balances[toCurrency] = (state.balances[toCurrency] || 0) + toAmount;
    },
  },
});

export const { toggleBalanceVisibility, addToBalance, swapBalances } =
  walletSlice.actions;

export default walletSlice.reducer;
