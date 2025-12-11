import ReceiptIcon from '@/assets/icons/ReceiptIcon';
import { checkBookingByTrxId, getPackageDetails } from '@/components/packages/actions';
import { TBookingDetails, TPackageDetails } from '@/components/packages/type';
import Slider from '@/components/Slider';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

type Request = {
    params: {
        packageSlug: string;
    }

    searchParams: Promise<{
        "trx-id"?: string;
        phone: string;
    }>;
};

export async function generateMetadata(
    { params, searchParams }: Request,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { packageSlug } = await params;
    const resolvedSearchParams = await searchParams;

    const bookingDetails: { data: TBookingDetails } | null =
        await checkBookingByTrxId(packageSlug, resolvedSearchParams.phone);

    const previous = await parent;


    if (!bookingDetails?.data) {
        return {
            title: `Booking Not Found | ${previous.title ?? "App"}`,
            description: "This Oder does not exist.",
        };
    }


    const pkg = bookingDetails.data;

    return {
        title: `Booking Payments | ${pkg.name} — Package | ${previous.title ?? "App"}`,
        description: `Details for ${pkg.name} catering package.`,
    };
}

async function BookingSuccessPage({ params, searchParams }: Request) {
    const { packageSlug } = await params;
    const resolvedSearchParams = await searchParams;

    const bookingDetails: { data: TBookingDetails } =
        await checkBookingByTrxId(resolvedSearchParams["trx-id"] || "", resolvedSearchParams.phone);

        const cateringPackage: { data: TPackageDetails } =
                await getPackageDetails(packageSlug);

    return (
        <>
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
                <div
                    className="flex left-0 right-0 gap-x-4 mx-4 bg-white shadow-[0px_12px_30px_0px_#07041517] p-4 -translate-y-1/2 rounded-3xl justify-between absolute top-full z-20"
                >
                    <span className="flex flex-col gap-y-2">
                        <h1 className="flex gap-x-1">
                            <span className="text-color2">
                                <ReceiptIcon />
                            </span>

                            <span className="text-gray2 text-sm"> Booking Transaction ID </span>
                        </h1>
                        <span className="font-bold text-xl"> {bookingDetails.data?.booking_trx_id ?? ''} </span>
                    </span>
                </div>
            </section>

            <section className="relative mt-16 flex flex-col items-center gap-y-4 -bottom-10">
                <h2 className="font-bold text-2xl text-center">Booking Finished</h2>
                <p className="px-4 text-center text-gray2">
                    Use the booking code above to check your reservation status.
                </p>

                <div className="flex flex-col gap-y-4">
                    <Link
                        href="/bookings"
                        className="bg-amber-600 text-white rounded-full inline-flex items-center justify-center px-5 py-3 "
                    >
                        View My Booking
                    </Link>

                    <Link
                        href='/'
                        className="bg-white border border-gray-500 rounded-full inline-flex items-center justify-center px-5 py-3"
                    >
                        Book Other Package
                    </Link>
                </div>
            </section>
        </>
    )
}

export default BookingSuccessPage