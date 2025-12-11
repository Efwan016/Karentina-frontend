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

import { submitPayment, TPayment } from "@/components/packages/actions"
import { TPackageDetails } from "@/components/packages/type"
import { formatDate } from 'date-fns';
import MapIcon from "@/assets/icons/MapIcon";
import Notes from "@/assets/icons/Notes";
import User from "@/assets/icons/User";
import Mailbox from "@/assets/icons/Mailbox";
import PhoneIcon from "@/assets/icons/Phone";
import BcaIcon from "@/assets/icons/BCAIcon";
import BadgeCheckmark from "@/assets/icons/badge-checkmark";
import MandiriIcon from "@/assets/icons/MandiriIcon";
import ReceiptIcon from "@/assets/icons/ReceiptIcon";
import { toast } from "react-toastify";


export type Props = {
  data: TPackageDetails;
  tierId: string;
}


type TCheckoutPaymentItem = NonNullable<TPayment["data"]> & {
  name: string;
  email: string;
  phone: number;
  started_at?: string;
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

type TCheckoutStore = Record<string, TCheckoutPaymentItem>;


const initialState: TPayment = {
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

  const [state, formAction] = useActionState(submitPayment, initialState)
  const savedShipping: { address: string; post_code: string; notes: string; } =
    saved && typeof saved.shipping === "object"
      ? saved.shipping
      : { address: "", post_code: "", notes: "" };


  useEffect(() => {
    if (!state.data) {
      if (state.data === "toaster"){
        toast.error(state.message)
      } else  {
        const element = document.getElementById(state.field);
        element?.focus();
        element?.click();
        element?.scrollIntoView({
          behavior: "smooth",
        })
      }
      return;
    }

    Promise.resolve().then(() => {
      try {
        checkoutSet(prev => {
          const previousData = {...prev};
          if (state.data?.slug) {
            delete previousData[state.data.slug]
          }
          
          return previousData;
        });

        if (state.data) {
          router.push(`/packages/${data.slug}/success?tierId=${tierId}&phone=${state.data.phone}&trx-id=${state.data.booking_trx_id}`);
        }
      } catch (e) {
        console.error('CRITICAL ERROR DURING LOCALSTORAGE SAVE OR ROUTING:', e);
        alert('CRITICAL SAVE ERROR. Check console!');
      }
    });
  }, [state, checkoutSet, router, currentTier, tax, grandTotal, data.slug, tierId]);
  
      const pkg = data;


  return (

    <form action={formAction}>
      <input type="hidden" value={data.slug} name="slug" />
      <input type="hidden" value={data.id} name="catering_package_id" />
      <input type="hidden" value={tierId} name="catering_tier_id" />
      <input type="hidden" value={saved?.started_at ?? ""} name="started_at" />

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
                defaultValue={saved.name ?? ""}
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
                defaultValue={saved.email ?? ""}
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
                defaultValue={saved.phone ?? ""}
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
                defaultValue={saved.started_at ?? ""}
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
                readOnly
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
                readOnly
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color-gray-700 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
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
                readOnly
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

        <section className="relative flex flex-col gap-y-5">
          <h2 className="font-semibold">Send Payment to</h2>
          <div
            className="flex items-center gap-x-3 bg-white border border-gray1 p-4 rounded-2xl"
          >
            <BcaIcon />

            <span className="flex flex-col">
              <span className="flex gap-x-2">
                <h3 className="font-semibold">{pkg.kitchen.name}</h3>
                <span className="text-color3">
                  <BadgeCheckmark />
                </span>
              </span>
              <span className="text-sm text-gray2">8008129839</span>
            </span>
          </div>

          <div
            className="flex items-center gap-x-3 bg-white border border-gray1 p-4 rounded-2xl"
          >
            <MandiriIcon />

            <span className="flex flex-col">
              <span className="flex gap-x-2">
                <h3 className="font-semibold">{pkg.kitchen.name}</h3>
                <span className="text-color3">
                  <BadgeCheckmark />
                </span>
              </span>
              <span className="text-sm text-gray2">12379834983281</span>
            </span>
          </div>
        </section>

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
            <div className="flex relative">
              <span
                className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2"
              >
                <ReceiptIcon />
              </span>
              <input
                accept="image/*"
                type="file"
                className="pl-12 w-full pt-8 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none file:hidden"
                name="proof"
                id="proof"
                placeholder="Add an attachment"
              />
              <label
                htmlFor="proof"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-6 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >Add an attachment
              </label>
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
