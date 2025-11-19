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
      <header
        className="
          top-2 z-50
          flex items-center justify-between
          px-4 py-3
          bg-amber-600/90
          shadow-[0_4px_20px_rgba(0,0,0,0.15)]
          rounded-2xl
          backdrop-blur-md
          border border-amber-200/30
        "
      >
        {/* Left Section */}
        <div className="flex items-center gap-x-3">
          <LogoKaterina />
          <span className="font-semibold text-xl tracking-wide text-white drop-shadow">
            Adzani
          </span>
        </div>

        {/* Language Button */}
        <button
          className="
          flex items-center gap-x-2
          bg-white/20
          border border-white/30
          rounded-full
          py-1.5 px-3
          text-white
          backdrop-blur-lg
          hover:bg-white/30 transition
        "
        >
          <FlagIdn />
          <span className="text-sm font-medium">IDN</span>
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
