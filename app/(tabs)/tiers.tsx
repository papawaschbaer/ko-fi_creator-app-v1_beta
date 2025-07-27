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
} from 'react-native';
import { Plus, Crown, Users, DollarSign, CreditCard as Edit3, Trash2, X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TierCard = ({ tier, onEdit, onDelete }: any) => (
  <View style={[styles.tierCard, tier.featured && styles.featuredTier]}>
    {tier.featured && (
      <View style={styles.featuredBadge}>
        <Crown size={16} color="white" />
        <Text style={styles.featuredText}>Most Popular</Text>
      </View>
    )}
    
    <View style={styles.tierHeader}>
      <Text style={styles.tierTitle}>{tier.title}</Text>
      <Text style={styles.tierPrice}>${tier.price}<Text style={styles.tierPeriod}>/month</Text></Text>
    </View>
    
    <Text style={styles.tierDescription}>{tier.description}</Text>
    
    <View style={styles.tierBenefits}>
      {tier.benefits.map((benefit: string, index: number) => (
        <View key={index} style={styles.benefit}>
          <Check size={16} color="#10B981" />
          <Text style={styles.benefitText}>{benefit}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.tierStats}>
      <View style={styles.tierStat}>
        <Users size={16} color="#9CA3AF" />
        <Text style={styles.tierStatText}>{tier.subscribers} supporters</Text>
      </View>
      <View style={styles.tierStat}>
        <DollarSign size={16} color="#9CA3AF" />
        <Text style={styles.tierStatText}>${tier.monthlyRevenue}/month</Text>
      </View>
    </View>
    
    <View style={styles.tierActions}>
      <TouchableOpacity style={styles.tierActionButton} onPress={() => onEdit(tier)}>
        <Edit3 size={16} color="#FF5F5F" />
        <Text style={styles.tierActionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tierActionButton} onPress={() => onDelete(tier)}>
        <Trash2 size={16} color="#EF4444" />
        <Text style={[styles.tierActionText, { color: '#EF4444' }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function TiersScreen() {
  const [addTierVisible, setAddTierVisible] = useState(false);
  const [tierForm, setTierForm] = useState({
    title: '',
    description: '',
    price: '',
    benefits: [''],
  });

  const tiers = [
    {
      id: 1,
      title: 'Coffee Supporter',
      description: 'Support my work with a monthly coffee contribution',
      price: '5',
      subscribers: 89,
      monthlyRevenue: 445,
      featured: false,
      benefits: [
        'Access to supporter-only posts',
        'Monthly behind-the-scenes content',
        'Early access to new artwork',
      ],
    },
    {
      id: 2,
      title: 'Art Enthusiast',
      description: 'Get exclusive access to my creative process and tutorials',
      price: '15',
      subscribers: 34,
      monthlyRevenue: 510,
      featured: true,
      benefits: [
        'Everything from Coffee Supporter',
        'Exclusive video tutorials',
        'Monthly Q&A sessions',
        'High-res artwork downloads',
        'Custom wallpapers',
      ],
    },
    {
      id: 3,
      title: 'Studio Patron',
      description: 'Premium tier with personal interaction and exclusive content',
      price: '50',
      subscribers: 8,
      monthlyRevenue: 400,
      featured: false,
      benefits: [
        'Everything from Art Enthusiast',
        'Personal monthly video message',
        'Priority commission queue',
        'Custom artwork request',
        'Direct messaging access',
      ],
    },
  ];

  const handleAddTier = () => {
    // Handle adding new tier
    setAddTierVisible(false);
    setTierForm({ title: '', description: '', price: '', benefits: [''] });
  };

  const handleEdit = (tier: any) => {
    console.log('Edit tier:', tier);
  };

  const handleDelete = (tier: any) => {
    console.log('Delete tier:', tier);
  };

  const addBenefit = () => {
    setTierForm(prev => ({
      ...prev,
      benefits: [...prev.benefits, ''],
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setTierForm(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit),
    }));
  };

  const removeBenefit = (index: number) => {
    setTierForm(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const totalSubscribers = tiers.reduce((sum, tier) => sum + tier.subscribers, 0);
  const totalRevenue = tiers.reduce((sum, tier) => sum + tier.monthlyRevenue, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Membership Tiers</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setAddTierVisible(true)}
        >
          <LinearGradient
            colors={['#FF5F5F', '#E53E3E']}
            style={styles.addButtonGradient}
          >
            <Plus size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
          style={styles.summaryGradient}
        >
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Users size={20} color="white" />
              <Text style={styles.summaryValue}>{totalSubscribers}</Text>
              <Text style={styles.summaryLabel}>Total Supporters</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <DollarSign size={20} color="white" />
              <Text style={styles.summaryValue}>${totalRevenue}</Text>
              <Text style={styles.summaryLabel}>Monthly Revenue</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tiersList}>
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={addTierVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setAddTierVisible(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Tier</Text>
            <TouchableOpacity onPress={handleAddTier}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formSection}>
              <Text style={styles.label}>Tier Title</Text>
              <TextInput
                style={styles.input}
                value={tierForm.title}
                onChangeText={(text) => setTierForm(prev => ({ ...prev, title: text }))}
                placeholder="e.g., Coffee Supporter"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={tierForm.description}
                onChangeText={(text) => setTierForm(prev => ({ ...prev, description: text }))}
                placeholder="Describe what supporters get at this tier"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Monthly Price ($)</Text>
              <TextInput
                style={styles.input}
                value={tierForm.price}
                onChangeText={(text) => setTierForm(prev => ({ ...prev, price: text }))}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.formSection}>
              <View style={styles.benefitsHeader}>
                <Text style={styles.label}>Benefits</Text>
                <TouchableOpacity onPress={addBenefit} style={styles.addBenefitButton}>
                  <Plus size={16} color="#FF5F5F" />
                  <Text style={styles.addBenefitText}>Add Benefit</Text>
                </TouchableOpacity>
              </View>
              
              {tierForm.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitInput}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={benefit}
                    onChangeText={(text) => updateBenefit(index, text)}
                    placeholder="Enter a benefit"
                  />
                  {tierForm.benefits.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeBenefit(index)}
                      style={styles.removeBenefitButton}
                    >
                      <X size={16} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
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
  summaryCard: {
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 20,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  tiersList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  tierCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredTier: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  featuredBadge: {
    position: 'absolute',
    top: -1,
    left: 20,
    right: 20,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  tierHeader: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  tierTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8,
  },
  tierPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF5F5F',
  },
  tierPeriod: {
    fontSize: 16,
    color: '#718096',
  },
  tierDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  tierBenefits: {
    gap: 12,
    marginBottom: 20,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  tierStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 16,
  },
  tierStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tierStatText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tierActions: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  tierActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tierActionText: {
    fontSize: 14,
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
    height: 80,
    textAlignVertical: 'top',
  },
  benefitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addBenefitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addBenefitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5F5F',
  },
  benefitInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  removeBenefitButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});