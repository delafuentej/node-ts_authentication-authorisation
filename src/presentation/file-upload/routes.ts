import { Router } from "express";
//import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";






export class FileUploadRoutes {


    static get routes(): Router {

        const router = Router();

      // const fileUploadService = new FileUploadService();
        const fileUploaderController = new FileUploadController(new FileUploadService());
        
        // Defining the routes
        //api/upload/single/<user|category|product>/
         //api/upload/multiple/<user|category|product>/
        router.post('/single/:type'/* ,  [AuthMiddleware.validateJWT], */ , fileUploaderController.uploadFile );
        //AuthMiddleware.validateJWT => confirmation that the user is who he/she claims to be
        router.post('/multiple/:type',/*[AuthMiddleware.validateJWT],*/ fileUploaderController.uploadMultipleFiles);
    
    
    
        return router;
      }

}