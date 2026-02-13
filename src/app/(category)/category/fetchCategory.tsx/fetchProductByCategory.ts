const fetchProductByCategory = async (
    category: string,
    options: {
        pagination: { startIdx: number; perPage: number };
        filter?:string | string[];
        priceFrom?:string;
        priceTo?:string;
    },

) => {

    const {pagination , filter , priceFrom , priceTo} = options;
    try {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_BASE_URL!}/api/category`,
        );

        url.searchParams.append('category', category);

        url.searchParams.append(
            'startIdx',
            pagination.startIdx.toString(),
        );
        url.searchParams.append(
            'perPage',
            pagination.perPage.toString(),
        );

        if(filter){
            if(Array.isArray(filter)){
                filter.forEach(f => url.searchParams.append("filter" , f))
            }else{
                url.searchParams.append("filter" , filter)
            }
        }

        if(priceFrom){
            url.searchParams.append("priceFrom" , priceFrom)
        }
        if(priceTo){
            url.searchParams.append("priceTo" , priceTo)
        }

        const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

        if (!res.ok) throw new Error(`Ошибка получения продуктов ${category}`);

        const data = await res.json();

        return {
            items: data.products || data,
            totalCount: data.totalCount || data.length,
        };
    } catch (err) {
        throw err;
    }
};

export default fetchProductByCategory;
