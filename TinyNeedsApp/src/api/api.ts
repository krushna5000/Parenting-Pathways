import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/auth-provider';
import { generateOrderSlug } from '../utils/utils';
import { Tables, TablesInsert, TablesUpdate } from '../types/database.types';

export const getProductsAndCategories = () => {
  return useQuery({
    queryKey: ['products', 'categories'],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        supabase.from('product').select('*'),
        supabase.from('category').select('*'),
      ]);

      if (products.error || categories.error) {
        throw new Error('An error occurred while fetching data');
      }

      return { products: products.data, categories: categories.data };
    },
  });
};

export const getProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        throw new Error(
          'An error occurred while fetching data: ' + error?.message
        );
      }

      return data;
    },
  });
};

export const getCategoryAndProducts = (categorySlug: string) => {
  return useQuery({
    queryKey: ['categoryAndProducts', categorySlug],
    queryFn: async () => {
      const { data: category, error: categoryError } = await supabase
        .from('category')
        .select('*')
        .eq('slug', categorySlug)
        .single();

      if (categoryError || !category) {
        throw new Error('An error occurred while fetching category data');
      }

      const { data: products, error: productsError } = await supabase
        .from('product')
        .select('*')
        .eq('category', category.id);

      if (productsError) {
        throw new Error('An error occurred while fetching products data');
      }

      return { category, products };
    },
  });
};

export const getMyOrders = () => {
  const {
    user: { id },
  } = useAuth();

  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user', id);

      if (error)
        throw new Error(
          'An error occurred while fetching orders: ' + error.message
        );

      return data;
    },
  });
};

export const createOrder = () => {
  const {
    user: { id },
  } = useAuth();

  const slug = generateOrderSlug();

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ 
      totalPrice, 
      shippingAddress, 
      contactDetails 
    }: { 
      totalPrice: number;
      shippingAddress?: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        district: string;
        taluka: string;
        pincode: string;
      };
      contactDetails?: {
        fullName: string;
        phone: string;
        email: string;
        alternatePhone?: string;
      };
    }) {
      const { data, error } = await supabase
        .from('order')
        .insert({
          totalPrice,
          slug,
          user: id,
          status: 'Pending',
          // Shipping address columns
          shipping_address_line1: shippingAddress?.addressLine1,
          shipping_address_line2: shippingAddress?.addressLine2,
          shipping_city: shippingAddress?.city,
          shipping_state: shippingAddress?.state,
          shipping_district: shippingAddress?.district,
          shipping_taluka: shippingAddress?.taluka,
          shipping_pincode: shippingAddress?.pincode,
          // Contact details columns
          contact_full_name: contactDetails?.fullName,
          contact_phone: contactDetails?.phone,
          contact_email: contactDetails?.email,
          contact_alternate_phone: contactDetails?.alternatePhone,
        })
        .select('*')
        .single();

      if (error)
        throw new Error(
          'An error occurred while creating order: ' + error.message
        );

      return data;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};

export const createOrderItem = () => {
  return useMutation({
    async mutationFn(
      insertData: {
        orderId: number;
        productId: number;
        quantity: number;
      }[]
    ) {
      const { data, error } = await supabase
        .from('order_item')
        .insert(
          insertData.map(({ orderId, quantity, productId }) => ({
            order: orderId,
            product: productId,
            quantity,
          }))
        )
        .select('*');

      const productQuantities = insertData.reduce(
        (acc, { productId, quantity }) => {
          if (!acc[productId]) {
            acc[productId] = 0;
          }
          acc[productId] += quantity;
          return acc;
        },
        {} as Record<number, number>
      );

      await Promise.all(
        Object.entries(productQuantities).map(
          async ([productId, totalQuantity]) =>
            supabase.rpc('decrement_product_quantity', {
              product_id: Number(productId),
              quantity: totalQuantity,
            })
        )
      );

      if (error)
        throw new Error(
          'An error occurred while creating order item: ' + error.message
        );

      return data;
    },
  });
};

export const getMyOrder = (slug: string) => {
  const {
    user: { id },
  } = useAuth();

  return useQuery({
    queryKey: ['orders', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order')
        .select('*, order_items:order_item(*, products:product(*))')
        .eq('slug', slug)
        .eq('user', id)
        .maybeSingle();

      if (error)
        throw new Error(
          'An error occurred while fetching data: ' + error.message
        );

      if (!data)
        throw new Error('Order not found');

      return data;
    },
  });
};

export const getMyProfile = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw new Error('Error fetching user profile: ' + error.message);
      return data;
    },
    enabled: !!user?.id,
  });
};

export const updateMyAddress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (address: {
      address_line1: string;
      address_line2?: string;
      city: string;
      state: string;
      district: string;
      taluka: string;
      pincode: string;
    }) => {
      const { data, error } = await supabase
        .from('users')
        .update(address)
        .eq('id', user.id)
        .select('*')
        .single();
      if (error) throw new Error('Error updating user address: ' + error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
  });
};
