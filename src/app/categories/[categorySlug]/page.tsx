import React from "react";
import Image from "next/image";

import { getCategoryDetails } from "@/components/categories/actions";
import { TCategory } from "@/components/categories/type";

import ComposeHeader from "./ComposeHeader";
import People from "@/assets/icons/People";
import "@/libs/thousands";

import { ContentNewest, ContentPopular } from "@/components/packages";
import { OpenModal } from "@/components/Modal";
import { getFilteredPackagesByCityAndCategory } from "@/components/packages/actions";
import { TPackage } from "@/components/packages/type";

type Request = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    citySlug?: string;
  };
};

export default async function PageCategoryDetails({
  params,
  searchParams,
}: Request) {
  const { categorySlug } = await params;

  const categories: { data: TCategory } = await getCategoryDetails(categorySlug);

  let catering_packages = categories.data.catering_packages;

  if (searchParams.citySlug && searchParams.citySlug !== "") {
    const filtered: { data: TPackage[] } =
      await getFilteredPackagesByCityAndCategory(
        searchParams.citySlug,
        params.categorySlug
      );

    catering_packages = filtered.data;
  }

  return (
    <>
      <ComposeHeader />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex flex-col gap-y-5 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex items-center gap-x-3">
            <figure className="relative w-[100px] h-[120px] rounded-2xl overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${categories.data.photo}`}
                alt={categories.data.name}
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            </figure>

            <div className="flex flex-col gap-y-3">
              <span className="font-semibold">{categories.data.name}</span>

              <div className="flex gap-x-1">
                <span className="text-blue-700">
                  <People />
                </span>
                <span className="text-gray2">
                  {catering_packages.length.thousands()}{" "}
                  {`Package${catering_packages.length > 1 ? "s" : ""}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <ContentPopular
          data={catering_packages.filter((item) => item.is_popular)}
        />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>
        <ContentNewest data={catering_packages} />
      </section>

      <div className="sticky bottom-4 mt-36 px-4 flex justify-center">
        <OpenModal
          queries={{ categorySlug }}
          modal="filter-category"
          modalPosition="bottom"
          className="bg-white border border-gray-400 shadow-[0px_12px_30px_0px_#07041517] px-3 py-2 font-semibold text-sm rounded-full"
        >
          See Filters
        </OpenModal>
      </div>
    </>
  );
}

