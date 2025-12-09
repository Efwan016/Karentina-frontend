"use server"

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

export type TSubmitShippingState = {
  message: string;
  field: string;
  data?: {
    slug: string;
    address: string;
    post_code: string;
    notes: string;
    tierId: string;
    started_at: string;
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


export async function submitShipping(
  prevState: TSubmitShippingState,
  formData: FormData
): Promise<TSubmitShippingState> {

  const address = formData.get("address") as string | null;
  const post_code = formData.get("post_code") as string | null;
  const notes = formData.get("notes") as string | null;
  const slug = formData.get("slug") as string | null;
  const started_at = formData.get("started_at") as string | null;
  const tierId = formData.get("catering_tier_id") as string | null;
  
  if (!address) {
      return { message: "Address is required", field: "address" };
  }

  if (!post_code) {
      return { message: "Post Code is required", field: "post_code" };
  }

  if (!notes) {
      return { message: "Notes is required", field: "notes" };
  }
  if (!slug) {
      return { message: "Slug is missing", field: "slug" };
  }

  if (!tierId) { 
      return { message: "Tier ID is required", field: "catering_tier_id" };
  }
  
  if (!started_at) { 
      return { message: "Start date is missing", field: "started_at" };
  }
  
  return {
    message: "Next Step",
    field: "",
    data: {
      slug: slug!,
      address: address!,
      post_code: post_code!,
      notes: notes!,
      tierId: tierId!,
      started_at: started_at!,
    },
  };

}

export async function submitDelivery(
  prevState: TSubmitShippingState,
  formData: FormData
): Promise<TSubmitShippingState> {

  const address = formData.get("address") as string | null;
  const post_code = formData.get("post_code") as string | null;
  const notes = formData.get("notes") as string | null;
  const slug = formData.get("slug") as string | null;
  const started_at = formData.get("started_at") as string | null;
  const tierId = formData.get("catering_tier_id") as string | null;
  
  if (!address) {
      return { message: "Address is required", field: "address" };
  }

  if (!post_code) {
      return { message: "Post Code is required", field: "post_code" };
  }

  if (!notes) {
      return { message: "Notes is required", field: "notes" };
  }
  if (!slug) {
      return { message: "Slug is missing", field: "slug" };
  }

  if (!tierId) { 
      return { message: "Tier ID is required", field: "catering_tier_id" };
  }
  
  if (!started_at) { 
      return { message: "Start date is missing", field: "started_at" };
  }
  
  return {
    message: "Next Step",
    field: "",
    data: {
      slug: slug!,
      address: address!,
      post_code: post_code!,
      notes: notes!,
      tierId: tierId!,
      started_at: started_at!,
    },
  };
}