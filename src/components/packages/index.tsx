import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getPackages } from "./actions";
import { TPackage, Tshow } from "./type";
import Slider from "@/components/Slider";
import Notes from "@/assets/icons/Notes";
import People from "@/assets/icons/People";

type Props = {
  show: Tshow
};

export function ContentCategory({ data }: { data: TPackage }) {
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

export function ContentPopular ({ data } : {data: TPackage }) {
  if (data.length === 0) return "No Data"
  return 
  <Slider 
  spaceBetween={20}
  swipeClassName="!h-[260px] !px-4"
  swipeSlideClassName= "!w-[240px]"
  >
   data.map(Packages  => {
    return (
      <div className="h-full rounded-3xl overflow-hidden relative border" key={item.id}>
                <figure className="w-full h-full absolute">
                  <Image
                    className="w-full h-full object-cover object-center"
                    src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.thumbnail}`}
                    alt={item.name}
                  />
                </figure>Name

                <div
                  className="absolute left-2 bottom-2 right-2 flex flex-col bg-white rounded-2xl p-3"
                >
                  <span className="font-semibold">Success Diet Natural</span>
                  <span className="flex gap-x-3">
                    <span className="flex gap-x-1">
                      <span className="text-color2">
                        <Notes />
                      </span>
                      <span className="text-gray2">Healthy</span>
                    </span>

                    <span className="flex gap-x-1">
                      <span className="text-color2">
                        <People />
                      </span>
                      <span className="text-gray2">125</span>
                    </span>
                  </span>
                </div>
                <Link href={`/packages/${item.slug}`} className="absolute inset-0" />
              </div>
    )
     
   })

  </Slider>
}


export function COntentNewest  ({ data } : {data: TPackage }) {
  return (
    <div className="flex flex-col gap-y-4 px-4">
      {data.map(item => {
        return (
          <div class="flex gap-x-3">
            <figure
              class="w-[120px] h-[160px] flex-none rounded-2xl overflow-hidden relative"
            >
              <img
                class="w-full h-full object-cover object-center"
                src="/images/fresh1.png"
                alt=""
              />
            </figure>
            <span class="flex flex-col gap-y-3 pt-4">
              <span class="font-semibold">Anak Kantor Semangat</span>
              <span class="flex gap-x-1">
                <span class="text-color2">
                  <Notes />
                </span>
                <span class="text-gray2">Healthy</span>
              </span>

              <span class="flex gap-x-1">
                <span class="text-color2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
                      class="fill-current"
                    />
                    <path
                      d="M14.08 14.15C11.29 12.29 6.73996 12.29 3.92996 14.15C2.65996 15 1.95996 16.15 1.95996 17.38C1.95996 18.61 2.65996 19.75 3.91996 20.59C5.31996 21.53 7.15996 22 8.99996 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
                      class="fill-current"
                    />
                    <path
                      opacity="0.4"
                      d="M19.99 7.33998C20.15 9.27998 18.77 10.98 16.86 11.21C16.85 11.21 16.85 11.21 16.84 11.21H16.81C16.75 11.21 16.69 11.21 16.64 11.23C15.67 11.28 14.78 10.97 14.11 10.4C15.14 9.47998 15.73 8.09998 15.61 6.59998C15.54 5.78998 15.26 5.04998 14.84 4.41998C15.22 4.22998 15.66 4.10998 16.11 4.06998C18.07 3.89998 19.82 5.35998 19.99 7.33998Z"
                      class="fill-current"
                    />
                    <path
                      d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z"
                      class="fill-current"
                    />
                  </svg>
                </span>
                <span class="text-gray2">88</span>
              </span>

              <span class="flex gap-x-1">
                <span class="text-color2">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M20.62 8.95C19.57 4.33 15.54 2.25 12 2.25C12 2.25 12 2.25 11.99 2.25C8.45997 2.25 4.41997 4.32 3.36997 8.94C2.19997 14.1 5.35997 18.47 8.21997 21.22C9.27997 22.24 10.64 22.75 12 22.75C13.36 22.75 14.72 22.24 15.77 21.22C18.63 18.47 21.79 14.11 20.62 8.95Z"
                      class="fill-current"
                    />
                    <path
                      d="M12 13.96C13.7397 13.96 15.15 12.5497 15.15 10.81C15.15 9.07034 13.7397 7.66003 12 7.66003C10.2603 7.66003 8.84998 9.07034 8.84998 10.81C8.84998 12.5497 10.2603 13.96 12 13.96Z"
                      class="fill-current"
                    />
                  </svg>
                </span>
                <span class="text-gray2">Jakarta</span>
              </span>
            </span>
          </div>

        )
      })}
          </div>
  )
}

export default async function Categories({show}: Props) {
  let data: TPackage, Tshow[] = [];
  

  try {
    const res = await getPackages();
    data = Array.isArray(res?.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  if (show === "popular") {
    return <ContentPopular data={data.filter((item) => item.is_popular === 1) } />

  }

  if (show === "newest" ) {

    return <COntentNewest data={data} />
  }

  return (
    null
  );
}
