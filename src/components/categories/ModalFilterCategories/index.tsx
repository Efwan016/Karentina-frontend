import React from 'react'
import { TCategory } from "@/components/categories/type"
import { getAllCategories } from "@/components/categories/actions"
import { TCity } from '@/components/cities/type'
import { getAllCities } from '@/components/cities/actions'
import FormFilterCategories from './Form'

type Props = {
  categorySlug: string
}

async function ModalFilterCategories({ categorySlug }: Props) {
  const { data: categories }: { data: TCategory[] } = await getAllCategories();
  const { data: cities }: { data: TCity[] } = await getAllCities();
  return (
    <FormFilterCategories
      categories={categories}
      cities={cities}
      categorySlug={categorySlug}
      citySlug=""
    />

  );
}

export default ModalFilterCategories;