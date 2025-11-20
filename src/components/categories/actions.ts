import { redirect } from "next/navigation";

export async function getAllCategories() {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/categories`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null; 
  }
}

export async function getCategoryDetails(categorySlug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/category/${categorySlug}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null; 
  }
}

export async function navigateFilterCategories(prevState: unknown, formData: FormData) {
  const category = formData.get("category")
  const city = formData.get("city")

  if(category == ""){
    return {
      message: "Category Not Found",
      field: "category"
    }
  }

  if(city == ""){
    return {
      message: "City Not Found",
      field: "city"
    };
  }

  return redirect(`/categories/${category}?citySlug=${city}`);
}
