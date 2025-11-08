import Image from "next/image";
import FlagIdn from "@/assets/icons/FlagIdn";
import LogoKaterina from "@/assets/icons/LogoKaterina";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between px-4">
        <span className="flex gap-x-2 items-center">
          <span className="text-color1">
            <LogoKaterina />
          </span>
          <span className="font-bold text-2xl">Katerina</span>
        </span>

        <span className="relative">
          <button className="flex gap-x-2 border border-gray1 rounded-full py-1 px-2">
            <FlagIdn />
            <span>IDN</span>
          </button>
        </span>
      </header>

      {/* SLIDER SECTION */}
      <section className="relative">
        <Slider spaceBetween={20} swipeClassName="!h-[180px]" swipeSlideClassName="!max-w-xs">
          <div className="h-full rounded-3xl overflow-hidden relative border">
            <figure className="w-full h-full absolute">
              <Image
                src="/images/slide1.png"
                alt="Promo 50% Potongan"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </figure>

            <div className="absolute inset-0 bg-linear-to-r from-black to-black/0"></div>

            <div className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold">
              <span className="text-white">Sale</span>
              <span className="text-color1 text-4xl">50%</span>
              <span className="text-white">Potongan</span>
            </div>

            {/*<a href="details.html" className="absolute inset-0"></a>*/}
          </div>

           <div className="h-full rounded-3xl overflow-hidden relative border">
            <figure className="w-full h-full absolute">
              <Image
                src="/images/slide2.png"
                alt="Promo 50% Potongan"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </figure>

            <div className="absolute inset-0 bg-linear-to-r from-black to-black/0"></div>

            <div className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold">
              <span className="text-white">Sale</span>
              <span className="text-color1 text-4xl">50%</span>
              <span className="text-white">Potongan</span>
            </div>

            {/*<a href="details.html" className="absolute inset-0"></a>*/}
          </div>

          <div className="h-full rounded-3xl overflow-hidden relative border">
            <figure className="w-full h-full absolute">
              <Image
                src="/images/slide3.png"
                alt="Promo 50% Potongan"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </figure>

            <div className="absolute inset-0 bg-linear-to-r from-black to-black/0"></div>

            <div className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold">
              <span className="text-white">Sale</span>
              <span className="text-color1 text-4xl">50%</span>
              <span className="text-white">Potongan</span>
            </div>

            {/*<a href="details.html" className="absolute inset-0"></a>*/}
          </div>
        </Slider>
      </section>
    </>
  );
}
