import { getPackageDetails } from "@/components/packages/actions";
import { TPackageDetails } from "@/components/packages/type";
import { Metadata, ResolvingMetadata } from "next";
import ComposeHeader from "./ComposeHeader";
import Image from "next/image";
import Slider from "@/components/Slider";
import Notes from "@/assets/icons/Notes";
import People from "@/assets/icons/People";
import StarClashy from "@/assets/icons/Star-clashy";
import { ContentBonus } from "@/components/bonuses";
import PinPoint from "@/assets/icons/PinPoint";
import Truck from "@/assets/icons/Truck";
import { ContentTestimonial } from "@/components/testimonial";
import BadgeCheckmark from "@/assets/icons/badge-checkmark";
import Link from "next/link";

type Request = {
    params: {
        packageSlug: string;
    };
};

export type TTier = {
    id: number;
    price: number;
    quantity: number;
    duration: number;
};


{/*Generate Metadata*/ }
export async function generateMetadata(
    { params }: Request,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { packageSlug } = await params;

    const cateringPackage: { data: TPackageDetails } | null =
        await getPackageDetails(packageSlug);

    const previous = await parent;


    if (!cateringPackage?.data) {
        return {
            title: `Package Not Found | ${previous.title ?? "App"}`,
            description: "This package does not exist.",
        };
    }


    const pkg = cateringPackage.data;

    return {
        title: `${pkg.name} — Package | ${previous.title ?? "App"}`,
        description: pkg.about ?? `Details for ${pkg.name} catering package.`,
    };
}

