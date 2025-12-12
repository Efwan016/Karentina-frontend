"use client"
import PhoneIcon from '@/assets/icons/Phone'
import ReceiptIcon from '@/assets/icons/ReceiptIcon'
import { navigateOrderByTrxId, TPayment } from '@/components/packages/actions';
import React, { useActionState, useEffect } from 'react'
import { useRouter } from "next/navigation";



const initialState : TPayment = {
  message: "",
  field: "",
};

function Form() {
    const router = useRouter();
    const[state, formAction]= useActionState(navigateOrderByTrxId, initialState);

     useEffect(() => {
    if (state.message === "redirect" && state.data) {
      router.push(`/orders/${state.data.slug}?phone=${state.data.phone}`);
    }
  }, [state, router]);
  return (
    <form action={formAction}>
        <section
          className="relative flex flex-col items-center gap-y-4 w-full px-4"
        >
          <h2 className="font-bold text-2xl text-center">View Your Order</h2>

          <div className="flex relative w-full">
            <span
              className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-blue-700"
              >
                <PhoneIcon />
            </span>
            <input
              type="tel"
              className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-blue-700 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
              name="phone"
              id="phone"
              placeholder="Phone"
            />
            <label
              htmlFor="phone"
              className="absolute pointer-events-none text-gray-600 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >Phone
              </label>
          </div>

          <div className="flex relative w-full">
            <span
              className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-blue-700"
              >
                <ReceiptIcon />
            </span>
            <input
              type="text"
              className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-blue-700 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
              name="booking_trx_id"
              id="booking_trx_id"
              placeholder="booking_trx_id"
            />
            <label
              htmlFor="booking_trx_id"
              className="absolute pointer-events-none text-gray-600 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >
                Booking Transaction ID
              </label>
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="bg-amber-600 text-white rounded-full inline-flex items-center justify-center px-5 py-3 w-full"
            >
              Find My Order
            </button>
          </div>
        </section>
      </form>
  )
}

export default Form