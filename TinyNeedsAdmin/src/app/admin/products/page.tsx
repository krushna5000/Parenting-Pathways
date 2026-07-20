import { getCategoriesWithProducts } from '@/modules/categories/categories.actions';
import { getProductsWithCategories } from '@/modules/products/products.actions';
import { ProductPageComponent } from '@/modules/products/products-page';

export default async function Products() {
  const categories = await getCategoriesWithProducts();
  const productsWithCategories = await getProductsWithCategories();

  return (
    <ProductPageComponent
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  );
}
