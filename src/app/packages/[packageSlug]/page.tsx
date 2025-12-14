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
        <div className="bg-white">
            <ComposeHeader />

            {/* Hero Section */}
            <div className="relative">
                {/* Image Slider */}
                <section>
                    <Slider
                        spaceBetween={0}
                        hasPagination
                        swipeClassName="!h-[450px]"
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
                                    className="object-cover"
                                />
                            </figure>
                        ))}
                    </Slider>
                </section>

                {/* Floating Card */}
                <div className="absolute left-4 right-4 -bottom-16 z-20">
                    <div
                        className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between"
                    >
                        <div className="flex flex-col gap-y-1">
                            <h1 className="font-bold text-xl text-gray-800">{pkg.name}</h1>
                            <div className="flex items-center gap-x-3">
                                <span className="flex items-center gap-x-1.5 text-sm text-gray-500">
                                    <Notes />
                                    <span>{pkg.category?.name}</span>
                                </span>
                                <span className="flex items-center gap-x-1.5 text-sm text-gray-500">
                                    <People />
                                    <span>{currentTier?.quantity || 0} pax</span>
                                </span>
                            </div>
                        </div>

                        <div
                            className="flex flex-col items-center justify-center gap-y-1 px-4 py-2 rounded-xl bg-amber-500 text-white self-start md:self-center"
                        >
                            <StarClashy />
                            <span className="font-semibold text-sm">4.5/5</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-24 pb-40">
                {/* About Section */}
                <section className="px-4 mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        About Package
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {pkg.about}
                    </p>
                </section>

                {/* Bonuses Section */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 px-4">All Bonuses For You</h2>
                    <Slider
                        spaceBetween={16}
                        hasPagination={false}
                        swipeClassName="!h-auto !px-4"
                        swipeSlideClassName="!w-[180px]"
                    >
                        {
                            cateringPackage?.data?.bonuses?.map((bonus) => (
                                <ContentBonus data={bonus} key={bonus.id} href={`/packages/${packageSlug}/tiers`} />
                            ))
                        }
                    </Slider>
                </section>

                {/* Catering Details Section */}
                <section className="px-4 mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Catering Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: <PinPoint />, label: "City", value: pkg.city.name },
                            { icon: <People />, label: "Portion", value: `${currentTier?.quantity || 0} People` },
                            { icon: <Notes />, label: "Category", value: pkg.category.name },
                            { icon: <Truck />, label: "Delivery", value: "Free 100%" },
                        ].map((detail, index) => (
                            <div key={index} className="flex items-center gap-x-3">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                                    {detail.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{detail.label}</p>
                                    <p className="font-semibold text-gray-700">{detail.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 px-4">Testimonials</h2>
                    <Slider
                        spaceBetween={16}
                        swipeClassName="!h-auto !px-4"
                        swipeSlideClassName="!w-[320px]" >
                        {pkg.testimonials.map((item) => (
                            <ContentTestimonial key={item.id} data={item} />
                        ))}
                    </Slider>
                </section>

                {/* Kitchen Section */}
                <section className="px-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Kitchen</h2>
                    <div className="flex items-center gap-x-4 bg-gray-50 border border-gray-100 p-4 rounded-xl">
                        <figure className="w-16 h-16 flex-none rounded-full overflow-hidden relative">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${pkg.kitchen.photo}`}
                                alt={pkg.kitchen.name}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </figure>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-x-2">
                                <h3 className="font-semibold text-gray-800">{pkg.kitchen.name}</h3>
                                <span className="text-green-500"><BadgeCheckmark /></span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Since {pkg.kitchen.year}
                            </p>
                        </div>
                        <Link
                            href="#" // Update with actual kitchen profile link
                            className="ml-auto bg-amber-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-amber-600 transition-colors"
                        >
                            Profile
                        </Link>
                    </div>
                </section>
            </main>

            {/* Sticky Booking Bar */}
            <div className="sticky bottom-4 z-50 mb-8">
                <div
                    className="rounded-full flex justify-between gap-x-3 border border-black bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6"
                >
                    <div className="flex flex-col">
                        <p className="font-bold text-xl text-gray-900">Rp{(currentTier?.price || 0).thousands()}</p>
                        <p className="text-gray-500 text-sm">
                            {`${currentTier?.duration || 0} Day${(currentTier?.duration || 0) > 1 ? "s" : ""}, `}
                            {currentTier?.quantity || 0} People
                        </p>
                    </div>

                    {currentTier ? (
                        <Link
                            href={`/packages/${packageSlug}/tiers`}
                            className="bg-amber-500 rounded-full flex items-center justify-center text-white font-bold px-6 py-3 hover:bg-amber-600 transition-colors"
                        >
                            Booking Now
                        </Link>
                    ) : (
                        <span className="bg-gray-300 rounded-full flex items-center justify-center text-gray-500 px-6 py-3 cursor-not-allowed font-bold">
                            Not Available
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
