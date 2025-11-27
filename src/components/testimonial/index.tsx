
import React from "react";
import Image from "next/image";
import Slider from "@/components/Slider";
import Star from "@/assets/icons/Star";
import { getAllTestimonial } from "./actions";
import { TTestimonials } from "./type";






export function ContentTestimonial({ data }: { data: TTestimonials }) {
  return (
   <div
                className="h-full rounded-3xl overflow-hidden relative border p-3 flex flex-col gap-y-3"
              >
                <span className="text-color1 flex gap-x-1">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </span>

                <p className="italic text-sm font-semibold leading-6">
                  “ {data.message}”
                </p>

                <div className="flex gap-x-3 items-center">
                  <figure
                    className="w-9 flex-none aspect-square relative rounded-full overflow-hidden"
                  >
                    <Image
                            src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.photo}`}
                            alt={data.name}
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                            
                          />
                  </figure>
                  <span className="font-semibold">{data.name}</span>
                </div>
              </div>
  );
}

export function WrapperTestimonials({data}: {data: TTestimonials[] }) {
  return <Slider 
    spaceBetween={20}
    swipeClassName="!h-[156px] !px-4"
    swipeSlideClassName="!w-[280px]" 
    >
      {
        data.map(item => {
          return <ContentTestimonial key={item.id} data={item} />
        })
      }


    </Slider>
}

export default async function Testimonials() {
    const { data }: { data: TTestimonials[] } = await getAllTestimonial();

    if(data.length == 0)  return "Nothing"
    return (
  <WrapperTestimonials data={data} />
);

}
