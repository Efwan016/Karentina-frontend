
import { TCategory } from "@/components/categories/type"
import { TKitchen } from "@/components/kitchen/type";
import { TCity } from "@/components/tiers/type";
import { TTiers } from "@/components/tiers/type";
import { TBonus } from "../bonuses/type";
import { TTestimonials } from "../testimonial/type";

export type Tshow = "popular" | "newest"

export type TPackage = {
            "id": number,
            "name": string;
            "slug": string;
            "is_popular": 0 | 1,
            "thumbnail": string;
            "about": string;
            "city": TCity;
            "category": TCategory;
            "kitchen": TKitchen;
            "tiers": TTiers[];
                }

export type TPackageDetails = {
    photos: {
        "id": number,
        "photo": string;
        "catering_package_id": number,
        "deleted_at": null | string;
        "created_at": string;
        "updated_at": string
    }[];
    bonuses: TBonus[];
    testimonials: TTestimonials[]
    tiers: TTiers[]
} & TPackage

export type TBookingDetails = {
    id: number,
        name: string,
        email: string,
        phone: string,
        post_code: string,
        city: string,
        address: string,
        notes: string,
        started_at: string,
        ended_at: string,
        booking_trx_id: string,
        price: number,
        total_tax_amount: number,
        total_amount: number,
        delivery_time: string,
        quantity: number,
        duration: number,
        is_paid: 0 | 1,
        proof: string,
        cateringPackage: TPackage,
        cateringTier: TTiers,
        category: TCategory,
           
}