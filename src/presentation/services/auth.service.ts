import { UserModel } from '../../data';
import { CustomError } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';


export class AuthService{

    //Dependencies Injection (DI)
    constructor(
        
    ){}

   public async registerUser( registerUserDto: RegisterUserDto){
        // Steps to register a new user
        const existUser = await UserModel.findOne({email: registerUserDto.email})
        if(existUser) throw CustomError.badRequest('Email already exist');
        return 'todo Ok!';
    }
}