import {  CustomError, PaginationDto, CreateProductDto} from "../../domain";
import { ProductService } from "../services";
import { Response, Request} from "express";



export class ProudctController {

    constructor(
      private readonly productService: ProductService,
    ){};

    private handleError = (res: Response, error: unknown) => {

        if( error instanceof CustomError){
            res.status(error.statusCode).json({ error: error.message});
            return;
        };
        console.log(`${error}`);
        res.status(500).json({ error: 'Internal Server Error'});

    }

    getProducts = async(req: Request, res: Response) => {

        // to obtain the queries parameters
        const {page = 1, limit = 5} = req.query;

        const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
        if(error) return res.status(400).json({error});

       // res.json('getProducts');
        //res.json(paginationDto)
        this.productService.getProducts(paginationDto!)
        .then( products => res.status(200).json(products)) 
        .catch( error => this.handleError(res, error))
 
     
    }

    createProduct = (req: Request, res: Response) => {
       // res.json('Create Product')
        const userId= req.body.user.id;
         const [error, createProductDto] = CreateProductDto.create({
            ...req.body,
            user: userId,

        });
         if(error) return res.status(400).json({error});

        // res.json(createProductDto)
        

        this.productService.createProduct(createProductDto!)
        .then( newProduct => res.status(201).json(newProduct))
        .catch( error => this.handleError(res, error))
       
    }


   
        
 
      
       
    

   

}