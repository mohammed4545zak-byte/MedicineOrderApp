import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Exchange rate: 1 USD = 84.12 INR as of August 13, 2025 [2]
  const exchangeRate = 84.12;

  // Convert total from USD to INR
  const getTotalInINR = () => getTotal() * exchangeRate;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Add some medicines to your cart first');
      return;
    }

    setLoading(true);

    // Simulate checkout process
    setTimeout(async () => {
      try {
        // Create order
        const order = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          status: 'Pending',
          total: getTotalInINR(),
          items: items.length,
          medicines: items,
        };

        // Save to order history
        const existingOrders = await AsyncStorage.getItem('orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.unshift(order);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        clearCart();
        setLoading(false);
        Alert.alert(
          'Order Placed!',
          'Your order has been placed successfully. You can track it in the Orders tab.',
          [{ text: 'OK' }]
        );
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Failed to place order. Please try again.');
      }
    }, 2000);
  };

  const renderCartItem = (item: any) => (
    <View style={styles.cartItem} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>₹{(item.price * exchangeRate).toFixed(2)}</Text>
        {item.prescription && (
          <Text style={styles.prescriptionTag}>Prescription Required</Text>
        )}
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={20} color="#2196F3" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Cart</Text>
        </View>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>
            Add some medicines to get started
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearCart}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {items.map(renderCartItem)}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₹{getTotalInINR().toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, loading && styles.disabledButton]}
          onPress={handleCheckout}
          disabled={loading}
        >
          <Text style={styles.checkoutButtonText}>
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </Text>
        </TouchableOpacity>
      </View>
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
  clearCart: {
    color: '#FF4444',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  prescriptionTag: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    backgroundColor: '#E3F2FD',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
