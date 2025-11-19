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

