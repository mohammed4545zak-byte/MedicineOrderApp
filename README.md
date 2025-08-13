# Medicine Order App 📱💊

A complete React Native mobile application for ordering medicines with authentication, cart management, and order tracking.

## 🚀 Features

- **User Authentication** - Login and signup functionality
- **Medicine Browsing** - Browse medicines by category and search
- **Shopping Cart** - Add/remove medicines with quantity management
- **Order Management** - Place orders and track order history
- **User Profile** - Manage user information and settings
- **WebView Integration** - Access existing pharmacy websites
- **Offline Storage** - Local data persistence with AsyncStorage

## 📱 Screenshots

The app includes:
- Welcome screen with app introduction
- Login/Signup screens with validation
- Home screen with medicine categories and search
- Medicine detail pages with add to cart
- Shopping cart with checkout functionality
- Order history and tracking
- User profile and settings

## 🛠 Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation between screens
- **AsyncStorage** - Local data storage
- **React Context** - State management
- **WebView** - Web content integration

## 📁 Project Structure

```
MedicineOrderApp/
├── App.tsx                     # Main app component
├── src/
│   ├── screens/               # App screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── OrdersScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── MedicineDetailScreen.tsx
│   │   └── WebViewScreen.tsx
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   └── services/              # Data and API services
│       └── data.ts
├── package.json
├── app.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional but recommended)
- **Android Studio** (for Android development) or **Xcode** (for iOS development)

### Installation Steps

#### 1. Create a New Expo Project

```bash
# Create a new Expo project
npx create-expo-app@latest MedicineOrderApp --template blank-typescript

# Navigate to project directory
cd MedicineOrderApp
```

#### 2. Install Dependencies

```bash
# Install required packages
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install @react-native-async-storage/async-storage
npm install react-native-webview
npm install react-native-screens react-native-safe-area-context
npx expo install expo-status-bar

# Install Expo vector icons
npx expo install @expo/vector-icons
```

#### 3. Copy Source Code

Replace the default files with the provided source code:
- Copy all files from this repository to your project
- Replace `App.tsx` with the provided version
- Create the `src/` directory structure as shown above
- Copy all screen components, contexts, and services

#### 4. Configure App Settings

Update `app.json`:
```json
{
  "expo": {
    "name": "Medicine Order App",
    "slug": "medicine-order-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#2196F3"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#2196F3"
      }
    }
  }
}
```

### 🏃‍♂️ Running the App

#### Method 1: Using Expo Go (Recommended for Development)

1. **Start the development server:**
   ```bash
   npx expo start
   ```

2. **Install Expo Go on your phone:**
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

3. **Scan the QR code:**
   - Open Expo Go app on your phone
   - Scan the QR code displayed in your terminal
   - The app will load on your device

#### Method 2: Using Android Emulator

1. **Set up Android Studio:**
   - Download and install [Android Studio](https://developer.android.com/studio)
   - Create a new Android Virtual Device (AVD)
   - Start the emulator

2. **Run the app:**
   ```bash
   npx expo start
   # Press 'a' to open on Android emulator
   ```

#### Method 3: Using iOS Simulator (macOS only)

1. **Install Xcode** from the Mac App Store

2. **Run the app:**
   ```bash
   npx expo start
   # Press 'i' to open on iOS simulator
   ```

### 📱 Testing on Physical Device

#### Android Device

1. **Enable Developer Options:**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect via USB:**
   ```bash
   # Check if device is connected
   adb devices

   # Run the app
   npx expo start
   # Press 'a' to install on connected device
   ```

#### iOS Device

1. **Install Expo Go** from the App Store
2. **Connect to same WiFi** as your computer
3. **Scan QR code** from the Expo Go app

### 🛠 Development Workflow

#### Hot Reloading

The app supports hot reloading - any changes you make to the code will automatically refresh on your device.

#### Debugging

- Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) to open the developer menu
- Use React Native Debugger or Chrome DevTools for debugging

### 📦 Building for Production

#### Create Production Build

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios
```

#### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for both platforms
eas build --platform all
```

### 🔧 Configuration

#### Customizing the App

1. **Colors and Themes:**
   - Modify colors in each screen's StyleSheet
   - Main theme color: `#2196F3` (blue)

2. **Sample Data:**
   - Edit `src/services/data.ts` to modify medicine categories and sample data

3. **API Integration:**
   - Replace sample data with real API calls in contexts and services
   - Update authentication logic in `AuthContext.tsx`

4. **WebView URL:**
   - Change the default pharmacy website URL in `WebViewScreen.tsx`

### 🔍 Troubleshooting

#### Common Issues:

1. **Metro bundler issues:**
   ```bash
   npx expo start --clear
   ```

2. **Node modules issues:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo Go not connecting:**
   - Ensure both devices are on the same WiFi network
   - Try restarting the Expo development server

4. **Android build errors:**
   - Update Android SDK and build tools
   - Clear Gradle cache: `cd android && ./gradlew clean`

### 📚 Learning Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage Guide](https://react-native-async-storage.github.io/async-storage/)

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### 📄 License

This project is licensed under the MIT License.

### 📞 Support

For support and questions:
- Email: support@mediorder.com
- Phone: +1 (555) 123-4567

---

## 🎯 Next Steps

After setting up the basic app, you can:

1. **Integrate with a real backend API**
2. **Add push notifications**
3. **Implement payment processing**
4. **Add more medicine categories**
5. **Enhance the UI with animations**
6. **Add prescription upload functionality**
7. **Implement location-based pharmacy finder**

Happy coding! 🚀