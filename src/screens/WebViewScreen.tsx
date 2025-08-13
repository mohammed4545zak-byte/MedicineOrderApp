import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function WebViewScreen() {
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [webViewRef, setWebViewRef] = useState<WebView | null>(null);

  // Example pharmacy websites - you can replace with actual pharmacy URL
  const defaultUrl = 'https://www.cvs.com';

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    Alert.alert(
      'Connection Error',
      'Unable to load the pharmacy website. Please check your internet connection.',
      [{ text: 'OK' }]
    );
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Controls */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, !canGoBack && styles.disabledButton]}
          onPress={() => webViewRef?.goBack()}
          disabled={!canGoBack}
        >
          <Ionicons name="chevron-back" size={24} color={canGoBack ? "#2196F3" : "#CCC"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !canGoForward && styles.disabledButton]}
          onPress={() => webViewRef?.goForward()}
          disabled={!canGoForward}
        >
          <Ionicons name="chevron-forward" size={24} color={canGoForward ? "#2196F3" : "#CCC"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => webViewRef?.reload()}
        >
          <Ionicons name="refresh" size={24} color="#2196F3" />
        </TouchableOpacity>

        <View style={styles.urlContainer}>
          <Text style={styles.urlText}>Pharmacy Website</Text>
        </View>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading pharmacy website...</Text>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={setWebViewRef}
        source={{ uri: defaultUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        mixedContentMode="compatibility"
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
      />

      {/* Information Banner */}
      <View style={styles.infoBanner}>
        <Ionicons name="information-circle" size={16} color="#2196F3" />
        <Text style={styles.infoText}>
          This is a demo integration with pharmacy websites
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  navButton: {
    padding: 8,
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  urlContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  urlText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  webview: {
    flex: 1,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#1976D2',
  },
});