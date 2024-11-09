
// AuthController => is responsible for responding to the client

import { Request, Response } from "express"


export class AuthController {

    constructor(){

    }

    register = (req: Request, res: Response) => {
        res.json('registerUser');
    }

    login = (req: Request, res: Response) => {
        res.json('loginUser');
    }

    validateEmail = (req: Request, res: Response) =>{
        res.json('validateEmail');
    }


    

}