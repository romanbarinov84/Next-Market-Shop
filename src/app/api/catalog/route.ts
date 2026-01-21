import { getDB } from '@/UTILS/api-routes';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
    try {
        const db = await getDB();
        const catalog = await db.collection('catalog').find().toArray();
        return NextResponse.json(catalog);
    } catch (error) {
        console.error('Ошибка сервера', error);
        return NextResponse.json(
            { message: 'Ошибка при загрузке каталога' },
            { status: 500 }
        );
    }
}
