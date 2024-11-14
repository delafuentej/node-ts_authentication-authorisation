import { CategoryModel, MongoDB, ProductModel, UserModel } from "../mongo/";
import { seedData } from "./data";
import { envs } from "../../config/envs";



(async()=> {
   await MongoDB.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
       });
    await main();

    await MongoDB.disconnect();
})();

const randomBetween0AndX = (x: number)=>{
    return Math.floor(Math.random() * x);
}

async function main (){
    //0. Erase All
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])
    // 1.Create users
    const users = await UserModel.insertMany(seedData.users);

    // 2. Create categories
    const categories = await CategoryModel.insertMany(
        seedData.categories.map( category => {
            return {
                ...category,
                user: users[randomBetween0AndX(users.length - 1)]._id,
            }
        })
    )
    // 3. Create products
    const products = await ProductModel.insertMany(
        seedData.products.map( product => {
            return {
                ...product,
                category: categories[randomBetween0AndX(categories.length - 1)],
                user: users[randomBetween0AndX(users.length - 1)]._id,
            }
        })
    )

    console.log('SEED Executed');
}