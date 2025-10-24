# A-Pay Mobile 💳

A modern React Native cryptocurrency wallet application with comprehensive authentication, multi-language support, and beautiful UI components.

## 📱 Overview

A-Pay Mobile is a feature-rich cryptocurrency wallet application built with React Native, offering secure account management, transaction handling, and a seamless user experience across iOS and Android platforms.

## ✨ Features

### 🔐 Authentication & Security

- **Multi-step Authentication Flow**
  - Personal & Business account types
  - Email/Phone verification
  - Two-factor authentication
  - Account recovery system
- **Secure State Management**
  - Redux Toolkit with persistence
  - MMKV storage for sensitive data
  - Encrypted token storage

### 🌍 Internationalization

- **Multi-language Support**
  - English, Arabic, Croatian, Urdu
  - RTL (Right-to-Left) layout support
  - Dynamic language switching
  - Context-aware translations

### 🎨 UI/UX Features

- **Dynamic Theme System**
  - Light & Dark mode support
  - Customizable color schemes
  - Responsive design
  - Beautiful animations
- **Reusable Components**
  - DynamicHeader with full customization
  - Form components with validation
  - Modal system for transactions
  - Card-based layouts

### 💰 Wallet Features

- **Multi-currency Support**
  - Real-time price tracking
  - Balance management
  - Transaction history
- **Transaction Types**
  - Send/Receive cryptocurrency
  - Swap between currencies
  - Buy cryptocurrency
  - Transaction filtering

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── auth/            # Authentication components
│   ├── forms/           # Form components
│   ├── modals/          # Modal components
│   ├── cards/           # Card components
│   ├── navigation/      # Navigation components
│   ├── settings/        # Settings components
│   └── common/          # Shared components
├── screens/             # Screen components
│   ├── AuthScreens/     # Authentication screens
│   ├── OnboardingScreen/
│   └── SplashScreen/
├── navigation/          # Navigation configuration
├── redux/              # State management
│   ├── slices/         # Redux slices
│   └── store.ts        # Store configuration
├── localization/       # Internationalization
│   ├── translations/   # Language files
│   └── useTranslation.ts
├── theme/              # Theme system
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── constants/          # App constants
└── assets/             # Images and SVGs
```

### Technology Stack

#### Core Technologies

- **React Native** 0.82.1 - Cross-platform mobile development
- **TypeScript** 5.8.3 - Type-safe JavaScript
- **React** 19.1.1 - UI library

#### State Management

- **Redux Toolkit** 2.9.1 - Predictable state container
- **Redux Persist** 5.10.0 - State persistence
- **React Redux** 9.2.0 - React bindings

#### Navigation

- **React Navigation** 7.x - Navigation library
- **Stack Navigator** - Screen transitions
- **Bottom Tab Navigator** - Tab navigation

#### UI & Styling

- **React Native Vector Icons** 10.3.0 - Icon library
- **React Native Linear Gradient** 2.8.3 - Gradient backgrounds
- **React Native SVG** 15.14.0 - SVG support
- **React Native Reanimated** 4.1.3 - Animations

#### Forms & Validation

- **Formik** 2.4.6 - Form management
- **Yup** 1.7.1 - Schema validation
- **React Native International Phone Number** 0.11.0 - Phone input

#### Storage & Persistence

- **React Native MMKV** 4.0.0 - Fast key-value storage
- **Redux Persist** - State persistence

#### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Babel Module Resolver** - Path aliasing

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd a-pay-mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup**

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the app**

   ```bash
   # iOS
   npm run ios
   # or
   yarn ios

   # Android
   npm run android
   # or
   yarn android
   ```

## 📱 Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🎨 Design System

### Theme Configuration

The app uses a comprehensive theme system with:

- **Color Palette**: Primary, secondary, status, and semantic colors
- **Typography**: Responsive font sizes and weights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation system

### Component Library

- **DynamicHeader**: Highly customizable header component
- **Form Components**: Input, dropdown with validation
- **Modal System**: Buy, receive, swap modals
- **Card Components**: Account and transaction cards

## 🌐 Internationalization

### Supported Languages

- English (en)
- Arabic (ar) - RTL support
- Croatian (hr)
- Urdu (ur)

### Adding New Languages

1. Create translation file in `src/localization/translations/`
2. Add language to `src/localization/constants.ts`
3. Update language selector component

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
"@/*": ["src/*"]
"@/components/*": ["src/components/*"]
"@/hooks/*": ["src/hooks/*"]
// ... and more
```

### Environment Configuration

- Development API: `https://api-dev.apay.com`
- Production API: `https://api.apay.com`

## 📦 Key Dependencies

### Production Dependencies

- `@react-navigation/native` - Navigation
- `@reduxjs/toolkit` - State management
- `formik` - Form handling
- `react-native-mmkv` - Storage
- `react-native-vector-icons` - Icons
- `yup` - Validation

### Development Dependencies

- `@types/react` - TypeScript types
- `eslint` - Linting
- `prettier` - Formatting
- `typescript` - Type checking

## 🏛️ Architecture Patterns

### State Management

- **Redux Toolkit** for global state
- **Redux Persist** for state persistence
- **Typed hooks** for type safety

### Component Organization

- **Atomic Design** principles
- **Feature-based** folder structure
- **Reusable** component library

### Navigation

- **Stack-based** navigation
- **Type-safe** navigation
- **Conditional** routing based on auth state

## 🔒 Security Features

- **Secure Storage** using MMKV
- **Token Management** with Redux Persist
- **Input Validation** with Yup schemas
- **Type Safety** with TypeScript

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📱 Platform Support

- **iOS** 12.0+
- **Android** API 21+ (Android 5.0)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Changelog

### Version 1.0.0

- Initial release
- Authentication system
- Multi-language support
- Wallet functionality
- Theme system
- Component library

---

**Built with ❤️ using React Native**
