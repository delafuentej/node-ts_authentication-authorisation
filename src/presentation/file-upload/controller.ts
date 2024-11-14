
import { Response, Request} from "express";
import { CustomError } from "../../domain";


export class FileUploadController {

    constructor(
     //  private readonly fileUploadService: FileUploadService,
    ){};

    private handleError = (res: Response, error: unknown) => {

        if( error instanceof CustomError){
            res.status(error.statusCode).json({ error: error.message});
            return;
        };
        console.log(`${error}`);
        res.status(500).json({ error: 'Internal Server Error'});

    }

    uploadFile = async(req: Request, res: Response) => {
        console.log({files: req.files})

       res.json('Upload File');
    };

    uploadMultipleFiles = (req: Request, res: Response) => {

      res.json('Upload Multiple File');
    };
}