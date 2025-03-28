import { Router } from "express";
import { AuthController } from "./controller";
import { EmailService, AuthService} from "../services";
import { envs } from "../../config/envs";




export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const emailService = new EmailService(
           envs.MAILER_SERVICE,
           envs.MAILER_EMAIL, 
           envs.MAILER_SECRET_KEY,
           envs.SEND_EMAIL
        )

        const authService = new AuthService(emailService);
        const authController = new AuthController(authService);
        
        // Defining the routes
        router.post('/login', authController.login );
        router.post('/register', authController.register);
        router.get('/validate-email/:token', authController.validateEmail );
    
    
    
        return router;
      }

}