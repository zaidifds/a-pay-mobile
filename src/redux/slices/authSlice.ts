import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';
import { mockUsers, mockCredentials } from '../../mocks/user';
import { UserPreferences } from '../../utils/userPreferences';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      const { email, password } = credentials;
      const user = mockUsers.find(u => u.email === email);

      if (!user) {
        return rejectWithValue('User not found');
      }

      if (mockCredentials[email] !== password) {
        return rejectWithValue('Invalid password');
      }

      const token = 'mock-jwt-token-' + Date.now();
      return { user, token };
    } catch {
      return rejectWithValue('Login failed');
    }
  },
);

// Signup user
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (
    userData: { email: string; password: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      const { email, name } = userData;

      // Check if user already exists
      if (mockUsers.find(u => u.email === email)) {
        return rejectWithValue('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        avatar: `https://via.placeholder.com/100x100/007AFF/FFFFFF?text=${name
          .charAt(0)
          .toUpperCase()}`,
        createdAt: new Date().toISOString(),
      };

      // In a real app, this would be sent to the server
      mockUsers.push(newUser);
      mockCredentials[email] = userData.password;

      const token = 'mock-jwt-token-' + Date.now();
      return { user: newUser, token };
    } catch {
      return rejectWithValue('Signup failed');
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
      // Login
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Signup
      .addCase(signupUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
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
