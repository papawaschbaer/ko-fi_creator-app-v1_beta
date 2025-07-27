import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Plus, Search, Filter, CreditCard as Edit3, Trash2, Calendar, Eye, Heart, MessageCircle, MoveVertical as MoreVertical } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PostCard = ({ post, onEdit, onDelete, onSchedule }: any) => (
  <View style={styles.postCard}>
    <View style={styles.postHeader}>
      <View style={styles.postMeta}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDate}>{post.date}</Text>
      </View>
      <View style={styles.postStatus}>
        <View style={[styles.statusBadge, { backgroundColor: post.status === 'published' ? '#10B981' : post.status === 'scheduled' ? '#F59E0B' : '#6B7280' }]}>
          <Text style={styles.statusText}>{post.status}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
    
    <Text style={styles.postExcerpt} numberOfLines={2}>
      {post.excerpt}
    </Text>
    
    <View style={styles.postStats}>
      <View style={styles.stat}>
        <Eye size={16} color="#9CA3AF" />
        <Text style={styles.statText}>{post.views}</Text>
      </View>
      <View style={styles.stat}>
        <Heart size={16} color="#9CA3AF" />
        <Text style={styles.statText}>{post.likes}</Text>
      </View>
      <View style={styles.stat}>
        <MessageCircle size={16} color="#9CA3AF" />
        <Text style={styles.statText}>{post.comments}</Text>
      </View>
    </View>
    
    <View style={styles.postActions}>
      <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(post)}>
        <Edit3 size={16} color="#FF5F5F" />
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => onSchedule(post)}>
        <Calendar size={16} color="#3B82F6" />
        <Text style={[styles.actionText, { color: '#3B82F6' }]}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(post)}>
        <Trash2 size={16} color="#EF4444" />
        <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function PostsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'New Digital Art Collection',
      excerpt: 'Excited to share my latest digital art collection featuring vibrant landscapes and abstract compositions...',
      date: '2 hours ago',
      status: 'published',
      views: '1.2K',
      likes: '89',
      comments: '24',
    },
    {
      id: 2,
      title: 'Behind the Scenes: My Creative Process',
      excerpt: 'Take a peek into my studio and see how I create my artwork from initial sketch to final piece...',
      date: '1 day ago',
      status: 'scheduled',
      views: '856',
      likes: '67',
      comments: '18',
    },
    {
      id: 3,
      title: 'Commission Work Update',
      excerpt: 'Working on some exciting commission pieces for clients. Here\'s a sneak peek at the progress...',
      date: '3 days ago',
      status: 'draft',
      views: '0',
      likes: '0',
      comments: '0',
    },
    {
      id: 4,
      title: 'Art Tutorial: Digital Painting Basics',
      excerpt: 'A comprehensive guide for beginners who want to start their digital painting journey...',
      date: '1 week ago',
      status: 'published',
      views: '3.4K',
      likes: '156',
      comments: '42',
    },
  ];

  const handleEdit = (post: any) => {
    console.log('Edit post:', post);
  };

  const handleDelete = (post: any) => {
    console.log('Delete post:', post);
  };

  const handleSchedule = (post: any) => {
    console.log('Schedule post:', post);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || post.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableOpacity style={styles.createButton}>
          <LinearGradient
            colors={['#FF5F5F', '#E53E3E']}
            style={styles.createButtonGradient}
          >
            <Plus size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Filter size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.postsList}>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSchedule={handleSchedule}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <Text style={styles.filterTitle}>Filter Posts</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'all', label: 'All Posts' },
                { key: 'published', label: 'Published' },
                { key: 'scheduled', label: 'Scheduled' },
                { key: 'draft', label: 'Drafts' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterOption,
                    selectedFilter === option.key && styles.filterOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedFilter(option.key);
                    setFilterVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilter === option.key && styles.filterOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
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
  createButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  createButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  postsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postMeta: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  moreButton: {
    padding: 4,
  },
  postExcerpt: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 16,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterOptions: {
    gap: 12,
  },
  filterOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterOptionSelected: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF5F5F',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  filterOptionTextSelected: {
    color: '#FF5F5F',
    fontWeight: '600',
  },
});