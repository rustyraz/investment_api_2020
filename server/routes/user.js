import { Router } from 'express';
const router = Router();
//import USERS from '../models/user';
import queries from '../db/queries';

function isIdValid(req, res, next){
    if(!isNaN(req.params.id)) return next();
    res.status(400).send({
        error: true,
        errorMessage: "Invalid ID"
    });
    //next(new Error('Invalid ID'));
}

router.post('/register', (req, res) => {
    //get the username / email , password
    const email = req.body.email;
    const password = req.body.password;
});

router.get('/users', async (req, res) => {
    const users = await queries.getAllUsers();
    res.send(users);    
});

router.get('/users/:id', isIdValid, async(req, res) => {
    const user = await queries.getUserById(req.params.id);
    console.log(req.params.id);
    if(user && user.length > 0){
        res.send(user);
    }else{
        res.status(404).send({
            error: true,
            message: "Not found"
        });
    }
    
});

router.get('/users/email/:email', async(req, res) => {
    const user = await queries.getUserByEmail(req.params.email);
    if(user && user.length > 0){
        res.send(user);
    }else{
        res.status(404).send({
            error: true,
            message: "Not found"
        });
    }
    
});

export default router;