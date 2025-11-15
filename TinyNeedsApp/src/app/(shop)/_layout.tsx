import { Tabs } from 'expo-router';
import { ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { useAuth } from '../../providers/auth-provider';
import TabBarIcon from '../../components/tab-bar-icon';

const styles = {
  safeArea: {
    flex: 1,
  },
};

const TabsLayout = () => {
  const { session, mounting } = useAuth();

  if (mounting) return <ActivityIndicator />;
  if (!session) return <Redirect href='/auth' />;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1BC464',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 8,
            paddingBottom: Platform.OS === 'ios' ? 16 : 10,
            height: Platform.OS === 'ios' ? 70 : 64,
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
          tabBarHideOnKeyboard: false,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Shop',
            tabBarIcon({ color }) {
              return <TabBarIcon name='shopping-cart' color={color} size={26} />;
            },
          }}
        />
        <Tabs.Screen
          name='orders'
          options={{
            title: 'Orders',
            tabBarIcon({ color }) {
              return <TabBarIcon name='book' color={color} size={26} />;
            },
          }}
        />
        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings',
            tabBarIcon({ color }) {
              return <TabBarIcon name='cog' color={color} size={26} />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
