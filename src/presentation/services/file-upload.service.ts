import {  CustomError, PaginationDto } from "../../domain";





export class FileUploadService {
    constructor() {}

    private checkFolder(folderPath: string){
        throw new Error('Method not implemented')
    }

    uploadFile (
        file: any, 
        folder: string ='uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){

       
    }
   

    uploadMultipleFiles(
        file: any[], 
        folder: string ='uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
 
      
    }
}
