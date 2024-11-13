import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryController } from "./controller";





export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const categoryController = new CategoryController();
        
        // Defining the routes
        router.get('/', categoryController.getCategories );
        //AuthMiddleware.validateJWT => confirmation that the user is who he/she claims to be
        router.post('/', [AuthMiddleware.validateJWT], categoryController.createCategory);
    
    
    
        return router;
      }

}