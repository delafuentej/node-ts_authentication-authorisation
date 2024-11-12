import { AuthService } from "../services/auth.service";
// AuthController => is responsible for responding to the client

import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain";


export class AuthController {

    constructor(
        public readonly authService: AuthService
    ){

    }

    register = (req: Request, res: Response) => {
        const[ error, registerUserDto] =  RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({error});

       this.authService.registerUser(registerUserDto!)
        .then( (user) => res.json(user))
       
    }

    login = (req: Request, res: Response) => {
        res.json('loginUser');
    }

    validateEmail = (req: Request, res: Response) =>{
        res.json('validateEmail');
    }


    

}