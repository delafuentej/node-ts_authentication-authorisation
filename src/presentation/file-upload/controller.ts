
import { Response, Request} from "express";
import { FileUploadService } from "../services";
import { CustomError } from "../../domain";
import type{ UploadedFile } from "express-fileupload";


export class FileUploadController {

    constructor(
       private readonly fileUploadService: FileUploadService,
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
        const type = req.params.type;
         const validTypes = ['users','categories','products'];

        if(!validTypes.includes(type)){
             return res.status(400).json(`Invalid type: ${type}. Valid types: ${validTypes.join(', ')}`);
         }
      
      
      const file = req.body.files.at(0) as UploadedFile;

      //console.log({body: req.body})

      this.fileUploadService.uploadFile(file, `uploads/${type}`)
       .then( uploadedFile => res.json(uploadedFile))
       .catch( error => this.handleError(res, error))

    };

    uploadMultipleFiles = (req: Request, res: Response) => {

      res.json('Upload Multiple File');
    };
}