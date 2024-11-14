import type { UploadedFile } from 'express-fileupload';
import path from 'path';
import { existsSync, mkdirSync } from "fs";
import {  CustomError, PaginationDto } from '../../domain';
import { UuidAdapter } from '../../config/uuid.adapter';


export class FileUploadService {
    constructor(
        private readonly uuid = UuidAdapter.uuid,
    ) {}

    private checkFolder(folderPath: string){
        if( !existsSync(folderPath)){
            mkdirSync(folderPath);
        }
    }

    async uploadFile (
        file: UploadedFile, 
        folder: string ='uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
        //console.log(file.)
        try{
            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}. Valid extensions: ${validExtensions.join(', ')}`)
            }
            const destination = path.resolve(__dirname, '../../../', folder);

            this.checkFolder(destination);

            const fileName = `${this.uuid()}.${fileExtension}`;

            file.mv( `${destination}/${fileName}`);

            return {fileName};

        }catch(error){
            
          //  console.log({error});
            throw error;
        }
          
       
    }
   

    async uploadMultipleFiles(
        files: UploadedFile[], 
        folder: string ='uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
        const uploadFiles = await Promise.all(
            files.map( file => this.uploadFile(file, folder, validExtensions))
        );

        return uploadFiles;
      
    }
}
