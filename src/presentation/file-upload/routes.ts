import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware, TypeMiddleware } from "../middlewares";






export class FileUploadRoutes {


    static get routes(): Router {
  
        const router = Router();

      // const fileUploadService = new FileUploadService();
        const fileUploaderController = new FileUploadController(new FileUploadService());

        //middleware:
        router.use([
          FileUploadMiddleware.validateFiles, 
          TypeMiddleware.validTypes(['users','categories','products'])
        ])
        
        // Defining the routes
        //api/upload/single/<user|category|product>/
         //api/upload/multiple/<user|category|product>/
        router.post('/single/:type',  fileUploaderController.uploadFile );
        //AuthMiddleware.validateJWT => confirmation that the user is who he/she claims to be
        router.post('/multiple/:type' ,fileUploaderController.uploadMultipleFiles);
    
    
    
        return router;
      }

}