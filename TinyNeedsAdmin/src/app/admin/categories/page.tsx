import { getCategoriesWithProducts } from '@/modules/categories/categories.actions';
import CategoryPageComponent from '@/modules/categories/categories-page';

export default async function Categories() {
  const categories = await getCategoriesWithProducts();

  return <CategoryPageComponent categories={categories} />;
}
