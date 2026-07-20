import { AppError } from '../../errors/app-error';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/auth-provider';

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
      if (error) throw new AppError('Error fetching user profile: ' + error.message);
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
      if (error) throw new AppError('Error updating user address: ' + error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
  });
};
