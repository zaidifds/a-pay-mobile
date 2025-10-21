import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SimpleUser, User, UserSession } from '../../types';
import { mockUsers, mockCredentials } from '../../mocks/user';
import { setUserSessionData, clearUserSessionData } from './userSlice';

interface AuthState {
  user: SimpleUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      const { email, password } = credentials;
      const user = mockUsers.find(u => u.email === email);

      if (!user) {
        return rejectWithValue('User not found');
      }

      if (mockCredentials[email as keyof typeof mockCredentials] !== password) {
        return rejectWithValue('Invalid password');
      }

      // Create a mock UserSession for the main app
      const mockUserSession: UserSession = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: user.id,
          email: user.email,
          username: user.name.toLowerCase().replace(' ', '.'),
          password: '',
          country: null,
          street: null,
          city: null,
          postcode: null,
          state: null,
          pin: null,
          image: user.avatar || null,
          location_id: '1',
          client_id: null,
          billing_model: null,
          next_payment_on: null,
          subscription_id: null,
          personal_identification_no: null,
          shopper_reference: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          phone: '',
          display_color: '#007AFF',
          deleted_status: false,
          active_status: true,
          user_main: true,
          password_changed: false,
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ')[1] || '',
          fcm_token: null,
          last_login: new Date().toISOString(),
          client_language_id: null,
          otp_code: null,
          location: {
            id: '1',
            client_id: '1',
            location_currency: 'USD',
            location_name: 'Main Location',
            location_timezone: 'UTC',
            location_24_hours: false,
            location_number: '001',
            language_id: '1',
            country: 'US',
            street: '123 Main St',
            city: 'New York',
            postcode: '10001',
            state: 'NY',
            latitude: '40.7128',
            longitude: '-74.0060',
            send_activation_email: false,
            location_email: 'info@example.com',
            location_phone: '+1234567890',
            tip_enabled: true,
            deleted_status: false,
            active_status: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            languagesId: null,
            loyalty: {
              id: '1',
              location_id: '1',
              earn_amount: 1,
              earn_points: 1,
              redeem_points: 100,
              redeem_amount: 1,
              max_redeem_pct: 50,
              expires_in_days: 365,
              deleted_status: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
          customer: {
            id: user.id,
            firstname: user.name.split(' ')[0],
            lastname: user.name.split(' ')[1] || '',
            email: user.email,
            username: null,
            phone: '',
            alternate_phone: null,
            is_verified: true,
            deleted_status: false,
            active_status: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            image: user.avatar || null,
            user_id: user.id,
            customer_loyalty: {
              id: '1',
              customer_id: user.id,
              points: 0,
              updated_at: new Date().toISOString(),
            },
          },
          loyalty_points: 0,
          location_loyalty: {
            id: '1',
            location_id: '1',
            earn_amount: 1,
            earn_points: 1,
            redeem_points: 100,
            redeem_amount: 1,
            max_redeem_pct: 50,
            expires_in_days: 365,
            deleted_status: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
      };

      // Dispatch to userSession slice
      dispatch(setUserSessionData(mockUserSession));

      return user;
    } catch {
      return rejectWithValue('Login failed');
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (
    userData: { email: string; password: string; name: string },
    { rejectWithValue, dispatch },
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
      const newUser: SimpleUser = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        avatar: `https://via.placeholder.com/100x100/007AFF/FFFFFF?text=${name
          .charAt(0)
          .toUpperCase()}`,
      };

      // In a real app, this would be sent to the server
      mockUsers.push(newUser);
      mockCredentials[email as keyof typeof mockCredentials] =
        userData.password;

      // Create a mock UserSession for the main app (similar to login)
      const mockUserSession: UserSession = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.name.toLowerCase().replace(' ', '.'),
          password: '',
          country: null,
          street: null,
          city: null,
          postcode: null,
          state: null,
          pin: null,
          image: newUser.avatar || null,
          location_id: '1',
          client_id: null,
          billing_model: null,
          next_payment_on: null,
          subscription_id: null,
          personal_identification_no: null,
          shopper_reference: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          phone: '',
          display_color: '#007AFF',
          deleted_status: false,
          active_status: true,
          user_main: true,
          password_changed: false,
          first_name: newUser.name.split(' ')[0],
          last_name: newUser.name.split(' ')[1] || '',
          fcm_token: null,
          last_login: new Date().toISOString(),
          client_language_id: null,
          otp_code: null,
          location: {
            id: '1',
            client_id: '1',
            location_currency: 'USD',
            location_name: 'Main Location',
            location_timezone: 'UTC',
            location_24_hours: false,
            location_number: '001',
            language_id: '1',
            country: 'US',
            street: '123 Main St',
            city: 'New York',
            postcode: '10001',
            state: 'NY',
            latitude: '40.7128',
            longitude: '-74.0060',
            send_activation_email: false,
            location_email: 'info@example.com',
            location_phone: '+1234567890',
            tip_enabled: true,
            deleted_status: false,
            active_status: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            languagesId: null,
            loyalty: {
              id: '1',
              location_id: '1',
              earn_amount: 1,
              earn_points: 1,
              redeem_points: 100,
              redeem_amount: 1,
              max_redeem_pct: 50,
              expires_in_days: 365,
              deleted_status: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          },
          customer: {
            id: newUser.id,
            firstname: newUser.name.split(' ')[0],
            lastname: newUser.name.split(' ')[1] || '',
            email: newUser.email,
            username: null,
            phone: '',
            alternate_phone: null,
            is_verified: true,
            deleted_status: false,
            active_status: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            image: newUser.avatar || null,
            user_id: newUser.id,
            customer_loyalty: {
              id: '1',
              customer_id: newUser.id,
              points: 0,
              updated_at: new Date().toISOString(),
            },
          },
          loyalty_points: 0,
          location_loyalty: {
            id: '1',
            location_id: '1',
            earn_amount: 1,
            earn_points: 1,
            redeem_points: 100,
            redeem_amount: 1,
            max_redeem_pct: 50,
            expires_in_days: 365,
            deleted_status: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
      };

      // Dispatch to userSession slice
      dispatch(setUserSessionData(mockUserSession));

      return newUser;
    } catch {
      return rejectWithValue('Signup failed');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));

      // Clear user session data
      dispatch(clearUserSessionData());

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
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Signup
      .addCase(signupUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Logout
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
