import { MongoDB } from "../mongo/mongo-db";
import { envs } from "../../config/envs";


(async()=> {
   await MongoDB.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
       });
    await main();

    await MongoDB.disconnect();
})();

async function main (){

    // 1.Create users

    // 2. Create categories

    // 3. Create products

    console.log('SEED Executed');
}