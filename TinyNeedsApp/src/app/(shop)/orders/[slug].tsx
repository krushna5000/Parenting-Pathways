import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';

import { ORDERS } from '../../../../assets/orders';
import { getMyOrder } from '../../../api/api';
import { format } from 'date-fns';

const OrderDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data: order, error, isLoading } = getMyOrder(slug);

  if (isLoading) return <ActivityIndicator />;

  if (error || !order) return <Text>Error: {error?.message}</Text>;

  const orderItems = order.order_items.map((orderItem: any) => {
    return {
      id: orderItem.id,
      title: orderItem.products.title,
      heroImage: orderItem.products.heroImage,
      price: orderItem.products.price,
      quantity: orderItem.quantity,
    };
  });

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: `${order.slug}` }} />

      <Text style={styles.item}>{order.slug}</Text>
      <Text style={styles.details}>{order.description}</Text>
      <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
      <Text style={styles.date}>
        {format(new Date(order.created_at), 'MMM dd, yyyy')}
      </Text>

      {/* Contact Details Section */}
      {order.contact_full_name && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{order.contact_full_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{order.contact_phone}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{order.contact_email}</Text>
          </View>
          {order.contact_alternate_phone && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Alternate Phone:</Text>
              <Text style={styles.infoValue}>{order.contact_alternate_phone}</Text>
            </View>
          )}
        </View>
      )}

      {/* Shipping Address Section */}
      {order.shipping_address_line1 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>
              {order.shipping_address_line1}
              {order.shipping_address_line2 && `\n${order.shipping_address_line2}`}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>City:</Text>
            <Text style={styles.infoValue}>{order.shipping_city}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>State:</Text>
            <Text style={styles.infoValue}>{order.shipping_state}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>District:</Text>
            <Text style={styles.infoValue}>{order.shipping_district}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Taluka:</Text>
            <Text style={styles.infoValue}>{order.shipping_taluka}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Pincode:</Text>
            <Text style={styles.infoValue}>{order.shipping_pincode}</Text>
          </View>
        </View>
      )}

      <Text style={styles.itemsTitle}>Items Ordered:</Text>
      <FlatList
        data={orderItems}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={{ uri: item.heroImage }} style={styles.heroImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>Price: Rs {item.price}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
    <View style={styles.stickyFooter}>
      <TouchableOpacity
        style={[styles.stickyTrackButton, !order.tracking_url && styles.stickyTrackButtonDisabled]}
        onPress={async () => {
          try {
            const url = order.tracking_url;
            if (!url || !url.trim()) {
              Alert.alert('Tracking not available', 'No tracking URL has been added yet.');
              return;
            }
            const supported = await Linking.canOpenURL(url);
            if (supported) await Linking.openURL(url);
            else Alert.alert('Invalid URL', 'Cannot open the tracking URL.');
          } catch (e) {
            Alert.alert('Error', 'Failed to open the tracking URL.');
          }
        }}
        disabled={!order.tracking_url}
      >
        <Text style={styles.stickyTrackButtonText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default OrderDetails;

const styles: { [key: string]: any } = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 96,
  },
  item: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusBadge_Pending: {
    backgroundColor: 'orange',
  },
  statusBadge_Completed: {
    backgroundColor: 'green',
  },
  statusBadge_Shipped: {
    backgroundColor: 'blue',
  },
  statusBadge_InTransit: {
    backgroundColor: 'purple',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 16,
  },
  section: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  stickyFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
    padding: 12,
  },
  stickyTrackButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  stickyTrackButtonDisabled: {
    backgroundColor: '#aaa',
  },
  stickyTrackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 12,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: 260,
  },
  heroImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
  },
  itemQuantity: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});
