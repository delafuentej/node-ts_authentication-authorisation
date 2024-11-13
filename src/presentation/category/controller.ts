import { CreateCategoryDto, CustomError } from "../../domain";
import { Response, Request} from "express";

export class CategoryController {

    constructor(
       
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
        res.json('get Categories')
    }

    createCategory = async(req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error});
       
    //    res.json(createCategoryDto);
    //res.json(req.body)
    }

   

}