export async function getPackages() {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/catering-packages`, {
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
