import BottomBar from '@/components/bottomBar';
import { Metadata } from 'next'
import Image from 'next/image';
import React from 'react'
import Form from './Form';


export const metaData: Metadata = {
    title: "Orders",
};

function BookingPage() {
    
    return (
        <>
            <section className="relative px-8 mt-28">
                <figure className="w-full h-[219px] relative">
                    <Image
                        src="./images/chef.png"
                        alt="Chief Illustration"
                        fill
                        priority
                        unoptimized
                        className="w-full h-full object-contain object-center"
                    />
                </figure>
            </section>

            <Form />

            <div className='mt-30'></div>
            <BottomBar />
        </>
    )
}

export default BookingPage