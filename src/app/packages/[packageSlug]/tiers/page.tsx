import React from 'react'
import ComposeHeader from '@/app/packages/[packageSlug]/tiers/ComposeHeader'
import Image from 'next/image'
import { TPackageDetails } from '@/components/packages/type';
import { getPackageDetails } from '@/components/packages/actions';
import { Metadata, ResolvingMetadata } from 'next';
import Notes from '@/assets/icons/Notes';
import People from '@/assets/icons/People';

type Request = {
    params: {
        packageSlug: string;
    };
};
type Tier = {
    price: number;
    quantity: number;
}


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
        title: `Select Tier | ${pkg.name} — Package | ${previous.title ?? "App"}`,
        description: pkg.about ?? `Details for ${pkg.name} catering package.`,
    };
}

async function PackageTiersPage({ params }: Request) {

    const { packageSlug } = await params;

    const cateringPackage: { data: TPackageDetails } =
        await getPackageDetails(packageSlug);

    if (!cateringPackage?.data) {
        return <div className="p-4">Package not found.</div>;
    }

    const pkg = cateringPackage.data;

    const tiers = pkg.tiers ?? [];

    if (tiers.length === 0) {
        return {
            lowestTier: { price: 0, quantity: 0 },
            highestTier: { price: 0, quantity: 0 },
        };
    }

    const lowestTier = tiers.reduce((min: Tier, curr: Tier) =>
        curr.price < min.price ? curr : min
    );

    const highestTier = tiers.reduce((max: Tier, curr: Tier) =>
        curr.price > max.price ? curr : max
    );

    return (
        <>

            <ComposeHeader />

            <section className="relative px-4 -mt-20 z-10">
                <div
                    className="flex gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl items-center"
                >
                    <figure
                        className="w-[100px] h-[120px] flex-none rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${pkg.thumbnail}`}
                            alt={String(pkg.id)}
                            fill
                            priority
                            unoptimized
                            className="object-cover object-center"
                        />
                    </figure>
                    <span className="flex flex-col gap-y-3">
                        <span className="font-semibold">Asian Spicy Guandong</span>
                        <span className="flex gap-x-1">
                            <span className="text-color2">
                                <Notes />
                            </span>
                            <span className="text-gray2">{pkg.category.name}</span>
                        </span>

                        <span className="flex gap-x-1">
                            <span className="text-color2">
                                <People />
                            </span>
                            <span className="text-gray2">{lowestTier?.quantity || 0} - {highestTier?.quantity || 0} People</span>
                        </span>
                    </span>
                </div>
            </section>
        </>
    )
}

export default PackageTiersPage