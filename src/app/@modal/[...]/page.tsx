import { PreventScrolling, RouterBack, TModalPosRegistered, TModalRegistered } from "@/components/Modal";
import React from "react";

type Request = {
    searchParams: {
        modal: TModalRegistered,
        'modal-pos': TModalPosRegistered,
        [key : string]: string;
    }
};

function Page({searchParams}: Request) {

    if (searchParams.modal) {
        let modalPosition = "items-center justify-center";
        let modalWrapper = "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20"
           
        if (searchParams['modal-pos'] === "bottom") {
            modalPosition = "items-end";
            modalWrapper = "bg-white rounded-t-2xl flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245]";
        }
        return (
          <>
          <div className={['fixed inset-0 z-50 bg-color4/80 items-center justify-center', modalPosition].join(" ")}>
            <div className={modalWrapper}>


            </div>
            <RouterBack />
            
          </div>
          <PreventScrolling />
          </>
        );
    }

    return null;
}

export default Page