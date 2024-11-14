import { Router } from "express";
import { ProudctController } from './controller';
import { ProductService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";






export class ProudctRoutes {


    static get routes(): Router {

        const router = Router();

        const productService = new ProductService()

        const productController = new ProudctController(productService);

      
        // Defining the routes
        router.get('/', productController.getProducts );
        //AuthMiddleware.validateJWT => confirmation that the user is who he/she claims to be
        router.post('/',[AuthMiddleware.validateJWT] , productController.createProduct);
    
    
    
        return router;
      }

}