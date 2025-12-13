import React from 'react'
import ComposeHeader from './ComposeHeader';
import Image from 'next/image';
import { TBookingDetails } from '@/components/packages/type';
import { checkBookingByTrxId } from '@/components/packages/actions';
import Notes from '@/assets/icons/Notes';
import People from '@/assets/icons/People';
import { OpenModal } from '@/components/Modal';
import ReceiptIcon from '@/assets/icons/ReceiptIcon';
import ArrowCircleDown from '@/assets/icons/Arrow-circle-down';
import PromoIcon from '@/assets/icons/Promo';
import Clock from '@/assets/icons/clock';
import PackageIcon from '@/assets/icons/PackageIcon';
import MapIcon from '@/assets/icons/MapIcon';
import OfficerBuildingIcon from '@/assets/icons/Officer-building';
import PinPoint from '@/assets/icons/PinPoint';
import CalenderBox from '@/assets/icons/Calender-box';
import PhoneIcon from '@/assets/icons/Phone';
import Mailbox from '@/assets/icons/Mailbox';
import User from '@/assets/icons/User';
import { formatDate } from 'date-fns';
import Truck from '@/assets/icons/Truck';

type Request = {
    params: {
        slug: string;
    };
    searchParams: {
        phone: string;
        [key: string]: string;
    };
};