{/*Page Component*/ }
export default async function PackageDetailsPage({ params }: Request) {
    const { packageSlug } = await params;

    const cateringPackage: { data: TPackageDetails } =
        await getPackageDetails(packageSlug);

    if (!cateringPackage?.data) {
        return <div className="p-4">Package not found.</div>;
    }

    const pkg = cateringPackage.data;

    const currentTier = pkg.tiers.length
        ? pkg.tiers.reduce((min: TTier, curr: TTier) =>
            curr.price < min.price ? curr : min,
            pkg.tiers[0]
        )
        : null;

    return (
        <>
            <ComposeHeader />

            {/* Hero / Slider */}
            <section className="relative">
                <Slider
                    spaceBetween={20}
                    hasPagination
                    swipeClassName="!h-[550px] !px-4"
                    swipeSlideClassName="!w-full"
                >
                    {(cateringPackage?.data?.photos ?? []).map(item => (
                        <figure key={item.id} className="w-full h-full absolute">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${item.photo}`}
                                alt={String(item.id)}
                                fill
                                priority
                                unoptimized
                                className="object-cover object-center"
                            />
                        </figure>
                    ))}
                </Slider>

                {/* Floating Card */}
                <div
                    className="
            absolute left-2 right-2 -bottom-8 z-20
            bg-white rounded-2xl p-4 shadow-lg
            flex flex-col gap-y-3 border-2 border-gray-500/20 md:flex-row md:items-center md:justify-between md:gap-x-4
        "
                >
                    {/* Title & Info */}
                    <span className="font-semibold">{pkg.name}</span>
                    <span className="flex gap-x-3">
                        <span className="flex gap-x-1">
                            <span className="text-blue-600">
                                <Notes />
                            </span>
                            <span className="text-gray-500 z-20">{pkg.category?.name}</span>
                        </span>

                        <span className="flex items-center gap-x-1">
                            <span className="text-blue-600">
                                <People />
                            </span>
                            {currentTier?.quantity || 0} pax
                        </span>
                    </span>


                    {/* Rating Badge */}
                    <span
                        className="
                    flex flex-col items-center justify-center gap-y-1
                    px-4 py-2 rounded-2xl
                    bg-amber-600
                    text-white shadow-lg shadow-amber-600/20
                "
                    >
                        <StarClashy />
                        <span className="font-medium text-sm">4.5/5</span>
                    </span>
                </div>
            </section>

            {/* About Section */}
            <section className="relative z-10 mt-36 -bottom-10 px-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                    About Package
                </h2>

                <p className="text-gray-600 leading-relaxed">
                    {pkg.about}
                </p>
            </section>

            {/* Bonuses Section */}
            <section className="relative -bottom-8 z-10">
                <h2 className="font-semibold px-4 mb-">All Bonuses For You</h2>
                <Slider
                    spaceBetween={20}
                    hasPagination
                    swipeClassName="!h-[153px] !px-4"
                    swipeSlideClassName="!w-[190px]"
                >
                    {
                        cateringPackage?.data?.bonuses?.map((bonus) => {
                            const bonusHref = `/packages/${packageSlug}/tiers`;
                            return (
                                <ContentBonus data={bonus} key={bonus.id} href={bonusHref} />
                            )
                        })
                    }
                </Slider>
            </section>

            {/* Catering Details Section */}
            <section className="relative -bottom-10 z-10">
                <h2 className="font-semibold px-4 mb-3">Catering Details</h2>
                <div className="grid grid-cols-2 gap-3 px-4">
                    <span className="flex gap-x-3">
                        <span
                            className="w-[52px] aspect-square rounded-full bg-blue-600 text-white items-center justify-center flex"
                        >
                            <PinPoint />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-gray2">City</span>
                            <span className="font-semibold">{pkg.city.name}</span>
                        </span>
                    </span>

                    <span className="flex gap-x-3">
                        <span
                            className="w-[52px] aspect-square rounded-full bg-blue-600 text-white items-center justify-center flex"
                        >
                            <People />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-gray2">Portion</span>
                            <span className="font-semibold">{currentTier?.quantity || 0} People</span>
                        </span>
                    </span>

                    <span className="flex gap-x-3">
                        <span
                            className="w-[52px] aspect-square rounded-full bg-blue-600 text-white items-center justify-center flex"
                        >
                            <Notes />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-gray2">Category</span>
                            <span className="font-semibold">{pkg.category.name} </span>
                        </span>
                    </span>

                    <span className="flex gap-x-3">
                        <span
                            className="w-[52px] aspect-square rounded-full bg-blue-600 text-white items-center justify-center flex"
                        >
                            <Truck />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-gray2">Delivery</span>
                            <span className="font-semibold">Free 100%</span>
                        </span>
                    </span>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative -bottom-10 z-10 mb-10">
                <h2 className="font-semibold mb-3 px-4">Testimonials</h2>
                <Slider
                    spaceBetween={20}
                    swipeClassName="!h-[180px] !px-4"
                    swipeSlideClassName="!w-[300px]" >
                    {pkg.testimonials.map((item) => {
                        return (
                            <ContentTestimonial key={item.id} data={item} />
                        );
                    })}
                </Slider>
            </section>

            {/* kitchen Section */}
           <section className="relative">
    <h2 className="font-semibold mb-3 px-4">Kitchen</h2>

    <span className="flex items-center gap-x-3">
        {/* Image */}
        <figure className="w-14 flex-none aspect-square rounded-full overflow-hidden relative">
            <Image
                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${pkg.kitchen.photo}`}
                alt={pkg.kitchen.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover object-center"
            />
        </figure>
        {/* Text */}
        <span className="flex flex-col">
            <span className="flex gap-x-2">
                <h3 className="font-semibold">{pkg.kitchen.name}</h3>
                <span className="text-green-600">
                    <BadgeCheckmark />
                </span>
            </span>

            <span className="text-sm text-gray-600">
                Since {pkg.kitchen.year}
            </span>
        </span>


        {/* CTA Button */}
        <Link
            href=""
            className="ml-auto bg-gray-100 px-3 font-semibold text-sm py-1 flex rounded-full"
        >
            Profile
        </Link>
    </span>
</section>



            {/* Sticky Booking Bar */}
            <div className="sticky bottom-4 px-4 z-50">
                <div
                    className="rounded-full flex justify-evenly gap-x-3 border border-black bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6"
                >
                    <span className="flex flex-col">
                        <span className="font-semibold text-xl"> {(currentTier?.price || 0).thousands()} </span>
                        <span className="text-gray-600 text-sm">
                            {`${currentTier?.duration || 0} Day${(currentTier?.duration || 0) > 1 ? "s" : ""}, `}
                            {currentTier?.quantity || 0} People
                        </span>
                    </span>

                    {currentTier ? (
                        <Link
                            href={`/packages/${packageSlug}/tiers`}
                            className="bg-amber-600 rounded-full flex items-center justify-center text-white px-3"
                        >
                            Booking now
                        </Link>
                    ) : (
                        <span className="bg-gray-600 rounded-full flex items-center justify-center text-gray-200 px-5 cursor-not-allowed">
                            Booking now
                        </span>
                    )}
                </div>
            </div>
        </>

    );
}
