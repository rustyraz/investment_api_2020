import { Router } from 'express';
import config from '../config/settings';
import jwt_token_manager from '../middlewares/jwt_module';
import queries from '../db/queries';

const router = Router();

function isUserValid(user){ 
    const hasEmail = typeof user.email == 'string' && user.email.trim() != "";
    const hasPassword = typeof user.password == 'string' && user.password.trim() != "";
    return hasEmail && hasPassword;
}

let refreshTokens = []; //use a database to store the refreshtoken or redis

//login user
router.post('/login', async(req, res) => {
    if(isUserValid(req.body)){
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        const userExists = await queries.loginUser(user);
        if(userExists && userExists.length > 0){
            //generate a token for the user
            const access_token = jwt_token_manager.sign(userExists[0], config.jwtSignOptions);
            const refresh_token = jwt_token_manager.refreshToken(user, config.jwtSignOptions);
            refreshTokens.push(refresh_token);
            res.send({access_token, refresh_token});
        }else{
            res.send(204).send({
                error: true,
                message: "Invalid email or password"
            });
        }
    }else{
        res.send(400).send({
            error: true,
            message: "Invalid email or password"
        });
    }    
});


//refresh token
router.post('/token', (req, res) => {
    const refresh_token = req.body.token;
    if(refresh_token == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refresh_token)){
        //refresh token not found in the list        
        return res.status(403).send('Forbiden access');
    }else{
        //refresh token found in the list of valid refresh tokens
        const verified_token = jwt_token_manager.verify(refresh_token, config.jwtVerifyOptions);
        
        if(verified_token){
            const access_token = jwt_token_manager.sign({username : verified_token}, config.jwtSignOptions);
            res.json({access_token});
        }else{
            return res.status(403).send('Invalid token');
        }
    } 
    
});

//logout and delete token
router.delete('/logout', (req, res) => {
    //check throught the database for the refreshtoken and delete it
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.status(200).send('Logout successful');
});

export default router;