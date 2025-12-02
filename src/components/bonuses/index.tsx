import React from 'react'
import { TBonus } from './type';
import Image from 'next/image';
import Link from 'next/link';

type ContentBonusProps = {
    data: TBonus;
    href: string;

};


export function ContentBonus({ data, href }: ContentBonusProps) {
    return (
        <Link 
            href={href} 
            className='flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border'
        >
            <figure className='w-full aspect-video rounded-2xl overflow-hidden relative'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${data.photo}`}
                    alt={String(data.id)}
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </figure>

            <span className='font-semibold'> {data.name} </span>
        </Link>
    )
}