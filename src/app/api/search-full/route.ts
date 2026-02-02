
import { ProductCardProps } from '@/src/types/product';
import { getDB } from '@/UTILS/api-routes';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query') || '';

        const db = await getDB();

        const products = (await db
            .collection('products')
            .find({
                $and:[ {$or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                ]},
             {quantity:{$gt: 0}}  
            ]
               
            })

            .project({
                _id:1,
                img:1,
                basePrice:1,
                description:1,
                discountPercent:1,
                rating:1,
                tags:1,
                title: 1,
                id: 1,
            })
            .toArray()) as ProductCardProps[];


        return NextResponse.json(products);
    } catch (error) {
        console.error('Ошибка поиска', error);
        return NextResponse.json({ error: 'Ошибка поиска' }, { status: 500 });
    }
}
