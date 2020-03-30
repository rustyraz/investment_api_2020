import { Router } from 'express';
import config from '../config/settings';
import jwt_token_manager from '../middlewares/jwt_module';

const router = Router();

let refreshTokens = []; //use a database to store the refreshtoken or redis

//login user
router.post('/login', (req, res) => {
    const username = req.body.username; // could be an email
    const password = req.body.password;

    //check the database for username and password

    //Authenticate the user
    const user = { username };
    const access_token = jwt_token_manager.sign(user, config.jwtSignOptions);
    const refresh_token = jwt_token_manager.refreshToken(user, config.jwtSignOptions);
    refreshTokens.push(refresh_token);
    res.send({access_token, refresh_token});
});


//refresh token
router.post('/token', (req, res) => {
    const refresh_token = req.body.token;
    if(refresh_token == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refresh_token)){
        //refresh token not found in the list        
        return res.sendStatus(403);
    }else{
        //refresh token found in the list of valid refresh tokens
        const verified_token = jwt_token_manager.verify(refresh_token, config.jwtVerifyOptions);
        console.log(verified_token);
        if(verified_token){
            const access_token = jwt_token_manager.sign({username : verified_token}, config.jwtSignOptions);
            res.json({access_token});
        }else{
            return res.sendStatus(403);
        }
    } 
    
});

//logout and delete token
router.delete('/logout', (req, res) => {
    //check throught the database for the refreshtoken and delete it
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

export default router;