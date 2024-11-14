import { Validators } from "../../../config/validators";




export class CreateProductDto {
    private constructor (
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,//contain: userId
        public readonly category: string, //contain: categoryId
     ){};

    static create ( object: { [key: string] : any }): [string?, CreateProductDto?] {
        const {name, available = false, price, description, user, category} = object;

        let availableBoolean = available;

        if(!name) return ['Missing Name',  undefined];

        if(!user) return ['Missing User',  undefined];
        if(!Validators.isMongoId(user)) return  ['Invalid userId',  undefined];

        if(!category) return ['Missing Category',  undefined];
        if(!Validators.isMongoId(category)) return  ['Invalid categoryId',  undefined];

        if(typeof available !== 'boolean'){
            availableBoolean = (available === 'true')
        }

        return [undefined , new CreateProductDto(name, availableBoolean, price, description, user, category)];

    }
}