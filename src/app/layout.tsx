import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "@/assets/css/index.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Katerina",
    default: "Katerina",
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
      <body
      >
        {children}
        
        {modal}
      </body>
    </html>
  );
}
