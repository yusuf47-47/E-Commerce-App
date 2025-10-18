import React from 'react'
import BrandProductsInfo from '../_Component/BrandProdutsInfo/BrandProductsInfo'


export default async function BrandProducts({ params }: { params: { brandId: string } }) {

    const { brandId } = await params;

    return <>
        <BrandProductsInfo brandId={brandId} />
    </>
}
