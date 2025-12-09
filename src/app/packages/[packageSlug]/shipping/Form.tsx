"use client"

import "@/libs/thousands";
import { useActionState, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

import ArrowCircleDown from "@/assets/icons/Arrow-circle-down"
import CalenderBox from "@/assets/icons/Calender-box"
import Clock from "@/assets/icons/clock"
import PackageIcon from "@/assets/icons/PackageIcon"
import People from "@/assets/icons/People"
import PromoIcon from "@/assets/icons/Promo"
import Truck from "@/assets/icons/Truck"
import PinPoint from "@/assets/icons/PinPoint"
import OfficerBuildingIcon from "@/assets/icons/Officer-building"

import { submitShipping, TSubmitShippingState } from "@/components/packages/actions"
import { TPackageDetails } from "@/components/packages/type"
import { formatDate } from 'date-fns';
import MapIcon from "@/assets/icons/MapIcon";
import Notes from "@/assets/icons/Notes";



export type Props = {
  data: TPackageDetails;
  tierId: string;
}


type TCheckoutShippingItem = NonNullable<TSubmitShippingState["data"]> & {
  price?: number;
  duration?: number;
  quantity?: number;
  tax?: number;
  grandTotal?: number;
  shipping?: {
    address: string;
    post_code: string;
    notes: string;
  };
};

type TCheckoutStore = Record<string, TCheckoutShippingItem>;


const initialState: TSubmitShippingState = {
  message: "",
  field: "",
};



function Form({ data, tierId }: Props) {


const getInitialCheckoutState = () => {
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem("checkout");
            if (stored) {
                return JSON.parse(stored) as TCheckoutStore;
            }
        } catch (e) {
            console.error("Error reading localStorage:", e);
        }
    }
    return {};
};

const [checkout, setCheckout] = useState<TCheckoutStore>(getInitialCheckoutState);
  
  const checkoutSet = useCallback((newValueCallback: (prev: TCheckoutStore) => TCheckoutStore) => {
    setCheckout(prev => {
        const newState = newValueCallback(prev);
        if (typeof window !== 'undefined') {
            localStorage.setItem("checkout", JSON.stringify(newState));
        }
        return newState;
    });
}, []);

  const safeCheckout = (typeof checkout === "object" && checkout !== null)
    ? checkout
    : {};
  const router = useRouter();
  const saved = safeCheckout[data.slug] ?? {};

  const currentTier = data.tiers?.find(
    t => String(t.id) === tierId
  ) ?? null;

  const tax = (currentTier?.price || 0) * 0.11;
  const grandTotal = (currentTier?.price || 0) + tax;

  const [state, formAction] = useActionState(submitShipping, initialState)
  const savedShipping = saved?.shipping || saved || { address: "", post_code: "", notes: "" };


useEffect(() => {
    if (!state.data) return;

    const { slug, tierId: stateTierId } = state.data;
    const paymentData = {
        price: currentTier?.price,
        duration: currentTier?.duration,
        quantity: currentTier?.quantity,
        tax,
        grandTotal,
    };
    Promise.resolve().then(() => {
        try {
            checkoutSet(prev => {
                const previousData = prev[slug] || {};
                const newCheckoutItem = {
                    ...previousData,
                    ...(state.data || {}),
                    ...paymentData,
                    shipping: {
                        address: state.data!.address,
                        post_code: state.data!.post_code,
                        notes: state.data!.notes,
                    },
                }
                return {
                    ...prev,
                    [slug]: newCheckoutItem,
                };
            });

            router.push(`/packages/${slug}/payments?tierId=${stateTierId}`);
        } catch (e) {
            console.error('CRITICAL ERROR DURING LOCALSTORAGE SAVE OR ROUTING:', e);
            alert('CRITICAL SAVE ERROR. Check console!');
        }
    });
}, [state, checkoutSet, router, currentTier, tax, grandTotal]);


  return (

    <form action={formAction}>
      <input type="hidden" value={data.slug} name="slug" />
      <input type="hidden" value={data.id} name="catering_package_id" />
      <input type="hidden" value={tierId} name="catering_tier_id" />
      <input type="hidden" value={saved?.started_at} name="started_at" />

      <div className="flex flex-col gap-y-7 px-4">
        <div
          className="flex flex-col bg-white border border-gray-200 rounded-2xl p-4"
        >
          <input
            type="checkbox"
            name="accordion"
            id="Shipping-address"
            className="peer hidden"
            defaultChecked
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
                    (saved?.started_at ? new Date
                      (saved?.started_at) : new Date(),
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
                  {data.city.name}
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
                className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                name="address"
                id="address"
                rows={3}
                placeholder="Address"
                defaultValue={savedShipping.address || ""}
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
              className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
                name="post_code"
                id="post_code"
                defaultValue={savedShipping.post_code || ""}
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
               className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-blue-600 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                name="notes"
                id="notes"
                rows={3}
                placeholder="Notes"
                defaultValue={savedShipping.notes || ""}
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
            defaultChecked
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
                <span className="font-semibold">Rp {(currentTier?.price || 0)}</span>
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
                <span className="font-semibold">{`${currentTier?.duration} day${(currentTier?.duration || 0) > 1 ? "s" : ""}`}Regular</span>
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
                <span className="font-semibold">{(currentTier?.quantity || 0)} People</span>
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
                <span className="font-semibold">Rp {tax} </span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 z-50 mb-8">
          <div
            className="rounded-full flex justify-between gap-x-3 border border-black bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6"
          >
            <span className="flex flex-col">
              <span className="text-black text-sm">Grand Total</span>
              <span className="font-semibold text-xl">Rp {grandTotal} </span>
            </span>
            <button
              type="submit"
              className="bg-amber-600 rounded-full flex border border-black items-center justify-center text-white px-5 cursor-pointer hover:bg-amber-500 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
