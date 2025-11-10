import { TCategory } from "../categories/type"

export type Tshow = "popular" | "newest"

export type TPackage = {
    "id": number,
            "name": string;
            "slug": string;
            "is_popular": 0 | 1,
            "thumbnail": string;
            "about": string;
            "city": [],
            "category": TCategory,
            "tiers": [];
                }
            
    