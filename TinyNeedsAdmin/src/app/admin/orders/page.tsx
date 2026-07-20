import { getOrdersWithProducts } from '@/modules/orders/orders.actions';
import PageComponent from '@/modules/orders/orders-page';

const Orders = async () => {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts)
    return (
      <div className='text-center font-bold text-2xl'>No orders found</div>
    );

  return (
    <div>
      <PageComponent ordersWithProducts={ordersWithProducts} />
    </div>
  );
};

export default Orders;
