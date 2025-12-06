import React from 'react'
import ComposeHeader from '@/app/packages/[packageSlug]/shipping/ComposeHeader'
import Image from 'next/image'
import { TPackageDetails } from '@/components/packages/type';
import { getPackageDetails } from '@/components/packages/actions';
import { Metadata, ResolvingMetadata } from 'next';
import Notes from '@/assets/icons/Notes';
import People from '@/assets/icons/People';
import { OpenModal } from '@/components/Modal';
import FormShippingWrapper from '@/app/packages/[packageSlug]/shipping/Form';


type Request = {
    params: {
        packageSlug: string;
    };
    searchParams: {
        tier: string
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
        title: `Shipping | ${pkg.name} — Package | ${previous.title ?? "App"}`,
        description: pkg.about ?? `Details for ${pkg.name} catering package.`,
    };
}

async function PackageTiersPage({ params, searchParams }: Request) {

     const { packageSlug } = await params;
    const { tier } = await searchParams;

    const cateringPackage: { data: TPackageDetails } =
        await getPackageDetails(packageSlug);

    if (!cateringPackage?.data) {
        return <div className="p-4">Package not found.</div>;
    }

    const currentTier = cateringPackage.data.tiers?.find(
        t => String(t.id) === tier
    );

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
                <div className="gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
                    <div
                        className="flex gap-x-3 items-center"
                    >
                        <figure
                            className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden"
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
                            <span className="font-semibold">{pkg.name}</span>
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

                    {
                        !!currentTier &&
                        <div className="">
                            <h2 className="font-semibold mb-3">Tier Package</h2>
                            <div
                                className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-2 border-dashed"
                            >
                                <span className="flex gap-x-2 items-center">
                                    <figure className="w-[100px] h-[120px] rounded-2xl overflow-hidden relative">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${currentTier.photo}`}
                                            alt={String(currentTier.name)}
                                            fill
                                            priority
                                            unoptimized
                                            className="object-cover object-center"
                                        />
                                    </figure>
                                    <h3 className="font-semibold text-lg">{currentTier.name}</h3>
                                    <OpenModal
                                        className='bg-gray-300 px-3 font-semibold text-sm py-1 flex rounded-full'
                                        modal="tier"
                                        queries={{
                                            packageSlug: packageSlug,
                                            tierId: tier
                                        }}>
                                        Details
                                    </OpenModal>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </section>

            <FormShippingWrapper data={pkg} tierId={tier} />


          
        </>
    )
}

export default PackageTiersPage