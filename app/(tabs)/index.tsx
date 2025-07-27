import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  DollarSign,
  Users,
  Heart,
  TrendingUp,
  Plus,
  Bell,
  Coffee,
} from 'lucide-react-native';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
        <Icon size={20} color={color} />
      </View>
      <Text style={styles.statChange}>{change}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const QuickAction = ({ title, subtitle, icon: Icon, onPress }: any) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={styles.quickActionContent}>
      <View style={styles.quickActionIcon}>
        <Icon size={24} color="#FF5F5F" />
      </View>
      <View style={styles.quickActionText}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.creatorName}>Creative Studio</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#374151" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
          
          <LinearGradient
            colors={['#FF5F5F', '#E53E3E']}
            style={styles.balanceCard}
          >
            <View style={styles.balanceContent}>
              <Coffee size={24} color="white" />
              <View style={styles.balanceText}>
                <Text style={styles.balanceLabel}>Total Earnings</Text>
                <Text style={styles.balanceAmount}>$2,847.50</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Monthly Supporters"
            value="124"
            change="+12%"
            icon={Users}
            color="#10B981"
          />
          <StatCard
            title="Total Tips"
            value="$418"
            change="+8%"
            icon={DollarSign}
            color="#3B82F6"
          />
          <StatCard
            title="Post Likes"
            value="1.2K"
            change="+23%"
            icon={Heart}
            color="#EF4444"
          />
          <StatCard
            title="Growth Rate"
            value="15.3%"
            change="+5.1%"
            icon={TrendingUp}
            color="#8B5CF6"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickAction
              title="Create Post"
              subtitle="Share your latest work"
              icon={Plus}
              onPress={() => {}}
            />
            <QuickAction
              title="Manage Shop"
              subtitle="Update your products"
              icon={Plus}
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { user: 'Alex Johnson', action: 'bought you a coffee', time: '2 min ago', amount: '$5.00' },
              { user: 'Sarah Chen', action: 'started supporting you', time: '1 hour ago', amount: '$10/month' },
              { user: 'Mike Davis', action: 'bought your artwork', time: '3 hours ago', amount: '$25.00' },
              { user: 'Emma Wilson', action: 'bought you a coffee', time: '5 hours ago', amount: '$3.00' },
            ].map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityAvatar}>
                  <Text style={styles.activityAvatarText}>
                    {activity.user.charAt(0)}
                  </Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.activityUser}>{activity.user}</Text> {activity.action}
                  </Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Text style={styles.activityAmount}>{activity.amount}</Text>
              </View>
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  creatorName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5F5F',
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  balanceText: {
    flex: 1,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#718096',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 16,
  },
  quickActions: {
    gap: 12,
  },
  quickAction: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5F5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  activityUser: {
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
});