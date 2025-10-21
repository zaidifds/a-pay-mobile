# A-Pay Mobile - Project Structure

## Folder Structure

```
src/
├── assets/          # Images, fonts, and other static assets
├── components/      # Reusable UI components
├── constants/       # App constants and configuration
├── hooks/          # Custom React hooks
├── localization/   # Internationalization files
├── mocks/          # Mock data for development/testing
├── navigation/     # Navigation configuration and screens
├── redux/          # Redux store, slices, and state management
├── screens/        # Screen components
├── services/       # API calls and external services
├── theme/          # Theme configuration and styling
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and helpers
```

## Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@/*` - Points to `src/*`
- `@/components/*` - Points to `src/components/*`
- `@/screens/*` - Points to `src/screens/*`
- `@/navigation/*` - Points to `src/navigation/*`
- `@/redux/*` - Points to `src/redux/*`
- `@/types/*` - Points to `src/types/*`
- `@/utils/*` - Points to `src/utils/*`
- And more...

## Dependencies Installed

- **Navigation**: `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs`
- **State Management**: `@reduxjs/toolkit`, `react-redux`
- **Storage**: `react-native-mmkv`
- **Animations**: `react-native-reanimated`
- **Icons**: `react-native-vector-icons`
- **Safe Area**: `react-native-safe-area-context` (already installed)
- **Screens**: `react-native-screens`, `react-native-gesture-handler`

## Getting Started

1. The app is configured with a basic navigation setup
2. Safe area handling is implemented
3. TypeScript path aliases are configured
4. Redux store is set up and ready for slices
5. Theme system is in place with light/dark mode support

## Next Steps

- Add more screens to the navigation
- Implement Redux slices for state management
- Add authentication flow
- Implement API services
- Add more UI components
