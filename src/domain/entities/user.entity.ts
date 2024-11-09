import { CustomError } from "../errors/custom.error";


export class UserEntity {
    constructor(
        public id: string,
       public name: string,
       public email: string,
       public emailValidated: boolean,
       public password: string,
       public role: string[],
       public avatar?: string,
    ){}

    static fromObject= (object: {[key: string]: any})=> {
        const {id, name, email, emailValidated, password, role, avatar } = object;

        if( !id) throw CustomError.badRequest('Missing Id');
        if( !name) throw CustomError.badRequest('Missing Name');
        if( !email) throw CustomError.badRequest('Missing Email');
        if( emailValidated === undefined) throw CustomError.badRequest('Missing Emai Validation');
        if( !password) throw CustomError.badRequest('Missing Password');
        if( !role) throw CustomError.badRequest('Missing Role');


        return new UserEntity(
            id,
            name,
            email,
            emailValidated,
            password,
            role,
            avatar
        );
    }

}