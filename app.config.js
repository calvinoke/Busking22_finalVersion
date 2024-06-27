// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Busking22',
    slug: 'Busking22',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      eas: {
        projectId: '98e2adf9-3416-44f4-81e5-5923ca4b00f3'
      },
      apiUrl: process.env.EXPO_PUBLIC_API_URL
    }
  }
};
