import { Link } from 'expo-router';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useCartStore } from '../store/cart-store';
import { supabase } from '../lib/supabase';
import { Tables } from '../types/database.types';

export const ListHeader = ({
  categories,
}: {
  categories: Tables<'category'>[];
}) => {
  const { getItemCount } = useCartStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'data:image/jpeg;base64,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' }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hello Parents</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href='/cart' asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name='shopping-cart'
                    size={25}
                    color='gray'
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />

                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            <FontAwesome name='sign-out' size={25} color='red' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require('../../assets/images/hero.png')}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={item => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: '100%',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: 10,
    backgroundColor: '#1BC464',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
