import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSession, Customer, Loyalty } from '../../types';

interface UserSessionState {
  userSession: UserSession;
  fcmToken: string;
}

const initialState: UserSessionState = {
  userSession: {
    token: '',
    user: {
      id: '',
      email: '',
      username: '',
      password: '',
      country: null,
      street: null,
      city: null,
      postcode: null,
      state: null,
      pin: null,
      image: null,
      location_id: '',
      client_id: null,
      billing_model: null,
      next_payment_on: null,
      subscription_id: null,
      personal_identification_no: null,
      shopper_reference: null,
      created_at: '',
      updated_at: '',
      phone: '',
      display_color: '#fff',
      deleted_status: false,
      active_status: false,
      user_main: false,
      password_changed: false,
      first_name: '',
      last_name: '',
      fcm_token: null,
      last_login: null,
      client_language_id: null,
      otp_code: null,
      location: {
        id: '',
        client_id: '',
        location_currency: '',
        location_name: '',
        location_timezone: '',
        location_24_hours: false,
        location_number: '',
        language_id: '',
        country: '',
        street: '',
        city: '',
        postcode: '',
        state: '',
        latitude: '',
        longitude: '',
        send_activation_email: false,
        location_email: '',
        location_phone: '',
        tip_enabled: false,
        deleted_status: false,
        active_status: false,
        created_at: '',
        updated_at: '',
        languagesId: null,
        loyalty: {
          id: '',
          location_id: '',
          earn_amount: 0,
          earn_points: 0,
          redeem_points: 0,
          redeem_amount: 0,
          max_redeem_pct: 0,
          expires_in_days: 0,
          deleted_status: false,
          created_at: '',
          updated_at: '',
        },
      },
      customer: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        username: null,
        phone: '',
        alternate_phone: null,
        is_verified: false,
        deleted_status: false,
        active_status: false,
        created_at: '',
        updated_at: '',
        image: null,
        user_id: '',
        customer_loyalty: {
          id: '',
          customer_id: '',
          points: 0,
          updated_at: '',
        },
      },
      loyalty_points: 0,
      location_loyalty: {
        id: '',
        location_id: '',
        earn_amount: 0,
        earn_points: 0,
        redeem_points: 0,
        redeem_amount: 0,
        max_redeem_pct: 0,
        expires_in_days: 0,
        deleted_status: false,
        created_at: '',
        updated_at: '',
      },
    },
  },
  fcmToken: '',
};

const userSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    setUserSessionData: (state, action: PayloadAction<UserSession>) => {
      state.userSession = action.payload;
    },
    updateCustomerData: (state, action: PayloadAction<Customer>) => {
      state.userSession.user.customer = action.payload;
    },
    updateUserProfile: (
      state,
      action: PayloadAction<{
        user?: Partial<User>;
        customer?: Partial<Customer>;
      }>,
    ) => {
      const { user: userUpdates, customer: customerUpdates } = action.payload;

      // Update user-level fields
      if (userUpdates) {
        Object.keys(userUpdates).forEach(key => {
          if (key in state.userSession.user) {
            (state.userSession.user as any)[key] =
              userUpdates[key as keyof User];
          }
        });
      }

      // Update customer-level fields
      if (customerUpdates) {
        Object.keys(customerUpdates).forEach(key => {
          if (key in state.userSession.user.customer) {
            (state.userSession.user.customer as any)[key] =
              customerUpdates[key as keyof Customer];
          }
        });
      }
    },
    updateLoyaltyPoints: (state, action: PayloadAction<number>) => {
      console.log('🔄 updateLoyaltyPoints action called with:', action.payload);
      console.log('🔄 Current state before update:', {
        loyalty_points: state.userSession.user.loyalty_points,
        customer_loyalty: state.userSession.user.customer?.customer_loyalty,
        has_userSession: !!state.userSession,
        has_user: !!state.userSession?.user,
        has_customer: !!state.userSession?.user?.customer,
      });

      // Ensure we have the required state structure
      if (!state.userSession?.user) {
        console.error('🔄 No user object found in state!');
        return;
      }

      state.userSession.user.loyalty_points = action.payload;

      // Safely update customer loyalty points with null checks
      if (
        state.userSession.user.customer &&
        state.userSession.user.customer.customer_loyalty
      ) {
        state.userSession.user.customer.customer_loyalty.points =
          action.payload;
        console.log('🔄 Updated existing customer_loyalty.points');
      } else if (state.userSession.user.customer) {
        // Initialize customer_loyalty if it doesn't exist
        state.userSession.user.customer.customer_loyalty = {
          id: '',
          customer_id: state.userSession.user.customer.id || '',
          points: action.payload,
          updated_at: new Date().toISOString(),
        };
        console.log('🔄 Created new customer_loyalty object');
      } else {
        console.log('🔄 No customer object found, only updated loyalty_points');
      }

      console.log('🔄 State after update:', {
        loyalty_points: state.userSession.user.loyalty_points,
        customer_loyalty: state.userSession.user.customer?.customer_loyalty,
        customer_exists: !!state.userSession.user.customer,
        user_exists: !!state.userSession.user,
        userSession_exists: !!state.userSession,
      });
    },
    updateLocationLoyalty: (state, action: PayloadAction<Loyalty>) => {
      state.userSession.user.location_loyalty = action.payload;
    },
    setFcmToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
    clearUserSessionData: () => {
      return initialState;
    },
  },
});

export const {
  setUserSessionData,
  clearUserSessionData,
  updateCustomerData,
  updateUserProfile,
  updateLoyaltyPoints,
  updateLocationLoyalty,
  setFcmToken,
} = userSlice.actions;

export default userSlice.reducer;
