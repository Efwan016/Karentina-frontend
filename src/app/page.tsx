import Image from "next/image";
import FlagIdn from "@/assets/icons/FlagIdn";
import LogoKaterina from "@/assets/icons/LogoKaterina";
import Slider from "@/components/Slider";
import Categories from "@/components/categories";
import Packages from "@/components/packages";
import Testimonials from "@/components/testimonial";
import BottomBar from "@/components/bottomBar";


type SlideItemProps = {
  image: string;
  alt: string;
};

const SlideItem = ({ image, alt }: SlideItemProps) => (
  <div className="h-full rounded-3xl overflow-hidden relative border">
    <figure className="absolute w-full h-full">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
    </figure>

    <div className="absolute inset-0 bg-linear-to-r from-black to-black/0" />

    <div className="absolute inset-y-0 left-0 pl-4 w-32 flex flex-col justify-center font-bold">
      <span className="text-white">Sale</span>
      <span className="text-color1 text-4xl">50%</span>
      <span className="text-white">Potongan</span>
    </div>
  </div>
);

// -----------------------------
// MAIN HOME COMPONENT
// -----------------------------
export default function Home() {
  const slides = [
    { image: "/images/slide1.png", alt: "Promo 50% Potongan" },
    { image: "/images/slide2.png", alt: "Promo 50% Potongan" },
    { image: "/images/slide3.png", alt: "Promo 50% Potongan" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="mt-2 flex items-center justify-between px-3 py-4 bg-amber-600 shadow-lg rounded-3xl backdrop-blur-md border border-gray-100">
        <div className="flex items-center gap-x-2">
          <LogoKaterina />
          <span className="font-bold text-2xl">Adzani</span>
        </div>

        <button className="flex items-center gap-x-2 border border-gray-900 rounded-full py-1 px-2">
          <FlagIdn />
          <span>IDN</span>
        </button>
      </header>

      {/* SLIDER SECTION */}
      <section className="relative">
        <Slider
          spaceBetween={20}
          swipeClassName="!h-[180px]"
          swipeSlideClassName="!max-w-xs"
        >
          {slides.map((s, i) => (
            <SlideItem key={i} image={s.image} alt={s.alt} />
          ))}
        </Slider>
      </section>

      {/* CATEGORIES */}
      <Categories title="Browse Categories" />

      {/* POPULAR SECTION */}
      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <Packages show="popular" />
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">People Love It</h2>
        <Testimonials />
      </section>


      {/* NEWEST SECTION */}
      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>
        <Packages show="newest" />
      </section>

      {/* BOTTOM BAR SECTION */}

      <BottomBar />


    </>
  );
}
