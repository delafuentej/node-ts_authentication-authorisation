
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
       const files = req.files;

       if(!files || Object.keys(files).length === 0){
            return res.status(400).json('No Files were selected');
       }

      const file = files.file as UploadedFile;

      this.fileUploadService.uploadFile(file)
       .then( uploadedFile => res.json(uploadedFile))
       .catch( error => this.handleError(res, error))

    };

    uploadMultipleFiles = (req: Request, res: Response) => {

      res.json('Upload Multiple File');
    };
}