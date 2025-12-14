import React from 'react'
import ComposeHeader from '@/app/packages/[packageSlug]/tiers/ComposeHeader'
import Image from 'next/image'
import { TPackageDetails } from '@/components/packages/type';
import { getPackageDetails } from '@/components/packages/actions';
import { Metadata, ResolvingMetadata } from 'next';
import Notes from '@/assets/icons/Notes';
import People from '@/assets/icons/People';
import { ContentTier } from '@/components/tiers';
import Link from 'next/link';

type Request = {
    params: {
        packageSlug: string;
    };
};

type Tier = {
    id: number;
    name: string;
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

    const lowestTier = tiers.length > 0 ? tiers.reduce((min: Tier, curr: Tier) =>
        curr.price < min.price ? curr : min
    ) : null;

    const highestTier = tiers.length > 0 ? tiers.reduce((max: Tier, curr: Tier) =>
        curr.price > max.price ? curr : max
    ) : null;

    return (
        <>

            <ComposeHeader />

            <section className="relative px-4 -mt-20 z-10">
                <div
                    className="flex gap-x-4 bg-white shadow-lg p-4 rounded-2xl items-center border border-gray-100"
                >
                    <figure
                        className="w-24 h-24 relative flex-none rounded-xl overflow-hidden"
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${pkg.thumbnail}`}
                            alt={String(pkg.id)}
                            fill
                            priority
                            unoptimized
                            className="object-cover"
                        />
                    </figure>
                    <div className="flex flex-col gap-y-2">
                        <h1 className="font-bold text-lg text-gray-800">{pkg.name}</h1>
                        <span className="flex items-center gap-x-2 text-sm text-gray-500">
                            <Notes  />
                            <span>{pkg.category.name}</span>
                        </span>

                        <span className="flex items-center gap-x-2 text-sm text-gray-500">
                            <People />
                            <span>{lowestTier?.quantity || 0} - {highestTier?.quantity || 0} People</span>
                        </span>
                    </div>
                </div>
            </section>

            <section className="relative z-0 bg-white pt-10 pb-20">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 px-4">Choose Your Package</h2>
                {tiers.length > 0 ? (
                    <div className="flex flex-col relative gap-y-6 px-4">
                        {
                            pkg.tiers.map(tier => {
                                return (
                                    <ContentTier
                                        key={tier.id}
                                        data={tier}
                                        packageSlug={packageSlug}
                                        isPriceShown
                                        cta={
                                            <Link href={`/packages/${packageSlug}/informations?tier=${tier.id}`}
                                                className="w-full py-3 mt-auto rounded-full font-semibold text-center border border-gray-600 text-gray-800 bg-white hover:bg-amber-600 hover:text-white transition-colors duration-300">
                                                Choose Package
                                            </Link>
                                        }
                                    />
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="text-center px-4">
                        <p className="text-gray-600">No tiers are available for this package at the moment.</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default PackageTiersPage