import { NextFunction, Request, Response } from "express";



export class FileUploadMiddleware {

    static async validateFiles(req: Request, res: Response, next: NextFunction){

        if(!req.files || Object.keys(req.files).length === 0){
             return res.status(400).json('No Files were selected');
        }

        if(!Array.isArray(req.files.file)){
            req.body.files = [req.files.file];
        }else{
            req.body.files = req.files.file;
        }

        next();
 
    }
}