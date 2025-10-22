import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../types';
import { mockTransactions } from '../../mocks/transactions';

export interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: {
    type: 'all' | 'send' | 'receive' | 'swap';
    status: 'all' | 'completed' | 'pending' | 'failed';
    currency: 'all' | string;
  };
  sortBy: 'date' | 'amount' | 'type';
  sortOrder: 'asc' | 'desc';
}

const initialState: TransactionState = {
  transactions: mockTransactions,
  isLoading: false,
  error: null,
  filters: {
    type: 'all',
    status: 'all',
    currency: 'all',
  },
  sortBy: 'date',
  sortOrder: 'desc',
};

// Async thunk to fetch transactions (simulated)
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // In a real app, this would fetch from API
      return mockTransactions;
    } catch (error) {
      return rejectWithValue('Failed to fetch transactions');
    }
  },
);

// Async thunk to add a new transaction
export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (
    transaction: Omit<Transaction, 'id' | 'timestamp'>,
    { rejectWithValue },
  ) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));

      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };

      // In a real app, this would be sent to the server
      return newTransaction;
    } catch (error) {
      return rejectWithValue('Failed to add transaction');
    }
  },
);

// Async thunk to update transaction status
export const updateTransactionStatus = createAsyncThunk(
  'transactions/updateTransactionStatus',
  async (
    { id, status }: { id: string; status: Transaction['status'] },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));

      // In a real app, this would update on the server
      return { id, status };
    } catch (error) {
      return rejectWithValue('Failed to update transaction status');
    }
  },
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setFilter: (
      state,
      action: PayloadAction<{
        key: keyof TransactionState['filters'];
        value: string;
      }>,
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value as any;
    },
    clearFilters: state => {
      state.filters = {
        type: 'all',
        status: 'all',
        currency: 'all',
      };
    },
    setSortBy: (state, action: PayloadAction<TransactionState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (
      state,
      action: PayloadAction<TransactionState['sortOrder']>,
    ) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: state => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    // Local transaction addition (for immediate UI updates)
    addTransactionLocal: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    // Local transaction update (for immediate UI updates)
    updateTransactionLocal: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Transaction> }>,
    ) => {
      const { id, updates } = action.payload;
      const index = state.transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...updates,
        };
      }
    },
    // Remove transaction (for testing/cleanup)
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        t => t.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add transaction
      .addCase(addTransaction.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.error = null;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update transaction status
      .addCase(updateTransactionStatus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, status } = action.payload;
        const transaction = state.transactions.find(t => t.id === id);
        if (transaction) {
          transaction.status = status;
        }
        state.error = null;
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setFilter,
  clearFilters,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  addTransactionLocal,
  updateTransactionLocal,
  removeTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
