import jwt from 'jsonwebtoken';
import fs from 'fs';
import config from '../config/settings';

const user_payload = { 
    user_email: "pngesh@gmail.com",
    user_category: "admin",
    other_data: "awesome"
}

//PRIVATE and PUBLIC key
const privateKey = fs.readFileSync((__dirname+'/../config/jwt/private.key'), 'utf8');
const publicKey = fs.readFileSync((__dirname+'/../config/jwt/public.key'), 'utf8');

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];// returns an array then we take the second element
    }

    if(token){
        //token was found
        jwt.verify(token, publicKey, config.jwtVerifyOptions, (err, decoded) => {
            if(err){
                res.status(401).json({ error: "Invalid token provided!" });
            }else{
                //valid token was passed
                req.userEmail = decoded.user_email;
                //req.userId = decoded.user_id;
                next();
            }
        });
        
    }else{

        token = jwt.sign(user_payload, privateKey, config.jwtSignOptions); //this should be done after login
        res.status(403).json({
            error : "No token provided",
            generatedToken: token
        });
    }
}