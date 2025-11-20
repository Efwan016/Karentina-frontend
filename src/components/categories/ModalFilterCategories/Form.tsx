"use client"

import { TCity } from "@/components/cities/type";
import { TCategory } from "@/components/categories/type";
import { useFormState } from "react-dom";
import { navigate } from "next/dist/client/components/segment-cache-impl/navigation";
import { navigateFilterCategories } from "../actions";

type Props = {
    categorySlug: string;
    categories: TCategory[];
    cities: TCity[];
}

function FormFilterCategories({
    categorySlug,
    categories,
    cities
}: Props) {
const [, formAction] = useFormState(navigateFilterCategories, {
    message: "", 
    field: "",
});
return (
     <form action={formAction} className=" flex flex-col gap-y-4">
            <h6 className="text-sm font-semibold">Set Filter (2)</h6>
            <div className="flex flex-col gap-y-4">
                <h6 className="text-sm font-semibold">Category</h6>
            

            {categories.map((category) => {
                return (
                        <label
                            htmlFor={`${category.id}-${categorySlug.slug}`}
                            className="flex gap-x-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="categories"
                                id={`${category.id}-${categorySlug.slug}`}
                                className="hidden peer"
                            />
                            <span className="radio p-1 rounded-full border border-color2 w-6 aspect-square peer-checked:[&>span]:opacity-100">
                                <span className="aspect-square h-full block rounded-full opacity-0 bg-color2 transition-all duration-300"></span>
                            </span>

                        <span className="">{category.name}</span>
                        </label>
                    );
                })}

            </div>
        </form>
)
    
    
}

export default FormFilterCategories