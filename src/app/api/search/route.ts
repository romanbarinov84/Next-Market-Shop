import { SearchProduct } from "@/src/types/searchProduct";
import { getDB } from "@/UTILS/api-routes";
import { NextResponse } from "next/server";
import GridCategoryBlock from "../../(catalog)/GridCategoryBlock";

export async function GET(request:Request) {
      
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get("query") || "" ;

      
        const db = await getDB();

        const products = await db.collection("products").find({
            $or:[
                {title:{$regex:query,$options:"i"}},
                {description:{$regex:query,$options:"i"}},
            ],
        })

        .project({
            title:1,
            categories:1,
            id:1,
        })
        .toArray() as SearchProduct[];

        if(!products.length){
            return NextResponse.json([]);
        }

        const groupedByCategory:Record<string , SearchProduct[]> = {};

        for(const product of products){
            for(const category of product.categories){
                const normalizedCategory = category.toLowerCase();
                
                if(!groupedByCategory[normalizedCategory]){
                    groupedByCategory[normalizedCategory] = [];
                }

                groupedByCategory[normalizedCategory].push(product);
            }
        }

        const result = Object.entries(groupedByCategory).map(([category , products]) => ({
            category,
            products,
        }))

        return NextResponse.json(result);

    } catch (error) {
        console.error("Ошибка поиска", error);
        return NextResponse.json(
            {error:"Ошибка поиска"},
            {status:500}
        )
    }
}