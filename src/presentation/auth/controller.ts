import { AuthService } from "../services/auth.service";
// AuthController => is responsible for responding to the client
import { CustomError, LoginUserDto } from "../../domain";
import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain";


export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ){};

    private handleError = (res: Response, error: unknown) => {

        if( error instanceof CustomError){
            res.status(error.statusCode).json({ error: error.message});
            return;
        };
        console.log(`${error}`);
        res.status(500).json({ error: 'Internal Server Error'});

    }

    register = (req: Request, res: Response) => {
        const[ error, registerUserDto] =  RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({error});

       this.authService.registerUser(registerUserDto!)
        .then( (user) => res.json(user))
        .catch( error => this.handleError(res, error))
    }

    login = (req: Request, res: Response) => {
       const[ error, loginUserDto] = LoginUserDto.create(req.body);

       if(error) return res.status(400).json({error});

       this.authService.loginUser(loginUserDto!)
       .then( (user) => res.json(user))
       .catch( error => this.handleError(res, error))
    }

    validateEmail = (req: Request, res: Response) =>{
        const { token }= req.params;

       
     
         this.authService.validateEmail(token)
            .then(()=> res.json('Email validated'))
            .catch( error => this.handleError(res, error))
      

    }


    

}