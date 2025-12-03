# Shopping List (React Native + Expo)

A simple, modern shopping list app built with Expo, React Native, and Redux Toolkit. It supports adding, editing, deleting, and marking items as purchased, with automatic persistence using AsyncStorage and friendly toast notifications for user feedback.

## Tech Stack

- React Native (Expo Router)
- Redux Toolkit + React Redux
- AsyncStorage (data persistence)
- TypeScript

## Prerequisites

- Node.js and npm
- Expo CLI (installed automatically via `npx expo`)
- For device/simulator testing:
   - Android Studio (Android Emulator) or a physical Android device with Expo Go
   - Xcode (iOS Simulator) or a physical iOS device with Expo Go

## Quick Start

1) Install dependencies

```cmd
npm install
```

2) Start the dev server (choose platform in the Expo UI)

```cmd
npx expo start
```

Handy scripts from `package.json`:

```cmd
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

## Running on Devices/Simulators

- Android: press `a` in the Expo CLI or run `npm run android`
- iOS: press `i` in the Expo CLI or run `npm run ios` (macOS only)
- Web: run `npm run web`
- Expo Go: scan the QR code from the Expo CLI on your device

## Project Structure

```
app/
   _layout.tsx        # Expo Router stack + Redux Provider
   index.tsx          # Main screen (list + form + modal)
components/
   AddItemForm.tsx    # Add new items with validation
   EditItemModal.tsx  # Edit existing items with validation
   ShoppingItem.tsx   # List item row with actions
   Toast.tsx          # Animated toast notifications
store/
   store.ts           # Redux store configuration
   hooks.ts           # Typed hooks (useAppDispatch/useAppSelector)
   shoppingListSlice.ts # Slice: add/edit/delete/toggle/clear/load
   storage.ts         # AsyncStorage helpers
   usePersistence.ts  # Load on start + auto-save on change
```

## State Management

- Slice: `store/shoppingListSlice.ts`
   - Actions: `addItem`, `editItem`, `deleteItem`, `togglePurchased`, `clearList`, `loadItems`
   - State shape: `{ items: ShoppingItem[] }`
- Provider: wrapped in `app/_layout.tsx`
- Selectors/hooks: `store/hooks.ts`

## Data Persistence

- Storage: `AsyncStorage` via helpers in `store/storage.ts`
- Auto-load on app start and auto-save on any change using `store/usePersistence.ts`
- No manual save needed; data persists across sessions

## User Guide

- Add Item: enter name, quantity, optional category; tap "Add Item"
- Edit Item: tap "Edit" on a row, adjust fields, tap "Save"
- Delete Item: tap "Delete" on a row (confirm dialog)
- Mark Purchased: tap the circle on the left of an item
- Clear All: use the "Clear All" action when present (if enabled in UI)
- Feedback: successful actions show green toasts; errors show red toasts
- Validation: forms require a name (2–50 chars) and quantity (1–999)

## Troubleshooting

- Clear Metro/Expo cache if something looks stale:

```cmd
npx expo start -c
```

- PowerShell blocks npm scripts (Windows): run commands from `cmd.exe` or adjust execution policy. Example to run from `cmd`:

```cmd
cmd /c "npm install"
```

- Android emulator not found: open Android Studio, start a virtual device, then run `npm run android`.

## Useful Links

- Expo Docs: https://docs.expo.dev
- Expo Router: https://docs.expo.dev/router/introduction/
- Redux Toolkit: https://redux-toolkit.js.org/

