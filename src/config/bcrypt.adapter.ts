import bcryptjs, { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAdapter = {

    // hash => method of returning the encrypted password
    hash: (password: string) => {
        //The salt is a random value, and should differ for each calculation, so the result should hardly ever be the same, even for equal passwords.
        // gererate a salt round (cost-factor controls) of 10 => 
        // how much time is needed to calculate a single BCrypt hash
        //The higher the cost factor, the more hashing rounds are done. 
        //Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
        const salt = genSaltSync();

        return hashSync(password, salt);
    },

    // to compare the password with de hashed password
    compare: (password: string, hashed: string) => {
        return compareSync(password, hashed);

    }


}