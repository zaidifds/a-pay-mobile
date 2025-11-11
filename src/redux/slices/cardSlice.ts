import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: 'Visa' | 'Mastercard' | 'American Express' | 'Card';
  last4Digits: string;
  isDefault: boolean;
  createdAt: string;
}

export interface CardFormData {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  saveCard: boolean;
}

export interface CardState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

const initialState: CardState = {
  cards: [],
  isLoading: false,
  error: null,
  isSubmitting: false,
};

// Async thunks
export const addCard = createAsyncThunk(
  'card/addCard',
  async (cardData: CardFormData, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      // Simulate validation
      if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
        throw new Error('Invalid card number');
      }

      // Create card object
      const cardNumber = cardData.cardNumber.replace(/\s/g, '');
      const last4Digits = cardNumber.slice(-4);
      const cardType = getCardType(cardNumber);

      const newCard: Card = {
        id: Date.now().toString(),
        cardNumber: cardData.cardNumber,
        cardHolderName: cardData.cardHolderName,
        expiryDate: cardData.expiryDate,
        cardType,
        last4Digits,
        isDefault: false,
        createdAt: new Date().toISOString(),
      };

      return newCard;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add card');
    }
  },
);

export const removeCard = createAsyncThunk(
  'card/removeCard',
  async (cardId: string, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      return cardId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove card');
    }
  },
);

export const setDefaultCard = createAsyncThunk(
  'card/setDefaultCard',
  async (cardId: string, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      return cardId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to set default card');
    }
  },
);

// Helper function
const getCardType = (cardNumber: string): Card['cardType'] => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.startsWith('4')) return 'Visa';
  if (cleaned.startsWith('5')) return 'Mastercard';
  if (cleaned.startsWith('3')) return 'American Express';
  return 'Card';
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCards: state => {
      state.cards = [];
    },
  },
  extraReducers: builder => {
    // Add card
    builder
      .addCase(addCard.pending, state => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.cards.push(action.payload);
        // Set as default if it's the first card
        if (state.cards.length === 1) {
          action.payload.isDefault = true;
        }
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      });

    // Remove card
    builder
      .addCase(removeCard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = state.cards.filter(card => card.id !== action.payload);
      })
      .addCase(removeCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Set default card
    builder
      .addCase(setDefaultCard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setDefaultCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = state.cards.map(card => ({
          ...card,
          isDefault: card.id === action.payload,
        }));
      })
      .addCase(setDefaultCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCards } = cardSlice.actions;
export default cardSlice.reducer;
