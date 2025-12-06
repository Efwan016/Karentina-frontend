"use client";

import dynamic from "next/dynamic";
import type { Props as FormProps } from "./Form";


const Form = dynamic(() => import("./Form"), { ssr: false });

export default function FormWrapper(props: FormProps) {
  return <Form {...props} />;
}
