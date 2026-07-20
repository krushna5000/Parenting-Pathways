'use server';

import { AppError } from '@/errors/app-error';
import slugify from 'slugify';

import { CategoriesWithProductsResponse } from '@/modules/categories/categories.types';
import {
  CreateCategorySchemaServer,
  UpdateCategorySchema,
} from '@/modules/categories/categories.schema';
import { createClient } from '@/db/supabase/server';
import { revalidatePath } from 'next/cache';

export const getCategoriesWithProducts =
  async (): Promise<CategoriesWithProductsResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('category')
      .select('* , products:product(*)')
      .returns<CategoriesWithProductsResponse>();

    if (error) throw new AppError(`Error fetching categories: ${error.message}`);

    return data || [];
  };

export const imageUploadHandler = async (formData: FormData) => {
  const supabase = await createClient();
  if (!formData) return;

  const fileEntry = formData.get('file');

  if (!(fileEntry instanceof File)) throw new AppError('Expected a file');

  const fileName = fileEntry.name;

  try {
    const { data, error } = await supabase.storage
      .from('app-images')
      .upload(fileName, fileEntry, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw new AppError('Error uploading image');
    }

    const {
      data: { publicUrl },
    } = await supabase.storage.from('app-images').getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new AppError('Error uploading image');
  }
};

export const createCategory = async ({
  imageUrl,
  name,
}: CreateCategorySchemaServer) => {
  const supabase = await createClient();
  const slug = slugify(name, { lower: true });

  const { data, error } = await supabase.from('category').insert({
    name,
    imageUrl,
    slug,
  });

  if (error) throw new AppError(`Error creating category: ${error.message}`);

  revalidatePath('/admin/categories');

  return data;
};

export const updateCategory = async ({
  imageUrl,
  name,
  slug,
}: UpdateCategorySchema) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('category')
    .update({ name, imageUrl })
    .match({ slug });

  if (error) throw new AppError(`Error updating category: ${error.message}`);

  revalidatePath('/admin/categories');

  return data;
};

export const deleteCategory = async (id: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from('category').delete().match({ id });

  if (error) throw new AppError(`Error deleting category: ${error.message}`);

  revalidatePath('/admin/categories');
};

export const getCategoryData = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('category')
    .select('name, products:product(id)');

  if (error) throw new AppError(`Error fetching category data: ${error.message}`);

  const categoryData = data.map(
    (category: { name: string; products: { id: number }[] }) => ({
      name: category.name,
      products: category.products.length,
    })
  );

  return categoryData;
};
