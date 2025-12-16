'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

type Props =  {
    children: ReactNode;
}

function NProgressBar({ children }: Props) {
    return (
        <>
        {children}
        <ProgressBar
          height="8px"
          color="#F97316"
          options={{ showSpinner: false }}
          shallowRouting
        />
        </>
        )
    }

    export default NProgressBar;