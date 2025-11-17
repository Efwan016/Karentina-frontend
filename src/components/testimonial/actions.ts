export async function getAllTestimonial() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API}/api/testimonials`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch testimonials: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return null; 
  }
}
