import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";
import { CategoryModel } from "../../data";




export class CategoryService {
    constructor() {}

    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){

        const existsCategory = await CategoryModel.findOne({ name: createCategoryDto.name})
        if(existsCategory) throw CustomError.badRequest('Category already exists');

        try{
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            });

            // to save it in db
            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }
            
        }catch(error){
            throw CustomError.internalServer(`${error}`);
           
        }
    }

    async getCategories(){

        try{
            const categories = await CategoryModel.find();

            return categories.map( category => ({
                id: category.id,
                name: category.name,
                available: category.available,
            })
        )
            
        }catch(error){
            throw CustomError.internalServer(`Internal Server Error`);
           
        }
    }
}