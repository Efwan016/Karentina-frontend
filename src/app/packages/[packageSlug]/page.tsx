import { getPackageDetails } from "@/components/packages/actions";
import { TPackage } from "@/components/packages/type";
import { Metadata, ResolvingMetadata } from "next";
import ComposeHeader from "./ComposeHeader";
import Image from "next/image";

type Request = {
    params: {
        packageSlug: string;
    };
};

{/*Generate Metadata*/ }
export async function generateMetadata(
    { params }: Request,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { packageSlug } = await params;

    const cateringPackage: { data: TPackage } | null =
        await getPackageDetails(packageSlug);

    const previous = await parent;


    if (!cateringPackage?.data) {
        return {
            title: `Package Not Found | ${previous.title ?? "App"}`,
            description: "This package does not exist.",
        };
    }


    const pkg = cateringPackage.data;

    return {
        title: `${pkg.name} — Package | ${previous.title ?? "App"}`,
        description: pkg.about ?? `Details for ${pkg.name} catering package.`,
    };
}

{/*Page Component*/ }
export default async function PackageDetailsPage({ params }: Request) {
    const { packageSlug } = await params;

    const cateringPackage: { data : TPackage } =
        await getPackageDetails(packageSlug);

    if (!cateringPackage?.data) {
        return <div className="p-4">Package not found.</div>;
    }

    const pkg = cateringPackage.data;

    return (
        <>
            <ComposeHeader />

            <main className="p-4">
                <div className="">
                    <figure className="relative w-[100px] h-[120px] rounded-2xl overflow-hidden">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_HOST_API}/storage/${pkg.thumbnail}`}
                            alt={pkg.name}
                            fill
                            priority
                            unoptimized
                            className="object-cover object-center"
                        />
                    </figure>

                    <h1 className="font-bold text-xl">{pkg.name}</h1>
                    <p className="mt-2 text-gray-600">{pkg.about}</p>
                </div>
            </main>
        </>
    );
}
