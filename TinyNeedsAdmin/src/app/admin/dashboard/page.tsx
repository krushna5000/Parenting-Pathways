import { getMonthlyOrders } from '@/modules/orders/orders.actions';
import PageComponent from '@/modules/dashboard/dashboard-page';
import { getCategoryData } from '@/modules/categories/categories.actions';
import { getLatestUsers } from '@/modules/auth/auth.actions';

const Dashboard = async () => {
  const monthlyOrders = await getMonthlyOrders();
  const categoryData = await getCategoryData();
  const latestUsers = await getLatestUsers();

  return (
    <PageComponent
      latestUsers={latestUsers}
      monthlyOrders={monthlyOrders}
      categoryData={categoryData}
    />
  );
};

export default Dashboard;
