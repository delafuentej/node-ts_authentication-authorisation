import { regularExps } from '../../../config/regular-exp';



export class LoginUserDto {
    private constructor (
        public readonly email: string,
        public readonly password: string
    ){};

    static create ( object: { [key: string] : any }): [string?, LoginUserDto?] {
        const { email, password} = object;

        if(!email) return ['Missing Email',  undefined];
        if(!regularExps.email.test(email)) return ['Email is not valid'];
        if(!password) return ['Missing Password',  undefined];
        if(password.length < 6) return ['Password should have al least 6 characters'];

        return [undefined , new LoginUserDto(email, password)];

    }
}