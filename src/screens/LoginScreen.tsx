import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation<any>(); // Fixed typing for navigation
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // CAPTCHA states
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaCorrect, setCaptchaCorrect] = useState(false);

  // Generate random CAPTCHA numbers on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);
    setCaptchaAnswer('');
    setCaptchaCorrect(false);
  };

  const checkCaptcha = (answer: string) => {
    setCaptchaAnswer(answer);
    const userAnswer = parseInt(answer);
    const correctAnswer = captchaNum1 + captchaNum2;
    setCaptchaCorrect(!isNaN(userAnswer) && userAnswer === correctAnswer);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!captchaCorrect) {
      Alert.alert('Error', 'Please solve the CAPTCHA correctly');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (!success) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* CAPTCHA Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CAPTCHA: What is {captchaNum1} + {captchaNum2}?</Text>
            <View style={styles.captchaContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.captchaInput,
                  captchaAnswer && (captchaCorrect ? styles.correctInput : styles.incorrectInput),
                ]}
                value={captchaAnswer}
                onChangeText={checkCaptcha}
                placeholder="Enter the sum"
                keyboardType="numeric"
                maxLength={3}
              />
              <TouchableOpacity
                onPress={generateCaptcha}
                style={styles.refreshButton}
                accessibilityLabel="Refresh CAPTCHA"
              >
                <Text style={styles.refreshButtonText}>🔄</Text>
              </TouchableOpacity>
              {captchaAnswer && (
                <Text style={captchaCorrect ? styles.correctText : styles.incorrectText}>
                  {captchaCorrect ? '✅ Correct' : '❌ Incorrect'}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#2196F3" />
          ) : (
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          )}

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captchaInput: {
    flex: 1,
    marginRight: 10,
  },
  correctInput: {
    borderColor: 'green',
  },
  incorrectInput: {
    borderColor: 'red',
  },
  refreshButton: {
    padding: 10,
  },
  refreshButtonText: {
    fontSize: 20,
  },
  correctText: {
    color: 'green',
    fontSize: 14,
    marginLeft: 10,
  },
  incorrectText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
});
