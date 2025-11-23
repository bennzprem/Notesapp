# NotesApp

A simple and efficient Notes application built with React Native and Expo. This app allows users to create, edit, and manage their personal notes with a secure login system.

## Features

- **User Authentication**: Simple login and registration system.
- **Personalized Notes**: Notes are stored locally and associated with specific user accounts.
- **CRUD Operations**: Create, Read, Update, and Delete notes easily.
- **Local Storage**: Uses `AsyncStorage` to persist data on the device.
- **Responsive Design**: Built to work seamlessly on both Android and iOS.

## Tech Stack & Libraries

The project utilizes the following key libraries and dependencies:

### Core
- **react**: 19.1.0
- **react-native**: 0.81.5
- **expo**: ~54.0.25
- **expo-status-bar**: ~3.0.8

### Navigation
- **@react-navigation/native**: ^7.1.20
- **@react-navigation/native-stack**: ^7.6.3
- **react-native-screens**: ~4.16.0
- **react-native-safe-area-context**: ~5.6.0

### Storage & Utilities
- **@react-native-async-storage/async-storage**: 2.2.0
- **expo-image-picker**: ~17.0.8

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd NotesApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the App

1. **Start the development server**:
   ```bash
   npx expo start
   ```

2. **Run on your device**:
   - Scan the QR code shown in the terminal using the **Expo Go** app (Android) or the Camera app (iOS).
   - Alternatively, press `a` to run on an Android Emulator or `i` to run on an iOS Simulator (requires setup).

## Project Structure

```
NotesApp/
├── assets/                 # Images and icons
├── screens/                # Application screens
│   ├── HomeScreen.js       # Main dashboard displaying notes
│   ├── LoginScreen.js      # User authentication screen
│   └── NoteEditorScreen.js # Screen for creating/editing notes
├── App.js                  # Main entry point and navigation setup
├── storage.js              # Helper functions for AsyncStorage operations
├── app.json                # Expo configuration
└── package.json            # Project dependencies and scripts
```

## Usage

1. **Login/Register**: On first launch, enter a username and password to register. Subsequent logins will verify these credentials.
2. **Create Note**: Tap the "+" button on the Home screen to create a new note.
3. **Edit Note**: Tap on any existing note to edit its content.
4. **Delete Note**: Options to delete notes are available within the editor or list view.

## License

This project is for educational purposes.
