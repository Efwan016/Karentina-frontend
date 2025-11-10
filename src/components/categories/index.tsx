import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getAllCategories } from "./actions";
import { TCategory } from "./type";

type Props = {
  title: string;
};

export function ContentCategory({ data }: { data: TCategory }) {
  return (
    <div className="flex flex-col items-center gap-y-2 relative">
      <figure className="w-16 aspect-square relative overflow-hidden rounded-full">
  <Image
    src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.photo}`}
    alt={data.name}
    className="w-full h-full object-cover object-center"
    sizes="(max-width: 768px) 100vw, 50vw"
    fill
    priority
    unoptimized
  />
</figure>

      <span>{data.name}</span>
      <Link href={`/categories/${data.slug}`} className="absolute inset-0" />
    </div>
  );
}

export default async function Categories({ title }: Props) {
  let data: TCategory[] = [];

  try {
    const res = await getAllCategories();
    data = Array.isArray(res?.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  return (
    <section className="px-4">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map((category) => (
            <ContentCategory key={category.id} data={category} />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            Tidak ada Category.
          </p>
        )}
      </div>
    </section>
  );
}
