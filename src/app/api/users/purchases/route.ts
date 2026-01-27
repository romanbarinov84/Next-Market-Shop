import { getDB } from '@/UTILS/api-routes';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request:Request) {
    try {
        const db = await getDB();
        const url = new URL(request.url);
        const userPurchasesLimit = url.searchParams.get("userPurchasesLimit")
        const user = await db.collection('users').findOne({});

        if (!user?.purchases?.length) {
            return NextResponse.json([]);
        }
        const productIds = user.purchases.map((p: { id: number }) => p.id);

        if(userPurchasesLimit){
            const limit = parseInt(userPurchasesLimit);

            const purchases = await db
            .collection('products')
            .find({ id: { $in: productIds } })
            .limit(limit)
            .toArray();

            return NextResponse.json(
               purchases.map((product) => {
                    const {discountPercent, ...rest} = product;
                    void discountPercent;
                    return rest
                })
            )
        }

        const products = await db
            .collection('products')
            .find({ id: { $in: productIds } })
            .toArray();

            return NextResponse.json(
                products.map((product) => {
                    const {discountPercent, ...rest} = product;
                    void discountPercent;
                    return rest
                })
            )
    } catch (error) {
        console.error('Ошибка сервера', error);
        return NextResponse.json(
            { message: 'Ошибка при загрузке покупок' },
            { status: 500 }
        );
    }
}
