import { regularExps } from '../../../config/regular-exp';



export class RegisterUserDto {
    private constructor (
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ){};

    static create ( object: { [key: string] : any }): [string?, RegisterUserDto?] {
        const {name, email, password} = object;

        if(!name) return ['Missing Name',  undefined];
        if(!email) return ['Missing Email',  undefined];
        if(!regularExps.email.test(email)) return ['Email is not valid'];
        if(!password) return ['Missing Password',  undefined];
        if(password.length < 6) return ['Password should have al least 6 characters'];

        return [undefined , new RegisterUserDto(name, email, password)]

    }
}