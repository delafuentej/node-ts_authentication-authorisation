import { CreateProductDto, CustomError, PaginationDto} from "../../domain";
import { ProductModel } from "../../data";




export class ProductService {
    constructor() {}

    async createProduct(createProductDto: CreateProductDto){

        const existsProduct = await ProductModel.findOne({ name: createProductDto.name})
        if(existsProduct) throw CustomError.badRequest('Product already exists');

        try{
            const product = new ProductModel(createProductDto);

            // to save it in db
            await product.save();

            return product;
            
        }catch(error){
            throw CustomError.internalServer(`${error}`);
           
        }
    }
   
    async getProducts(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;

        try{
           
            const [totalProducts, products] = await Promise.all([
                 ProductModel.countDocuments(),
                 ProductModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('user')
                .populate('category')
            ])

            return {
                    page: page,
                    limit: limit,
                    total: totalProducts,
                    next: `/api/products?page=${(page + 1)}&limit=${limit}`,
                    prev: (page -1 > 0) ? `/api/products?page=${(page - 1)}&limit=${limit}`: null,
                    products: products,
                }
           
            
        }catch(error){
            throw CustomError.internalServer(`Internal Server Error`);
           
        }
    }
}