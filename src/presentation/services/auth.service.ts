import { errorMonitor } from 'events';
import { UserModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { bcryptAdapter } from '../../config/bcrypt.adapter';


export class AuthService{

    //Dependencies Injection (DI)
    constructor(
        
    ){}

   public async registerUser( registerUserDto: RegisterUserDto){
        // Steps to register a new user
        const existUser = await UserModel.findOne({email: registerUserDto.email})
        if(existUser) throw CustomError.badRequest('Email already exist');

        try{
            const user = new UserModel(registerUserDto);
             
            // to encript the password 
            user.password = bcryptAdapter.hash(registerUserDto.password)

            // to save the user in db
            await user.save();



            // to obtain the token- JWT & 
            // maintaining user authentication

            // send confirmation email when user is created

            //const userEntity = UserEntity.fromObject(user);
            const {password, ...restUserEntity} = UserEntity.fromObject(user)
           
           


            return {
                user: restUserEntity,
                token: 'ABC',
            }


        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
        return 'todo Ok!';
    }
}