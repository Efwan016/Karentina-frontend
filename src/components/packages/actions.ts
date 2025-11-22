export async function getPackages() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_API}/api/catering-packages`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.statusText}`);
    }

    return await res.json(); 
  } catch (error) {
    console.error("Error fetching packages:", error);

    return { data: [] };
  }
}


export async function getFilteredPackagesByCityAndCategory(
  citySlug: string,
  categorySlug: string
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_API}/api/filters/catering-packages?category_slug=${categorySlug}&city_slug=${citySlug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error filtering packages:", error);

    return { data: [] };
  }
}
