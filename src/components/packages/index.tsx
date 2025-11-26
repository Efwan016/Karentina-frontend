
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "@/components/Slider";
import Notes from "@/assets/icons/Notes";
import People from "@/assets/icons/People";
import PinPoint from "@/assets/icons/PinPoint";
import { getPackages } from "./actions";
import { TPackage, Tshow } from "./type";




type Props = { show: Tshow };


export function ContentCategory({ data }: { data: TPackage }) {
  return (
    <div className="flex flex-col items-center gap-y-2 relative">
      <figure className="w-16 aspect-square relative overflow-hidden rounded-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.thumbnail}`}
          alt={data.name}
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </figure>

      <span>{data.name}</span>
      <Link href={`/categories/${data.slug}`} className="absolute inset-0" />
    </div>
  );
}


export function ContentPopular({ data }: { data: TPackage[] }) {
  if (!data?.length) return <p className="px-4">No Data</p>;

  return (
    <Slider
      spaceBetween={20}
      swipeClassName="!h-[260px] !px-4"
      swipeSlideClassName="!w-[240px]"
    >
      {data.map((item) => (
        <div
          key={item.id}
          className="h-full rounded-3xl overflow-hidden relative border"
        >
          <figure className="absolute w-full h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.thumbnail}`}
              alt={item.name}
              fill
              priority
              unoptimized
              className="object-cover object-center"
            />
          </figure>

          <div className="absolute bottom-2 left-2 right-2 flex flex-col bg-white rounded-2xl p-3">
            <span className="font-semibold">{item.name}</span>

            <div className="flex gap-x-3 mt-1">
              <div className="flex items-center gap-x-1">
                <Notes />
                <span className="text-gray2">{item.category?.name}</span>
              </div>

              <div className="flex items-center gap-x-1">
                <People />
                <span className="text-gray2">{item.name ?? 0}</span>
              </div>
            </div>
          </div>

          <Link href={`/packages/${item.slug}`} className="absolute inset-0" />
        </div>
      ))}
    </Slider>
  );
}

export function ContentNewest({
  data,
  withDetailsQuantity = false,
}: {
  data: TPackage[];
  withDetailsQuantity?: boolean;
}) {
  if (!data?.length) return <p className="px-4">No Data</p>;

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {data.map((item) => {
        const tiers = item.tiers ?? [];

        const lowestTier = tiers.reduce(
          (min, curr) => (curr.price < min.price ? curr : min),
          tiers[0] ?? { price: 0, quantity: 0 }
        );

        const highestTier = tiers.reduce(
          (max, curr) => (curr.price > max.price ? curr : max),
          tiers[0] ?? { price: 0, quantity: 0 }
        );

        return (
          <div key={item.id} className="flex relative gap-x-3">
            <figure className="w-[120px] h-40 flex-none rounded-2xl overflow-hidden relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.thumbnail}`}
                alt={item.name}
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            </figure>

            <div className="flex flex-col gap-y-3 pt-4">
              <span className="font-semibold">{item.name}</span>

              <div className="flex items-center gap-x-1">
                <Notes />
                <span className="text-gray2">{item.category?.name}</span>
              </div>

              <div className="flex items-center gap-x-1">
                <People  />
                <span className="text-gray2">
                  {lowestTier.quantity ?? 0}
                  {withDetailsQuantity &&
                    ` - ${highestTier.quantity ?? 0} people`}
                </span>
              </div>

              <div className="flex items-center gap-x-1">
                <PinPoint />
                <span className="text-gray2">{item.city?.name}</span>
              </div>
            </div>
            <Link href={`/packages/${item.slug}`} className="absolute inset-0" />
          </div>
        );
      })}
    </div>
  );
}


export default async function Packages({ show }: Props) {
  try {
    const res = await getPackages();
    const data = Array.isArray(res?.data) ? res.data : [];

    switch (show) {
      case "popular":
        return (
          <ContentPopular data={data.filter((i: TPackage) => i.is_popular === 1)
} />
        );
      case "newest":
        return <ContentNewest data={data} />;
      default:
        return null;
    }
  } catch (err) {
    console.error("Failed to fetch packages:", err);
    return <p className="px-4 text-red-500">Failed to load packages.</p>;
  }
}
