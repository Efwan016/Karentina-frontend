import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom';

type Props = {
    children: ReactNode;
    overrideClassname?: (isPending: boolean) => string[],
    pendingText?: string;
}


function SubmitButton({children, overrideClassname, pendingText}: Props) {
    const{pending} = useFormStatus();
    let className = ["rounded-full flex border border-black items-center justify-center px-5", 
        pending ? "cursor-not-allowed bg-gray-200 text-gray-500" : "bg-amber-600 text-white" 
    ];

    if (overrideClassname) {
        className = overrideClassname(pending);
    }

  return (
    <button
              type="submit"
              className={className.join(" ")} 
              disabled={pending}
              aria-disabled={pending}
              aria-busy={pending}
            >
              {
                pending ? pendingText || "Loading..." : children
              }
            </button>
  )
}

export default SubmitButton