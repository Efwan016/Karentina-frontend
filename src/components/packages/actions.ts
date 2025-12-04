
import { redirect } from 'next/navigation';

export type TSubmitInformationState = {
  message: string;
  field: string;
  data?: {
    slug: string;
    name: string;
    email: string;
    phone: string;
    started_at: string;
    tierId: string;
  };
};


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

export async function getPackageDetails(packageSlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_API}/api/catering-package/${packageSlug}`,
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

    if (res.status === 404) {
      return { data: [] };
    }

    if (!res.ok) {
      throw new Error(`Failed: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error filtering packages:", error);
    return { data: [] };
  }
}

export async function submitInformation(
  prevState: TSubmitInformationState,
  formData: FormData
): Promise<TSubmitInformationState> {

  const name = formData.get("name") as string | null;
  const phone = formData.get("phone") as string | null;
  const email = formData.get("email") as string | null;
  const slug = formData.get("slug") as string | null;
  const started_at = formData.get("started_at") as string | null;
  const tierId = formData.get("catering_tier_id") as string | null;

  if (!name) return { message: "Name is required", field: "name" };
  if (!email) return { message: "Email is required", field: "email" };
  if (!phone) return { message: "Phone is required", field: "phone" };
  if (!started_at) return { message: "Start date is required", field: "started_at" };
  if (!slug) return { message: "Slug is missing", field: "slug" };
  if (!tierId) return { message: "Tier ID is required", field: "tierId" };

  return {
    message: "Next Step",
    field: "",
    data: {
      slug,
      name,
      email,
      phone,
      started_at,
      tierId,
    },
  };
}

export function redirectToCheckout(slug: string, tierId: string) {
  redirect(`/packages/${slug}/checkout?tierId=${tierId}`);
}
