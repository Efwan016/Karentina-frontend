"use client"

import "@/libs/thousands";
import { useLocalStorage } from "@uidotdev/usehooks"
import { useEffect } from "react"
import { useActionState } from "react";
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

import { submitShipping, TSubmitInformationState, TSubmitShippingState } from "@/components/packages/actions"
import { TPackageDetails } from "@/components/packages/type"
import { formatDate } from 'date-fns';
import MapIcon from "@/assets/icons/MapIcon";
import Notes from "@/assets/icons/Notes";
import PhoneIcon from "@/assets/icons/Phone";
import Mailbox from "@/assets/icons/Mailbox";
import User from "@/assets/icons/User";


export type Props = {
  data: TPackageDetails;
  tierId: string;
}


type TCheckoutShippingItem = Partial<TSubmitShippingState["data"]> & {
  payment?: {
    price: number;
    duration: number;
    quantity: number;
    tax: number;
    grandTotal: number;
  };
};

type TCheckoutStore = Record<string, TCheckoutShippingItem>;


const initialState: TSubmitShippingState = {
  message: "",
  field: "",
};



function Form({ data, tierId }: Props) {

  const [checkout, checkoutSet] = useLocalStorage<TCheckoutStore>("checkout", {});

  const safeCheckout = (typeof checkout === "object" && checkout !== null)
    ? checkout
    : {};


  const router = useRouter();
  const savedShipping = (safeCheckout[data.slug] as TCheckoutShippingItem) ?? {};
  const savedInfo = (safeCheckout[data.slug] as Partial<TSubmitInformationState["data"]>) ?? {};
  
 const payment = (safeCheckout[data.slug] as TCheckoutShippingItem)?.payment;

 const computedTax = payment ? payment.price * 0.11 : 0;
const computedGrand = payment ? payment.price + computedTax : 0;

  const [state, formAction] = useActionState(submitShipping, initialState);

useEffect(() => {
  if (state.field) {
    const el = document.getElementById(state.field);
    if (el) el.focus();
  }

  if (!state.data) return;

  const { slug } = state.data;

  checkoutSet(prev => ({
    ...prev,
    [slug]: {
      ...prev[slug],
      ...state.data,
      payment, 
    }
  }));

  router.push(`/packages/${slug}/payments?tierId=${tierId}`);
}, [
  state,
  payment,
  checkoutSet,
  router,
  tierId
]);



  return (

    <form action={formAction}>
      <input type="hidden" value={data.slug} name="slug" />
      <input type="hidden" value={data.id} name="catering_package_id" />
      <input type="hidden" value={tierId} name="catering_tier_id" />

      <div className="flex flex-col gap-y-7 px-4">
         <div
                  className="flex flex-col bg-white border border-gray-200 rounded-2xl p-4"
                >
                  <input
                    type="checkbox"
                    name="accordion"
                    id="customer-information"
                    className="peer hidden"
                    defaultChecked
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
                        type="text"
                        className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-e-blue-700 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        defaultValue={savedInfo.name ?? ""}
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
                        type="email"
                        className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                        name="email"
                        id="email"
                        placeholder="Email"
                        defaultValue={savedInfo.email ?? ""}
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
                        type="tel"
                        className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        defaultValue={savedInfo.phone ?? ""}
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
                        type="date"
                        className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
                        name="started_at"
                        id="started_at"
                        placeholder="Start At"
                        defaultValue={savedInfo.started_at ?? ""}
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
            defaultChecked
          /><label
            htmlFor="customer-information"
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
                    (savedInfo?.started_at ? new Date
                      (savedInfo.started_at) : new Date(),
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
                defaultValue={savedShipping?.address}
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
                type="text"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-blue-600 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="post_code"
                id="post_code"
                placeholder="Post code"
                defaultValue={savedShipping?.post_code}
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
                defaultValue={savedShipping?.notes}
              ></textarea>
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
                <span className="font-semibold">Rp {(payment?.price)}</span>
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
                <span className="font-semibold">{`${payment?.duration} day${(payment?.duration || 0) > 1 && "s"}`}Regular</span>
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
                <span className="font-semibold">{(payment?.quantity || 0)} People</span>
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
                <span className="font-semibold">Rp {payment?.tax ?? computedTax} </span>
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
              <span className="font-semibold text-xl">Rp {payment?.grandTotal ?? computedGrand} </span>
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
