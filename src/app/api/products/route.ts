import { getDB } from '@/UTILS/api-routes';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export const revalidate = 3600;

export async function GET(request: Request) {
    try {
        const db = await getDB();
        const url = new URL(request.url);

        const category = url.searchParams.get('category');
        const randomLimit = url.searchParams.get('randomLimit');

        if (!category) {
            return NextResponse.json(
                { message: 'Параметр категорії обовьязковий' },
                { status: 400 },
            );
        }

        const query = {
            categories: category,
            quantity: { $gt: 0 },
        };

        if (randomLimit) {
            const pipeLine = [
                {
                    $match: query,
                },
                { $sample: { size: parseInt(randomLimit) } },
            ];
            const products = await db
                .collection('products')
                .aggregate(pipeLine)
                .toArray();
            return NextResponse.json(products);
        }

        const products = await db
            .collection('products')
            .find({ categories: category })
            .toArray();

        return NextResponse.json(products);
    } catch (error) {
        console.error('Ошибка сервера', error);
        return NextResponse.json(
            { message: 'Ошибка при загрузке акций' },
            { status: 500 },
        );
    }
}
