import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryController } from "./controller";
import { CategoryService } from "../services";





export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const categoryService= new CategoryService();
        const categoryController = new CategoryController(categoryService);
        
        // Defining the routes
        router.get('/', categoryController.getCategories );
        //AuthMiddleware.validateJWT => confirmation that the user is who he/she claims to be
        router.post('/', [AuthMiddleware.validateJWT], categoryController.createCategory);
    
    
    
        return router;
      }

}