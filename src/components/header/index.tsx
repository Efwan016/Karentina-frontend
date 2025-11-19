"use client";

import ArrowCircleLeft from '@/assets/icons/Arrow-circle-left'
import Dots4 from '@/assets/icons/Dots4';
import ThumbsUp from '@/assets/icons/ThumbsUp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';


type TBack = {
    historyBack: boolean;

} & (
        | {
            historyBack: true;
        }
        | {
            historyBack: false;
            url: string;
        }
    )

type TMore = {
    display: boolean;

} & (
        | {
            display: false;
        }
        | {
            display: true;
            onClick: MouseEventHandler<HTMLSpanElement>
        }
    )

type Props = {
    appendClassName: string,
    back: TBack,
    thumbsUp: TMore,
    more: TMore,
    tittle?: string,
}

function Header({
    appendClassName, back, tittle, more, thumbsUp
}: Props) {

    const router = useRouter()

    return (
        <header
           className={["flex items-center justify-between px-4 w-full gap-x-4", appendClassName].join(" ")}
        >
            {
                back.historyBack ?
                    <span onClick={router.back} className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-blue-700 cursor-pointer">
                        <ArrowCircleLeft />
                    </span>

                    :

                    <Link
                        href={back.url}
                        className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-blue-700"
                    >
                        <ArrowCircleLeft />
                    </Link>

            }

            {
                !!tittle ? (
                    <>
                        <h1 className="mx-auto text-lg font-semibold">{tittle}</h1>
                        {!more.display && !thumbsUp.display && (<span className="ml-auto"></span>)}
                    </>
                ) : (
                    <span className="mx-auto">

                    </span>
                )}

            {
                thumbsUp.display && <span className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-blue-700" onClick={thumbsUp.onClick}>
                    <ThumbsUp />
                </span>
            }
            {
                more.display && <span className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-blue-700" onClick={more.onClick}>
                    <Dots4 />
                </span>
            }
        </header>
    )
}

export default Header;