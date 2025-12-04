"use client"

import ArrowCircleDown from "@/assets/icons/Arrow-circle-down"
import CalenderBox from "@/assets/icons/Calender-box"
import Clock from "@/assets/icons/clock"
import Mailbox from "@/assets/icons/Mailbox"
import PackageIcon from "@/assets/icons/PackageIcon"
import People from "@/assets/icons/People"
import PhoneIcon from "@/assets/icons/Phone"
import PromoIcon from "@/assets/icons/Promo"
import Truck from "@/assets/icons/Truck"
import User from "@/assets/icons/User"
import { submitInformation } from "@/components/packages/actions"
import { TPackageDetails } from "@/components/packages/type"
import { useLocalStorage } from "@uidotdev/usehooks"
import { use, useEffect } from "react"
import { useFormState } from "react-dom"
import { TSubmitInformationState } from "@/components/packages/actions";

type Props = {
  data: TPackageDetails;
  tierId: string;
}
type Tier = {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type TCheckoutItem = NonNullable<TSubmitInformationState["data"]>;
type TCheckoutStore = Record<string, TCheckoutItem>;


const initialState: TSubmitInformationState = {
  message: "",
  field: "",
};



function Form({ data, tierId }: Props) {

  const [checkout, checkoutSet] = useLocalStorage<TCheckoutStore>("checkout", {});

  const currentTier = data.tiers?.find(
    t => String(t.id) === tierId
  ) ?? null;
  

  const tax = (currentTier?.price || 0) * 0.11;
  const grandTotal = (currentTier?.price || 0) + tax;

  const [state, formAction] = useFormState(submitInformation, initialState);

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
    },
  }));
}, [state]);





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
                <User />
              </span>
              <input
                type="text"
                className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                name="name"
                id="name"
                placeholder="Full Name"
              />
              <label
                htmlFor="fullname"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
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
              />
              <label
                htmlFor="email"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
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
              />
              <label
                htmlFor="phone"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
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
              />
              <label
                htmlFor="started_at"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >Start At
              </label>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
        >
          <input

            type="checkbox"
            name="accordion"
            id="payment-details"
            className="peer hidden"
            checked
          /><label
            htmlFor="payment-details"
            className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
          >
            <h6 className="text-xl font-bold">Payment Details</h6>
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
                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2"
              >
                <PackageIcon />
              </span>
              <div
                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
              >
                <span className="text-sm text-gray2">Paket Catering</span>
                <span className="font-semibold">Rp 189.309.499</span>
              </div>
            </div>

            <div className="flex relative">
              <span
                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2"
              >
                <Clock />
              </span>
              <div
                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
              >
                <span className="text-sm text-gray2">Duration</span>
                <span className="font-semibold">30 Days Regularly</span>
              </div>
            </div>

            <div className="flex relative">
              <span
                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2"
              >
                <People />
              </span>
              <div
                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
              >
                <span className="text-sm text-gray2">Quantity</span>
                <span className="font-semibold">125 People</span>
              </div>
            </div>

            <div className="flex relative">
              <span
                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2"
              >
                <Truck />
              </span>
              <div
                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
              >
                <span className="text-sm text-gray2">Delivery</span>
                <span className="font-semibold">Rp 0 (Free)</span>
              </div>
            </div>

            <div className="flex relative">
              <span
                className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2"
              >
                <PromoIcon />
              </span>
              <div
                className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
              >
                <span className="text-sm text-gray2">PPN 11%</span>
                <span className="font-semibold">Rp 83.495.666</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 z-50 mb-8">
          <div
            className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6"
          >
            <span className="flex flex-col">
              <span className="text-gray2 text-sm">Grand Total</span>
              <span className="font-semibold text-xl">Rp 57.394.233</span>
            </span>
            <button
              type="submit"
              className="bg-color1 rounded-full flex items-center justify-center text-white px-5"
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
