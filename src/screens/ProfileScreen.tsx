import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const profileOptions = [
    { 
      title: 'Personal Information', 
      icon: 'person-outline', 
      onPress: () => Alert.alert('Feature Coming Soon', 'Edit profile feature will be available soon') 
    },
    { 
      title: 'Address Book', 
      icon: 'location-outline', 
      onPress: () => Alert.alert('Feature Coming Soon', 'Address management feature will be available soon') 
    },
    { 
      title: 'Payment Methods', 
      icon: 'card-outline', 
      onPress: () => Alert.alert('Feature Coming Soon', 'Payment methods feature will be available soon') 
    },
    { 
      title: 'Prescription History', 
      icon: 'document-text-outline', 
      onPress: () => Alert.alert('Feature Coming Soon', 'Prescription history feature will be available soon') 
    },
    { 
      title: 'Notifications', 
      icon: 'notifications-outline', 
      onPress: () => Alert.alert('Feature Coming Soon', 'Notification settings feature will be available soon') 
    },
    { 
      title: 'Help & Support', 
      icon: 'help-circle-outline', 
      onPress: () => Alert.alert('Help & Support', 'Contact us at support@mediorder.com or call +1 (555) 123-4567') 
    },
    { 
      title: 'About', 
      icon: 'information-circle-outline', 
      onPress: () => Alert.alert('About MediOrder', 'Version 1.0.0\n\nYour trusted medicine ordering app.') 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'No email'}</Text>
            {user?.phone && <Text style={styles.userPhone}>{user.phone}</Text>}
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <View style={styles.optionLeft}>
                <Ionicons name={option.icon as any} size={24} color="#666" />
                <Text style={styles.optionTitle}>{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>MediOrder v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 MediOrder. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    padding: 8,
  },
  optionsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 30,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#CCC',
  },
});