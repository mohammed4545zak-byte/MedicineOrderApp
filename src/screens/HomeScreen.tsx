import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { MEDICINE_CATEGORIES, SAMPLE_MEDICINES } from '../services/SampleMedicines';
import { useCart, Medicine } from '../contexts/CartContext';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addToCart, getItemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Exchange rate: 1 USD = 84.12 INR as of August 13, 2025
  const exchangeRate = 84.12;

  const filteredMedicines = SAMPLE_MEDICINES.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (medicine: Medicine) => {
    if (!medicine.inStock) {
      Alert.alert('Out of Stock', 'This medicine is currently out of stock');
      return;
    }
    addToCart(medicine);
    Alert.alert(
      'Added to Cart ✅',
      `${medicine.name} has been added to your cart`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const renderMedicineCard = ({ item }: { item: Medicine }) => {
    return (
      <TouchableOpacity
        style={[styles.medicineCard, !item.inStock && styles.outOfStockCard]}
        onPress={() => navigation.navigate('MedicineDetail', { medicine: item })}
        activeOpacity={0.8}
      >
        {!item.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockBadgeText}>Out of Stock</Text>
          </View>
        )}
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.medicineImage}
            resizeMode="cover"
          />
          {item.prescription && (
            <View style={styles.prescriptionBadge}>
              <Ionicons name="medical" size={12} color="#FF9800" />
            </View>
          )}
        </View>
        
        <View style={styles.medicineInfo}>
          <Text style={styles.medicineName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.medicineCategory}>{item.category}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.medicinePrice}>
              ₹{(item.price * exchangeRate).toFixed(0)}
            </Text>
            <TouchableOpacity
              style={[styles.addButton, !item.inStock && styles.addButtonDisabled]}
              onPress={() => handleAddToCart(item)}
              disabled={!item.inStock}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={!item.inStock ? "ban" : "add"} 
                size={18} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.categoryCard, selectedCategory === item.name && styles.selectedCategoryCard]}
      onPress={() => setSelectedCategory(item.name)}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIconContainer, selectedCategory === item.name && styles.selectedIconContainer]}>
        <Ionicons 
          name={item.icon} 
          size={28} 
          color={selectedCategory === item.name ? '#FFFFFF' : '#2196F3'} 
        />
      </View>
      <Text style={[styles.categoryName, selectedCategory === item.name && styles.selectedCategoryName]}>
        {item.name}
      </Text>
      <Text style={[styles.categoryCount, selectedCategory === item.name && styles.selectedCategoryCount]}>
        {item.count} items
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Good Morning! 👋</Text>
          <Text style={styles.subtitle}>Find your medicines quickly</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.7}
        >
          <View style={styles.cartIconContainer}>
            <Ionicons name="basket-outline" size={24} color="#2196F3" />
            {getItemCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getItemCount()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Enhanced Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines, brands..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => setSelectedCategory('all')}>
              <Text style={styles.seeAll}>
                {selectedCategory === 'all' ? 'All Selected' : 'View All'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={MEDICINE_CATEGORIES}
            renderItem={renderCategoryCard}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        {/* Medicines Section */}
        <View style={styles.medicinesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'All Medicines' : selectedCategory}
            </Text>
            <Text style={styles.resultsCount}>
              {filteredMedicines.length} found
            </Text>
          </View>
          
          {filteredMedicines.length === 0 ? (
            <View style={styles.noResults}>
              <View style={styles.noResultsIconContainer}>
                <Ionicons name="search-outline" size={48} color="#E0E0E0" />
              </View>
              <Text style={styles.noResultsText}>No medicines found</Text>
              <Text style={styles.noResultsSubtext}>
                Try adjusting your search or browse categories
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMedicines}
              renderItem={renderMedicineCard}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.medicinesList}
              columnWrapperStyle={styles.medicineRow}
            />
          )}
        </View>
        
        {/* Enhanced WebView Button */}
        <TouchableOpacity 
          style={styles.webViewButton} 
          onPress={() => navigation.navigate('WebView')}
          activeOpacity={0.8}
        >
          <View style={styles.webViewIconContainer}>
            <Ionicons name="globe-outline" size={22} color="#2196F3" />
          </View>
          <View style={styles.webViewTextContainer}>
            <Text style={styles.webViewButtonText}>Browse Full Catalog</Text>
            <Text style={styles.webViewButtonSubtext}>Explore our complete pharmacy</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#2196F3" />
        </TouchableOpacity>
        
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '400',
  },
  cartButton: {
    padding: 8,
  },
  cartIconContainer: {
    position: 'relative',
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 16,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1E293B',
  },
  clearButton: {
    padding: 4,
  },
  categoriesSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAll: {
    color: '#2196F3',
    fontSize: 15,
    fontWeight: '600',
  },
  resultsCount: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryCard: {
    backgroundColor: '#2196F3',
    borderColor: '#1976D2',
    shadowColor: '#2196F3',
    shadowOpacity: 0.25,
    elevation: 4,
  },
  categoryIconContainer: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  selectedCategoryName: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  selectedCategoryCount: {
    color: '#E3F2FD',
  },
  medicinesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  medicinesList: {
    marginTop: 16,
  },
  medicineRow: {
    justifyContent: 'space-between',
  },
  medicineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    margin: 6,
    flex: 1,
    maxWidth: '48%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  outOfStockCard: {
    opacity: 0.6,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },
  outOfStockBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  medicineImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  prescriptionBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    lineHeight: 20,
  },
  medicineCategory: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicinePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  noResultsIconContainer: {
    backgroundColor: '#F8FAFC',
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  webViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  webViewIconContainer: {
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  webViewTextContainer: {
    flex: 1,
  },
  webViewButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  webViewButtonSubtext: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 24,
  },
});
