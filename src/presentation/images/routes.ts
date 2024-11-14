import { Router } from "express";
import { ImagesController } from "./controller";







export class ImagesRoutes {


    static get routes(): Router {
  
        const router = Router();
// const fileUploadService = new FileUploadService();
        const imagesController = new ImagesController();

        
        // Defining the routes
        ///api/images/categories/img(2c1d7974-ecfc-4adf-b2c9-6201c213ea8b.jpeg)
        router.get('/:type/:img',  imagesController.getImage );
     
      
        return router;
      }

}