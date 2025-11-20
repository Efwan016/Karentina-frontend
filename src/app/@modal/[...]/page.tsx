import ModalFilterCategories from "@/components/categories/ModalFilterCategories";
import {
    PreventScrolling,
    RouterBack,
    TModalPosRegistered,
    TModalRegistered,
} from "@/components/Modal";
import React from "react";

type Request = {
    searchParams: Promise<{
        modal?: TModalRegistered;
        "modal-pos"?: TModalPosRegistered;
        [key: string]: string | undefined;
    }>;
};

export default async function Page(props: Request) {
    const searchParams = await props.searchParams;

    const modal = searchParams.modal;
    const modalPos = searchParams["modal-pos"];

    if (!modal) return null;

    const modalPosition =
        modalPos === "bottom" ? "items-end" : "items-center justify-center";

    const modalWrapper =
        modalPos === "bottom"
            ? "bg-white rounded-t-2xl flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245]"
            : "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20";

    return (
        <>
            <div
                className={[
                    "fixed inset-0 z-50 bg-black flex justify-center",
                    modalPosition,
                ].join(" ")}
            >
                <div className={modalWrapper}>
                    {
                        searchParams.modal === "filter-category" &&
                        <ModalFilterCategories categorySlug={searchParams.categorySlug} />
                    }
                </div>

                <RouterBack />
            </div>

            <PreventScrolling />
        </>
    );
}
