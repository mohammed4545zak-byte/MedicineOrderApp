import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart, Medicine } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

export default function MedicineDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // @ts-ignore
  const medicine: Medicine = route.params?.medicine;

  // Sample multiple images for tablets (front, back, packaging) - replace with actual data
  const tabletImages = medicine.image
    ? [
        medicine.image, // Original image
        'https://pixabay.com/photos/pill-medicine-tablet-medical-4897529/', // Sample front view [3]
        'https://example.com/tablet-back.jpg', // Sample back view [3]
        'https://example.com/tablet-packaging.jpg', // Sample packaging [3]
      ]
    : ['https://example.com/placeholder-tablet.jpg']; // Fallback placeholder [3]

  if (!medicine) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Medicine not found</Text>
      </SafeAreaView>
    );
  }

  // Exchange rate: 1 USD = 84.12 INR as of August 12, 2025 [1][2]
  const exchangeRate = 84.12;
  const priceInINR = medicine.price * exchangeRate;
  const totalInINR = priceInINR * quantity;

  const handleAddToCart = () => {
    if (!medicine.inStock) {
      Alert.alert('Out of Stock', 'This medicine is currently out of stock');
      return;
    }

    addToCart(medicine, quantity);
    Alert.alert(
      'Added to Cart',
      `${quantity} x ${medicine.name} has been added to your cart`,
      [
        { text: 'Continue Shopping', onPress: () => navigation.goBack() },
        { text: 'View Cart', onPress: () => navigation.navigate('Cart' as never) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {!medicine.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {tabletImages.map((imgUri, index) => (
              <Image key={index} source={{ uri: imgUri }} style={styles.medicineImage} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.medicineName}>{medicine.name}</Text>
              <Text style={styles.category}>{medicine.category}</Text>
              <Text style={styles.manufacturer}>by {medicine.manufacturer}</Text>
            </View>
            <Text style={styles.price}>₹{priceInINR.toFixed(2)}</Text>
          </View>

          {medicine.prescription && (
            <View style={styles.prescriptionNotice}>
              <Ionicons name="warning-outline" size={20} color="#F57C00" />
              <Text style={styles.prescriptionText}>
                Prescription Required - This medicine requires a valid prescription
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{medicine.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category:</Text>
              <Text style={styles.infoValue}>{medicine.category}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Manufacturer:</Text>
              <Text style={styles.infoValue}>{medicine.manufacturer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Prescription:</Text>
              <Text style={styles.infoValue}>{medicine.prescription ? 'Required' : 'Not Required'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Availability:</Text>
              <Text style={styles.infoValue}>{medicine.inStock ? 'In Stock' : 'Out of Stock'}</Text>
            </View>
          </View>

          {medicine.inStock && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <Ionicons name="remove" size={24} color="#2196F3" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
                  <Ionicons name="add" size={24} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {medicine.inStock && (
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>₹{totalInINR.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
  },
  medicineImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  medicineName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  manufacturer: {
    fontSize: 14,
    color: '#999',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  prescriptionNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  prescriptionText: {
    flex: 1,
    marginLeft: 8,
    color: '#F57C00',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#E3F2FD',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  addToCartButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
