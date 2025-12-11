import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "@/assets/css/index.css";
import "@/libs/thousands";
import Toaster from "@/components/Toaster";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Adzani",
    default: "Adzani",
  },
  description: "Clean Eats Catering Food Delivery",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <main className="container max-w-sm mx-auto flex flex-col gap-y-5 relative pt-10 pb-16">

        {children}
        </main>
        
        {modal}

        <Toaster />
      </body>
    </html>
  );
}
