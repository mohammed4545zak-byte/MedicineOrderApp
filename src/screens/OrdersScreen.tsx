import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  items: number;
  medicines?: any[];
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await AsyncStorage.getItem('orders');
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      } else {
        // Load sample orders if no real orders exist
        const sampleOrders = [
          { id: 1001, date: "2024-08-10", status: "Delivered", total: 45.50, items: 3 },
          { id: 1002, date: "2024-08-08", status: "Shipped", total: 23.99, items: 2 },
          { id: 1003, date: "2024-08-05", status: "Processing", total: 67.25, items: 4 },
          { id: 1004, date: "2024-08-02", status: "Pending", total: 19.99, items: 1 }
        ];
        setOrders(sampleOrders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Shipped':
        return '#2196F3';
      case 'Processing':
        return '#FF9800';
      case 'Pending':
        return '#9E9E9E';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'checkmark-circle';
      case 'Shipped':
        return 'car';
      case 'Processing':
        return 'time';
      case 'Pending':
        return 'hourglass';
      default:
        return 'information-circle';
    }
  };

  const renderOrder = (order: Order) => (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      onPress={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={styles.orderStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Ionicons
              name={getStatusIcon(order.status) as any}
              size={12}
              color="#6d3a3aff"
            />
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
          <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.itemCount}>{order.items} items</Text>
        <Ionicons
          name={expandedOrder === order.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </View>

      {expandedOrder === order.id && order.medicines && (
        <View style={styles.expandedContent}>
          <Text style={styles.medicinesTitle}>Medicines:</Text>
          {order.medicines.map((medicine: any, index: number) => (
            <View key={index} style={styles.medicineItem}>
              <Text style={styles.medicineName}>
                {medicine.name} x{medicine.quantity}
              </Text>
              <Text style={styles.medicinePrice}>
                ${(medicine.price * medicine.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
        </View>
        <View style={styles.emptyOrders}>
          <Ionicons name="receipt-outline" size={80} color="#CCC" />
          <Text style={styles.emptyOrdersText}>No orders yet</Text>
          <Text style={styles.emptyOrdersSubtext}>Your order history will appear here</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity onPress={loadOrders}>
          <Ionicons name="refresh" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.map(renderOrder)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  orderCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  medicinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  medicineName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  medicinePrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
  },
  emptyOrders: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyOrdersText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyOrdersSubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});