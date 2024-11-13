import { UserModel } from '../../data';
import { CustomError, LoginUserDto, UserEntity } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { Jwt } from '../../config/jwt.adapter';
import { EmailService } from './email.service';
import { envs } from '../../config/envs';


export class AuthService{

   
    constructor(
    //Dependencies Injection (DI)-Email Service
    private readonly emailService: EmailService,
        
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
    
            // send confirmation email when user is created
            await this.sendEmailValidationLink(user.email)

            //const userEntity = UserEntity.fromObject(user);
            const {password, ...restUserEntity} = UserEntity.fromObject(user)


            // to obtain the token- JWT & 
            // maintaining user authentication
            const token = await Jwt.generateToken({ id: user.id })

            if(!token) throw CustomError.internalServer('Error while creating JWT-Token');
    
           

            return {
                user: restUserEntity,
                token: token,
            }


        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
        return 'todo Ok!';
    }

    public async loginUser( loginUserDto: LoginUserDto){
        // Steps:
        // findOne() to verify if user exists by email
        const user = await UserModel.findOne({email: loginUserDto.email})

        if(!user) throw CustomError.badRequest('Email not valid');

        // isMatch ? from bcrypt => compare method
        const isMatch = bcryptAdapter.compare( loginUserDto.password, user.password);

        if (!isMatch) throw CustomError.badRequest('Password not valid');
      
        // return object {user, token}
        const {password, ...restUserEntity} = UserEntity.fromObject(user);

        //token -jwt
        const token = await Jwt.generateToken({ id: user.id, email: user.email })

        if(!token) throw CustomError.internalServer('Error while creating JWT-Token');

        return {
            user: restUserEntity,
            token: token,
        }


    }

    private sendEmailValidationLink = async(email: string) => {
        //1. Generate a token
        const token =  await Jwt.generateToken({ email});
        if(!token) throw CustomError.internalServer('Error getting token');
        // 2. Create a link
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        // 3. Create a html file
        const html = `
            <h1>Validate your email</h1>
            <p>Please click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;
        // 4. Options for sendEmail method
        const options = {
            to: email,
            subject:'Validate your email',
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);

        if(!isSent) throw CustomError.internalServer('Error sending validate email');

        return true;

    }

    public validateEmail = async(token: string) => {

        const payload = await Jwt.validateToken(token);
        if(!payload) throw CustomError.unauthorized('Invalid Token');

        const {email} = payload as {email: string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({email});
        if(!user) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;

          // to save the user in db
        await user.save();

        return true;


    }

}