import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { Response, Request} from "express";
import { CategoryService } from "../services";


export class CategoryController {

    constructor(
       private readonly categoryService: CategoryService,
    ){};

    private handleError = (res: Response, error: unknown) => {

        if( error instanceof CustomError){
            res.status(error.statusCode).json({ error: error.message});
            return;
        };
        console.log(`${error}`);
        res.status(500).json({ error: 'Internal Server Error'});

    }

    getCategories = async(req: Request, res: Response) => {

        // to obtain the queries parameters
        const {page = 1, limit = 5} = req.query;

        const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
        if(error) return res.status(400).json({error});

        //res.json(paginationDto)

       this.categoryService.getCategories(paginationDto!)
       .then( categories => res.status(200).json(categories)) 
       .catch( error => this.handleError(res, error))
    }

    createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error});

        const user= req.body.user;

        this.categoryService.createCategory(createCategoryDto!, user)
        .then( newCategory => res.status(201).json(newCategory))
        .catch( error => this.handleError(res, error))
       
    //    res.json(createCategoryDto);
    //res.json(req.body)
    }

   

}