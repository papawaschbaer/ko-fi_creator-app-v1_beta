import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { User, Mail, Bell, Shield, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3, Camera } from 'lucide-react-native';

const SettingItem = ({ icon: Icon, title, subtitle, onPress, hasChevron = true, rightElement }: any) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <View style={styles.settingIcon}>
        <Icon size={20} color="#FF5F5F" />
      </View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <View style={styles.settingRight}>
      {rightElement}
      {hasChevron && <ChevronRight size={20} color="#9CA3AF" />}
    </View>
  </TouchableOpacity>
);

const SettingSection = ({ title, children }: any) => (
  <View style={styles.settingSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout
            console.log('Logout');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <User size={32} color="#FF5F5F" />
              </View>
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Creative Studio</Text>
              <Text style={styles.profileEmail}>creator@example.com</Text>
              <TouchableOpacity style={styles.editProfileButton}>
                <Edit3 size={14} color="#FF5F5F" />
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <SettingSection title="Account">
          <SettingItem
            icon={User}
            title="Personal Information"
            subtitle="Update your profile details"
            onPress={() => console.log('Personal Info')}
          />
          <SettingItem
            icon={Mail}
            title="Email Settings"
            subtitle="Manage your email preferences"
            onPress={() => console.log('Email Settings')}
          />
          <SettingItem
            icon={Shield}
            title="Privacy & Security"
            subtitle="Password, two-factor authentication"
            onPress={() => console.log('Privacy')}
          />
        </SettingSection>

        {/* Creator Settings */}
        <SettingSection title="Creator Tools">
          <SettingItem
            icon={CreditCard}
            title="Payment Methods"
            subtitle="Manage your payout settings"
            onPress={() => console.log('Payments')}
          />
          <SettingItem
            icon={User}
            title="Profile Visibility"
            subtitle="Control who can see your profile"
            rightElement={
              <Switch
                value={profileVisible}
                onValueChange={setProfileVisible}
                trackColor={{ false: '#F3F4F6', true: '#FF5F5F' }}
                thumbColor={profileVisible ? 'white' : '#9CA3AF'}
              />
            }
            hasChevron={false}
            onPress={() => setProfileVisible(!profileVisible)}
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Get notified about new supporters"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#F3F4F6', true: '#FF5F5F' }}
                thumbColor={notifications ? 'white' : '#9CA3AF'}
              />
            }
            hasChevron={false}
            onPress={() => setNotifications(!notifications)}
          />
          <SettingItem
            icon={Mail}
            title="Email Updates"
            subtitle="Receive weekly summaries"
            rightElement={
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                trackColor={{ false: '#F3F4F6', true: '#FF5F5F' }}
                thumbColor={emailUpdates ? 'white' : '#9CA3AF'}
              />
            }
            hasChevron={false}
            onPress={() => setEmailUpdates(!emailUpdates)}
          />
        </SettingSection>

        {/* Support */}
        <SettingSection title="Support">
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => console.log('Help')}
          />
          <SettingItem
            icon={Mail}
            title="Contact Support"
            subtitle="Get in touch with our team"
            onPress={() => console.log('Contact')}
          />
        </SettingSection>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 24,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5F5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5F5F',
  },
  settingSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContent: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#718096',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});