import React from 'react'
import { getPackageDetails } from '../packages/actions';
import { TPackageDetails } from '../packages/type';
import { ContentTier } from '.';

type Props = {
    packageSlug: string;
    tierId: string;
}

async function ModalDetailTier({packageSlug, tierId}: Props) {

    const cateringPackage: { data: TPackageDetails } = await getPackageDetails(packageSlug);
    const currentTier = cateringPackage.data.tiers.find((tier) => String(tier.id) === tierId);
    if (!currentTier) return "Tier not found.";
  return (
    <ContentTier data={currentTier} packageSlug={packageSlug} isPriceShown/>
  )
}

export default ModalDetailTier;