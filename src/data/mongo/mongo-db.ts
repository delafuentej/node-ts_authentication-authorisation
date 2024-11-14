import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl:  string;
    dbName: string;
};

export class MongoDB {
    static async connect(options: ConnectionOptions){

        const {mongoUrl, dbName} = options;

        try{
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });
            console.log('Mongo DB connected!');
            return true;
        }catch(error){
            console.log(error,'Mongo connection error');
            throw error;
          
        }
    }

    static async disconnect(){
        await mongoose.disconnect();
    }
}