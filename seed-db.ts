import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import "dotenv/config";



  async function seedDatabase() {

    try {
        //подключение к базе данных
        const client = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!);
        await client.connect();

        const db = client.db(process.env.DELIVERY_SHOP_DB_NAME!);
        const productsCollection = db.collection("products");

        //получаем все продукты
        const existingProducts = await productsCollection.find({}).toArray();


        //Операции обновления
        const bulkUpdateOps = existingProducts.map(products => ({
            updateOne:{
                filter:{_id:products._id},
                update:{
                    $set:{
                        isOurProduction:faker.datatype.boolean({probability:0.7}),
                        isHealthyFood:faker.datatype.boolean({probability:0.6}),
                        isNonGMO:faker.datatype.boolean({probability:0.8}),
                    }
                }
            }
        }));

        //Массовое обновление
        if(bulkUpdateOps.length > 0){
            const result = await productsCollection.bulkWrite(bulkUpdateOps);
            console.log(`Обновленно ${result.modifiedCount} продуктов`);
        }else{
            console.log("нет продуктов для обновления");
        }

        //закрытие соеденения
        await client.close();
        console.log("соеденение с МОНГО разорвано");
        

    } catch (error) {
        console.error("Ошибка:",error);
        process.exit(1);
    }
}

seedDatabase();