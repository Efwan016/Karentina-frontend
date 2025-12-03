import React from 'react'
import { TTier } from './type'
import Clock from '@/assets/icons/clock'
import BadgeCheckmark from '@/assets/icons/badge-checkmark'
import People from '@/assets/icons/People'
import Image from 'next/image'
import Link from 'next/link'


export function ContentTier({ packageSlug, data, isPriceShown }: { packageSlug: string, data: TTier; isPriceShown: boolean }) {
    return (
        <div
            className="flex flex-col gap-y-3 h-full bg-white p-4 rounded-3xl relative shadow-[0px_12px_30px_0px_#07041517] border"
        >
            <span className="flex gap-x-2 items-center">
                <figure className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.photo}`}
                        alt={String(data.id)}
                        fill
                        priority
                        unoptimized
                        className="object-cover object-center"
                    />
                </figure>
                <span className="flex flex-col">
                    <h2 className="font-semibold text-lg">{data.name}</h2>
                    <span className="text-gray2 text-sm">{data.tagline}</span>
                </span>
            </span>

            <hr />

            <ul className="flex flex-col gap-y-4">
                {
                    data.benefits.map(benefit => {
                        return (
                            <li className="flex gap-x-2" key={benefit.id}>
                                <span className="text-green-600">
                                    <BadgeCheckmark />
                                </span>
                                <span className="font-semibold">{benefit.name}</span>
                            </li>
                        )
                    })
                }
            </ul>

            {
                isPriceShown && 
                <>
            <hr />

            <span className="flex flex-col gap-y-2">
                <span className="font-semibold text-xl">{data.price.thousands()}</span>
                <span className="flex gap-x-3">
                    <span className="flex gap-x-1">
                        <span className="text-color2">
                            <Clock />
                        </span>
                        <span className="text-gray2">{data.duration} Day{data.duration > 1 && "s" }</span>
                    </span>

                    <span className="flex gap-x-1">
                        <span className="text-color2">
                            <People />
                        </span>
                        <span className="text-gray2">{data.quantity.thousands()} People</span>
                    </span>
                </span>
            </span>

            <hr />
                </>
            }

            <Link href={`/packages/${packageSlug}/informations?tier=${data.id}`}
            className="flex py-3 relative border border-b-gray-200 rounded-full font-semibold justify-center hover:bg-amber-600 hover:text-white hover:border-transparent">
                Choose package
            </Link>

        </div>

        
    )
}