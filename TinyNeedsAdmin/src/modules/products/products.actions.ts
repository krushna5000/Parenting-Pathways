'use server';

import { AppError } from '@/errors/app-error';
import slugify from 'slugify';

import { createClient } from '@/db/supabase/server';
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from '@/modules/products/products.types';
import { CreateProductSchemaServer } from '@/modules/products/products.schema';
import { revalidatePath } from 'next/cache';

export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('product')
      .select('*, category:category(*)')
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new AppError(`
        Error fetching products with categories: ${error.message}`);
    }

    return data || [];
  };

export const createProduct = async ({
  category,
  heroImage,
  images,
  maxQuantity,
  price,
  title,
}: CreateProductSchemaServer) => {
  const supabase = await createClient();
  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from('product').insert({
    category,
    heroImage,
    imagesUrl: images,
    maxQuantity,
    price,
    slug,
    title,
  });

  if (error) {
    throw new AppError(`Error creating product: ${error.message}`);
  }

  revalidatePath('/admin/products');

  return data;
};

export const updateProduct = async ({
  category,
  heroImage,
  imagesUrl,
  maxQuantity,
  price,
  slug,
  title,
}: UpdateProductSchema) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('product')
    .update({
      category,
      heroImage,
      imagesUrl,
      maxQuantity,
      price,
      title,
    })
    .match({ slug });

  if (error) {
    throw new AppError(`Error updating product: ${error.message}`);
  }

  revalidatePath('/admin/products');

  return data;
};

export const deleteProduct = async (slug: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from('product').delete().match({ slug });

  if (error) {
    throw new AppError(`Error deleting product: ${error.message}`);
  }

  revalidatePath('/admin/products');
};
