import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Link, Stack } from 'expo-router';
import { format } from 'date-fns';

import { Tables } from '../../../types/database.types';
import { getMyOrders } from '../../../api/api';

const openTracking = async (url?: string | null) => {
  try {
    if (!url || !url.trim()) {
      Alert.alert('Tracking not available', 'No tracking URL has been added yet.');
      return;
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Invalid URL', 'Cannot open the tracking URL.');
    }
  } catch (e) {
    Alert.alert('Error', 'Failed to open the tracking URL.');
  }
};

const renderItem: ListRenderItem<Tables<'order'>> = ({ item }) => (
  <Link href={`/orders/${item.slug}`} asChild>
    <Pressable style={styles.orderContainer}>
      <View style={styles.orderContent}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderItem}>{item.slug}</Text>
          <Text style={styles.orderDetails}>{item.description}</Text>
          <Text style={styles.orderDate}>
            {format(new Date(item.created_at), 'MMM dd, yyyy')}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
          <TouchableOpacity
            style={[styles.trackButton, !item.tracking_url && styles.trackButtonDisabled]}
            onPress={() => openTracking(item.tracking_url)}
            disabled={!item.tracking_url}
          >
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  </Link>
);

const Orders = () => {
  const { data: orders, error, isLoading } = getMyOrders();

  if (isLoading) return <ActivityIndicator />;

  if (error || !orders) return <Text>Error: {error?.message}</Text>;

  if (!orders.length)
    return (
      <Text
        style={{
          fontSize: 16,
          color: '#555',
          textAlign: 'center',
          padding: 10,
        }}
      >
        No orders created yet
      </Text>
    );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  trackButton: {
    marginTop: 8,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  trackButtonDisabled: {
    backgroundColor: '#aaa',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusBadge_Pending: {
    backgroundColor: '#ffcc00',
  },
  statusBadge_Completed: {
    backgroundColor: '#4caf50',
  },
  statusBadge_Shipped: {
    backgroundColor: '#2196f3',
  },
  statusBadge_InTransit: {
    backgroundColor: '#ff9800',
  },
});
