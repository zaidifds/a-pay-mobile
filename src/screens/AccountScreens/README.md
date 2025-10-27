# Account & Document Screens

This folder contains all the screens for the Account & Document flow, designed to be pixel perfect and ready for integration.

## Screen Structure

### Main Screens

1. **AccountDocumentScreen.tsx** - Main entry point with menu items
2. **PersonalProfileScreen.tsx** - User profile overview with sections
3. **PersonalDetailsScreen.tsx** - Personal information form
4. **BusinessProfileScreen.tsx** - Business profile menu
5. **BusinessDetailsScreen.tsx** - Business information display
6. **BusinessAddressScreen.tsx** - Business address cards
7. **TypeOfBusinessScreen.tsx** - Business type form
8. **BusinessStructureScreen.tsx** - Directors and shareholders
9. **StatementsScreen.tsx** - Financial statements menu

## Features

- **Pixel Perfect Design**: All screens match the provided designs exactly
- **Theme Support**: Full theme integration with light/dark mode support
- **RTL Support**: Right-to-left language support
- **Translation Ready**: All text uses translation keys
- **Consistent Styling**: Uses shared components and styling patterns
- **Navigation Ready**: Console logs for navigation (to be integrated later)

## Design Patterns

### Header

- Uses `DynamicHeader` component for consistent navigation
- Back button with proper navigation handling
- Centered titles

### Form Elements

- Uses `FormInput` and `FormDropdown` components
- Consistent 56px height for all inputs
- Proper placeholder and label handling

### Cards and Lists

- Consistent card styling with rounded corners
- Proper spacing and typography
- Touch feedback with `activeOpacity`

### Icons

- Emoji icons for visual consistency
- Proper sizing and alignment
- Color coding for different actions

## Integration Notes

1. **Navigation**: Currently uses `console.log` for navigation - replace with actual navigation when integrating
2. **Data**: Uses placeholder data - replace with real data sources
3. **Actions**: Edit buttons and form submissions need actual implementation
4. **Validation**: Form validation needs to be implemented
5. **API Integration**: Connect to backend services for data persistence

## File Organization

```
AccountScreens/
├── AccountDocumentScreen.tsx      # Main menu
├── PersonalProfileScreen.tsx      # User profile
├── PersonalDetailsScreen.tsx      # Personal info form
├── BusinessProfileScreen.tsx      # Business menu
├── BusinessDetailsScreen.tsx      # Business info
├── BusinessAddressScreen.tsx      # Address cards
├── TypeOfBusinessScreen.tsx       # Business type
├── BusinessStructureScreen.tsx    # Directors/Shareholders
├── StatementsScreen.tsx           # Financial statements
├── index.ts                       # Exports
└── README.md                      # This file
```

## Translation Keys

All screens use translation keys from the main translation system. New keys added:

- `account_document`, `profile_management`, `personal_profile`, etc.
- `business_details`, `business_address`, `type_of_business`, etc.
- `statements`, `privacy_policy`, `terms_conditions`, etc.

## Styling

- Uses theme colors and spacing consistently
- Responsive design with proper padding and margins
- Consistent typography hierarchy
- Proper touch targets (minimum 44px)
- Accessibility considerations

## Next Steps

1. Integrate with main navigation system
2. Connect to data sources
3. Implement form validation
4. Add loading states
5. Implement error handling
6. Add animations and transitions
7. Test on different screen sizes
8. Add accessibility features
