import { Router } from "express";
import { ProudctController } from './controller';






export class ProudctRoutes {


    static get routes(): Router {

        const router = Router();

        const productController = new ProudctController()

      
        // Defining the routes
        router.get('/', productController.getProducts );
        //AuthMiddleware.validateJWT => confirmation that the user is who he/she claims to be
        router.post('/', productController.createProduct);
    
    
    
        return router;
      }

}