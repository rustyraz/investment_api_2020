import jwt from 'jsonwebtoken';
import fs from 'fs';

//use 'utf8' to get string instead of byte array (512 bit key)
//PRIVATE and PUBLIC key
const privateKey = fs.readFileSync((__dirname+'/../config/jwt/private.key'), 'utf8');
const publicKey = fs.readFileSync((__dirname+'/../config/jwt/public.key'), 'utf8');

module.exports = {
    sign: (payload, $Options) => {
        /*
            sOptions = {
                issuer: "Authorization/Resource/This server",
                subject: "iam@user.me",
                audience: "Client/FrontEnd_Identity" // this should be provided by the client
            }
        */

        /**
         * Along with the email and password, the client must pass a client identity for our server to know for whom the token is to be signed.
         * For example webaddress or app name
         */

        //Token signing options
        let signOptions = {
            issuer: $Options.issuer,
            subject: $Options.subject,
            audience: $Options.audience,
            expires: "30d", //30days validity
            algorithm: "RS256" 
        };
        return jwt.sign(payload, privateKey, signOptions);
    },

    verify: (token, $Option) =>{
        /*
            vOption = {
                issuer: "Authorization/Resource/This server",
                subject: "iam@user.me",
                audience: "Client/FrontEnd_Identity" // this should be provided by the client
            }
        */
       let verifyOptions = {
           issuer: $Option.issuer,
           subject: $Options.subject,
           audience: $Options.audience,
           expiresIn: "30d",
           algorithm: ["RS256"]
       };
        try{
            return jwt.verify(token, publicKey, verifyOptions);
        }catch (err){
            return false;
        }
    },

    decode: (token) => {
        //returns null if the token is invalid
        return jwt.decode(token, {complete: true});
    }
}