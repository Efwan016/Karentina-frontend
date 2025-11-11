import { TCategory } from "@/components/categories/type"
import { TKitchen } from "@/components/kitchen/type";
import { TCity } from "@/components/tiers/type";
import { TTiers } from "@/components/tiers/type";

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
            
    