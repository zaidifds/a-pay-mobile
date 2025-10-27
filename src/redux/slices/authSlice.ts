import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Login with PIN
export const loginWithPin = createAsyncThunk(
  'auth/loginWithPin',
  async (pin: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // Hardcoded PIN for now: 123456
      if (pin !== '123456') {
        return rejectWithValue('Invalid PIN');
      }

      // Mock user
      const user: User = {
        id: '1',
        email: 'user@apay.com',
        name: 'A Pay User',
        avatar: `https://via.placeholder.com/100x100/007AFF/FFFFFF?text=U`,
        createdAt: new Date().toISOString(),
      };

      const token = 'mock-jwt-token-' + Date.now();
      return { user, token };
    } catch {
      return rejectWithValue('Login failed');
    }
  },
);

// Logout user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      return null;
    } catch {
      return rejectWithValue('Logout failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateUserProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Login with PIN
      .addCase(loginWithPin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithPin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginWithPin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Logout
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, updateUserProfilePicture } =
  authSlice.actions;
export default authSlice.reducer;
