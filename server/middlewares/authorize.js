import jwt from 'jsonwebtoken';
import fs from 'fs';
import config from '../config/settings';
import jwt_token_manager from './jwt_module';

const user_payload = { 
    user_email: "pngesh@gmail.com",
    user_category: "admin",
    other_data: "awesome"
}

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];// returns an array then we take the second element
    }

    if(token){
        //token was found
        const verified_token = jwt_token_manager.verify(token, config.jwtVerifyOptions);
        if(verified_token){          
            //valid token was passed 
            req.userEmail = verified_token.user_email;
            //req.userId = decoded.user_id;
            next();
        }else{
            res.status(401).json({ error: "Invalid token provided!" });
        }
        
    }else{
        token = jwt_token_manager.sign(user_payload,config.jwtSignOptions);//this should be done after login
        res.status(403).json({
            error : "No token provided",
            generatedToken: token
        });
    }
}
