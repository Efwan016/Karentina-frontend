"use client";

import dynamic from "next/dynamic";
import type { Props } from "./Form";

const Form = dynamic(() => import("./Form"), { ssr: false });

export default function FormShippingWrapper(props: Props) {
  return <Form {...props} />;
}
