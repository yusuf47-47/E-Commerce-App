
import React from 'react'
import CategoryProdutsInfo from '../_Components/CategoryProdutsInfo/CategoryProdutsInfo';

export default async function categoryItems({ params }: { params: { categoryId: string } }) {

    const { categoryId } = await params;


    return <>
        <CategoryProdutsInfo categoryId={categoryId} />
    </>
}