async function OrdersFoundPage(props: Request) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { phone } = await searchParams;
    
    const bookingDetails: { data: TBookingDetails } = await checkBookingByTrxId(
        params.slug,
        phone
    );

    console.log("🔥 bookingDetails:", bookingDetails);
    console.log("🔥 cateringPackage:", bookingDetails?.data?.cateringPackage);
   
    const isPaid = bookingDetails?.data?.is_paid;

    const pkg = bookingDetails?.data?.cateringPackage;
    const tier = bookingDetails?.data?.cateringTier
 

    return (
        <>
            <ComposeHeader />

            <section className="relative px-4 -mt-20 z-10">
                <div className="gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
                    {
                        isPaid === 0 &&
                        <span className="bg-amber-400 flex gap-x-3 p-3 rounded-2xl items-center">
                            <span className="">
                                <ReceiptIcon />
                            </span>
                            <span className="flex flex-col">
                                <span className="text-sm">Payment Status</span>
                                <span className="font-semibold">Pending</span>
                            </span>
                        </span>

                    }
                    {
                        isPaid === 1 &&

                        <span
                            className="bg-green-600 text-white flex gap-x-3 p-3 rounded-2xl items-center"
                        >
                            <span className="">
                                <ReceiptIcon />
                            </span>
                            <span className="flex flex-col">
                                <span className="text-sm">Payment Status</span>
                                <span className="font-semibold">Success, Waiting Delivery</span>
                            </span>
                        </span>
                    }

                    <div className="flex gap-x-3 items-center">

                        {/* Thumbnail */}
                        <figure className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${pkg.thumbnail}`}
                                alt={pkg.name}
                                fill
                                unoptimized
                                className="object-cover object-center"
                            />
                        </figure>

                        {/* Basic info */}
                        <span className="flex flex-col gap-y-3">
                            <span className="font-semibold">{pkg.name}</span>

                            <span className="flex gap-x-1">
                                <span className="text-color2"><Notes /></span>
                                <span className="text-gray2">{bookingDetails.data.category.name}</span>
                            </span>

                            <span className="flex gap-x-1">
                                <span className="text-color2"><People /></span>
                                <span className="text-gray2">
                                    {bookingDetails.data.cateringTier?.quantity || 0} People
                                </span>
                            </span>
                        </span>
                    </div>

                    {/* Tier */}
                    <div className="">
                        <h2 className="font-semibold mb-3">Tier Package</h2>

                        <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-2 border-dashed">
                            <span className="flex gap-x-2 items-center">

                                <figure className="w-[100px] h-[120px] rounded-2xl overflow-hidden relative">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${bookingDetails.data.cateringTier.photo}`}
                                        alt={String(bookingDetails.data.cateringTier.name)}
                                        fill
                                        priority
                                        unoptimized
                                        className="object-cover object-center"
                                    />
                                </figure>

                                <h3 className="font-semibold text-lg">{bookingDetails.data.cateringTier.name}</h3>

                                <OpenModal
                                    className='bg-gray-300 px-3 font-semibold text-sm py-1 flex rounded-full'
                                    modal="tier"
                                    queries={{
                                        packageSlug: bookingDetails.data.cateringPackage?.slug,
                                        tierId: bookingDetails.data.cateringTier.tierId
                                    }}
                                >
                                    Details
                                </OpenModal>

                            </span>
                        </div>
                    </div>

                </div>
            </section>

            <div className="flex flex-col gap-y-7 px-4">

                <div
                    className="flex flex-col bg-white border border-gray-200 rounded-2xl p-4"
                >
                    <input
                        type="checkbox"
                        name="accordion"
                        id="customer-information"
                        className="peer hidden"
                    /><label
                        htmlFor="customer-information"
                        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                    >
                        <h6 className="text-xl font-bold">Customer Information</h6>
                        <span
                            className="text-blue-700 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
                        >
                            <ArrowCircleDown />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
                    >
                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-blue-700"
                            >
                                <User />
                            </span>
                            <input
                                readOnly
                                type="text"
                                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-e-blue-700 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                defaultValue={bookingDetails.data.name ?? ""}
                            />
                            <label
                                htmlFor="fullname"
                                className="absolute pointer-events-none text-black inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Full Name
                            </label>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2"
                            >
                                <Mailbox />
                            </span>
                            <input
                                readOnly
                                type="email"
                                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                                name="email"
                                id="email"
                                placeholder="Email"
                                defaultValue={bookingDetails.data.email ?? ""}
                            />
                            <label
                                htmlFor="email"
                                className="absolute pointer-events-none text-black inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Email
                            </label>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2"
                            >
                                <PhoneIcon />
                            </span>
                            <input
                                readOnly
                                type="tel"
                                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                defaultValue={bookingDetails.data.phone ?? ""}
                            />
                            <label
                                htmlFor="phone"
                                className="absolute pointer-events-none text-black inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Phone
                            </label>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2"
                            >
                                <CalenderBox />
                            </span>
                            <input
                                readOnly
                                type="date"
                                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
                                name="started_at"
                                id="started_at"
                                placeholder="Start At"
                                defaultValue={bookingDetails.data.started_at ?? ""}
                            />
                            <label
                                htmlFor="started_at"
                                className="absolute pointer-events-none text-black inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Start At
                            </label>
                        </div>
                    </div>
                </div>


                <div
                    className="flex flex-col bg-white border border-gray-200 rounded-2xl p-4"
                >
                    <input
                        type="checkbox"
                        name="accordion"
                        id="Shipping-address"
                        className="peer hidden"
                    /><label
                        htmlFor="Shipping-address"
                        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                    >
                        <h6 className="text-xl font-bold">Shipping Address</h6>
                        <span
                            className="text-blue-700 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
                        >
                            <ArrowCircleDown />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
                    >
                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <CalenderBox />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-gray2">Started At</span>
                                <span className="font-semibold">
                                    {formatDate
                                        (bookingDetails.data.started_at ? new Date
                                            (bookingDetails.data.started_at) : new Date(),
                                            'dd MMMM yyyy'
                                        )}
                                </span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <Clock />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-gray2">Time</span>
                                <span className="font-semibold">Lunch Time</span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <PinPoint />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-gray2">City</span>
                                <span className="font-semibold">
                                    {bookingDetails.data.cateringPackage.city.name}
                                </span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-4 top-5 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <OfficerBuildingIcon />
                            </span>
                            <textarea
                                readOnly
                                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                                name="address"
                                id="address"
                                rows={3}
                                placeholder="Address"
                                defaultValue={bookingDetails.data.address || ""}
                            ></textarea>
                            <label
                                htmlFor="address"
                                className="absolute pointer-events-none text-gray-700 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Address
                            </label >
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <MapIcon />
                            </span>
                            <input
                                readOnly
                                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color-gray-700 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
                                name="post_code"
                                id="post_code"
                                defaultValue={bookingDetails.data.post_code || ""}
                            />
                            <label
                                htmlFor="post_code"
                                className="absolute pointer-events-none text-gray-700 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Post code
                            </label>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-4 top-5 aspect-square flex items-center justify-center text-blue-600"
                            ><Notes />
                            </span>
                            <textarea
                                readOnly
                                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-blue-600 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                                name="notes"
                                id="notes"
                                rows={3}
                                placeholder="Notes"
                                defaultValue={bookingDetails.data.notes || ""}
                            />
                            <label
                                htmlFor="notes"
                                className="absolute pointer-events-none text-gray-700 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                            >Notes
                            </label>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col bg-white border border-gray-300 rounded-2xl p-4"
                >
                    <input

                        type="checkbox"
                        name="accordion"
                        id="payment-details"
                        className="peer hidden"
                    /><label
                        htmlFor="payment-details"
                        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                    >
                        <h6 className="text-xl font-bold">Payment Details</h6>
                        <span
                            className="text-blue-700 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
                        >
                            <ArrowCircleDown />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
                    >
                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-400"
                            >
                                <PackageIcon />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-black">Package Catering</span>
                                <span className="font-semibold">Rp {(bookingDetails.data.cateringTier.price || 0)}</span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <Clock />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-black">Duration</span>
                                <span className="font-semibold">{`${bookingDetails.data.cateringTier.duration} day${(bookingDetails.data.cateringTier.duration || 0) > 1 ? "s" : ""}`}Regular</span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <People />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-black">Quantity</span>
                                <span className="font-semibold">{(bookingDetails.data.cateringTier.quantity || 0)} People</span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <Truck />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-black">Delivery</span>
                                <span className="font-semibold">Rp 0 (Free)</span>
                            </div>
                        </div>

                        <div className="flex relative">
                            <span
                                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-blue-600"
                            >
                                <PromoIcon />
                            </span>
                            <div
                                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray-300"
                            >
                                <span className="text-sm text-black">PPN 11%</span>
                                <span className="font-semibold">Rp {bookingDetails.data.total_tax_amount} </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
                >
                    <input
                        type="checkbox"
                        name="accordion"
                        id="proof"
                        className="peer hidden"
                        defaultChecked
                    /><label
                        htmlFor="proof"
                        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                    >
                        <h6 className="text-xl font-bold">Upload Proof of Payment</h6>
                        <span
                            className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
                        >
                            <ArrowCircleDown />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
                    >
                        <span className='relative w-[390] aspect-video rounded-2xl overflow-hidden'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_HOST_API}/${bookingDetails.data.proof}`}
                                alt={`${bookingDetails.data.name} Proof payment`}
                                fill
                                unoptimized
                                className="object-cover object-center"
                            />
                        </span>
                    </div>
                </div>

                <div className="sticky bottom-4 z-50 mb-8">

                    <a
                        href=''
                        className="bg-amber-600 rounded-full flex border border-black items-center justify-center text-white px-5 cursor-pointer hover:bg-amber-500 transition-colors"
                    >
                        Contact Customer Service
                    </a>
                </div>
            </div>
        </>
    );
}

export default OrdersFoundPage;
