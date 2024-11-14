import { NextFunction, Request, Response } from "express";

   

export class TypeMiddleware {
 // factory function
    static validTypes( validTypes: string[]){
        return (req: Request, res: Response, next: NextFunction) => {
           // const type = req.body.type
            const type = req.url.split('/').at(2) ?? '';
          //  console.log({type});
            const validTypes = ['users','categories','products'];

           if(!validTypes.includes(type)){
            return res.status(400).json(`Invalid type: ${type}. Valid types: ${validTypes.join(', ')}`);
            }
            next();
        }
    }
    // static async validateTypes(req: Request, res: Response, next: NextFunction){

    //     const type = req.params.type;
    //     const validTypes = ['users','categories','products'];

    //    if(!validTypes.includes(type)){
    //         return res.status(400).json(`Invalid type: ${type}. Valid types: ${validTypes.join(', ')}`);
    //     }
     
    //     next();
 
    // }
}