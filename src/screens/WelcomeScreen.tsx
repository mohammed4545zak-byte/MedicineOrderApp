import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>💊</Text>
          </View>
          <Text style={styles.appName}>MediOrder</Text>
          <Text style={styles.tagline}>Your Health, Our Priority</Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🚚</Text>
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🩺</Text>
            <Text style={styles.featureText}>Verified Medicines</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>Secure & Safe</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Signup' as never)}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});