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

type Request = {
    params: {
        packageSlug: string;
    };
};

export type TTier = {
    price: number;
    quantity: number;
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
                    className="left-2 bottom-2 right-2 flex flex-col bg-white rounded-2xl p-3">
                    {/* Title & Info */}
                    <span className="font-semibold">{pkg.name}</span>
                    <span className="flex gap-x-3">
                        <span className="flex gap-x-1">
                            <span className="text-blue-600">
                                <Notes />
                            </span>
                            <span className="text-gray-500">{pkg.category?.name}</span>
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
            <section className="relative z-10 mt-24 px-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                    About Package
                </h2>

                <p className="text-gray-600 leading-relaxed">
                    {pkg.about}
                </p>
            </section>

            <section className="relative z-10">
                <h2 className="font-semibold px-4 mb-">All Bonuses For You</h2>
                <Slider
                    spaceBetween={20}
                    hasPagination
                    swipeClassName="!h-[153px] !px-4"
                    swipeSlideClassName="!w-[190px]"
                >
                    {
                        cateringPackage?.data?.bonuses?.map((bonus) => {
                            return (
                                <ContentBonus data={bonus} key={bonus.id} />
                            )
                        })
                    }
                </Slider>
            </section>

            <section className="relative z-10">
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
        </>

    );
}
