import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { Plus, Package, DollarSign, CreditCard as Edit3, Trash2, MoveVertical as MoreVertical, Upload, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProductCard = ({ product, onEdit, onDelete }: any) => (
  <View style={styles.productCard}>
    <View style={styles.productImageContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productStatus}>
        <View style={[styles.statusDot, { backgroundColor: product.available ? '#10B981' : '#EF4444' }]} />
      </View>
    </View>
    
    <View style={styles.productContent}>
      <View style={styles.productHeader}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <TouchableOpacity style={styles.productMenu}>
          <MoreVertical size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.productDescription} numberOfLines={2}>
        {product.description}
      </Text>
      
      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>${product.price}</Text>
        <View style={styles.productStats}>
          <Text style={styles.productSales}>{product.sales} sold</Text>
        </View>
      </View>
      
      <View style={styles.productActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(product)}>
          <Edit3 size={14} color="#FF5F5F" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(product)}>
          <Trash2 size={14} color="#EF4444" />
          <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function ShopScreen() {
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'digital',
  });

  const products = [
    {
      id: 1,
      title: 'Digital Art Pack - Landscapes',
      description: 'A collection of 25 high-resolution landscape artworks perfect for any project.',
      price: '29.99',
      sales: 47,
      available: true,
      image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Custom Portrait Commission',
      description: 'Personalized digital portrait artwork created just for you.',
      price: '99.99',
      sales: 23,
      available: true,
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'Art Tutorial Bundle',
      description: 'Complete video tutorial series covering digital painting techniques.',
      price: '49.99',
      sales: 78,
      available: false,
      image: 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      title: 'Printed Art Poster Set',
      description: 'High-quality prints of my most popular artworks, shipped worldwide.',
      price: '39.99',
      sales: 15,
      available: true,
      image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const handleAddProduct = () => {
    // Handle adding new product
    setAddProductVisible(false);
    setProductForm({ title: '', description: '', price: '', category: 'digital' });
  };

  const handleEdit = (product: any) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (product: any) => {
    console.log('Delete product:', product);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddProductVisible(true)}
        >
          <LinearGradient
            colors={['#FF5F5F', '#E53E3E']}
            style={styles.addButtonGradient}
          >
            <Plus size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Package size={20} color="#3B82F6" />
          <Text style={styles.statValue}>{products.length}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.statItem}>
          <DollarSign size={20} color="#10B981" />
          <Text style={styles.statValue}>$2,847</Text>
          <Text style={styles.statLabel}>Total Sales</Text>
        </View>
        <View style={styles.statItem}>
          <Package size={20} color="#F59E0B" />
          <Text style={styles.statValue}>163</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={addProductVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setAddProductVisible(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Product</Text>
            <TouchableOpacity onPress={handleAddProduct}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.uploadSection}>
              <TouchableOpacity style={styles.uploadButton}>
                <Upload size={24} color="#9CA3AF" />
                <Text style={styles.uploadText}>Upload Product Image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Product Title</Text>
              <TextInput
                style={styles.input}
                value={productForm.title}
                onChangeText={(text) => setProductForm(prev => ({ ...prev, title: text }))}
                placeholder="Enter product title"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={productForm.description}
                onChangeText={(text) => setProductForm(prev => ({ ...prev, description: text }))}
                placeholder="Describe your product"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={styles.input}
                value={productForm.price}
                onChangeText={(text) => setProductForm(prev => ({ ...prev, price: text }))}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryButtons}>
                {['digital', 'physical', 'commission'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      productForm.category === category && styles.categoryButtonSelected,
                    ]}
                    onPress={() => setProductForm(prev => ({ ...prev, category }))}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        productForm.category === category && styles.categoryButtonTextSelected,
                      ]}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
  },
  addButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
  },
  content: {
    flex: 1,
  },
  productGrid: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
  },
  productStatus: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  productContent: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
  },
  productMenu: {
    padding: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  productStats: {
    alignItems: 'flex-end',
  },
  productSales: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  productActions: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF5F5F',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5F5F',
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonSelected: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF5F5F',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#718096',
  },
  categoryButtonTextSelected: {
    color: '#FF5F5F',
    fontWeight: '600',
  },
});