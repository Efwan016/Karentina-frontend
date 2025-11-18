"use client"

import HelpIcon from "@/assets/icons/Help"
import HomeIcon from "@/assets/icons/Home"
import OrderIcon from "@/assets/icons/Order"
import PromoIcon from "@/assets/icons/Promo"
import Link from "next/link"
import { usePathname } from "next/navigation"


const BottomBar = () => {
    const pathname = usePathname()

    const mainMenu = [
        {
            key: "homepage",
            label: "Home",
            icon: <HomeIcon />,
            slug: "/",
        },
        {
            key: "order",
            label: "Order",
            icon: <OrderIcon />,
            slug: "/orders",
        },
        {
            key: "promo",
            label: "Promo",
            icon: <PromoIcon />,
            slug: "/promos",
        },
        {
            key: "help",
            label: "Help",
            icon: <HelpIcon />,
            slug: "/helps",
        },
    ]

    const isMenuActive = (slug: string) => {
        return (
            pathname === slug ||
            (pathname.startsWith(slug) &&
                pathname.charAt(slug.length) === "/")
        )
    }

    return (
        <div className="sticky bottom-4 px-4 z-50">
            <ul className="rounded-full flex justify-evenly gap-x-3 bg-amber-600 shadow-[0px_12px_30px_0px_#07041517] p-3">
                {mainMenu.map((menu) => {
                    const active = isMenuActive(menu.slug)

                    return (
                        <li key={menu.key}>
                            <Link
                                aria-current={active ? "true" : "false"}
                                href={menu.slug}
                                className={[
                                    "flex flex-col items-center rounded-full px-3 py-1 w-[70px]",
                                    active
                                        ? "bg-amber-300 text-red-700"
                                        : "text-gray-500 hover:text-gray-700",
                                ].join("")}
                            >
                                {menu.icon}
                                <span className="text-sm">{menu.label}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BottomBar
