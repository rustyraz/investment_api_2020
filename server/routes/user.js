import { Router } from 'express';
const router = Router();
//import USERS from '../models/user';
import queries from '../db/queries';

function isIdValid(req, res, next){
    if(!isNaN(req.params.id)) return next();
    res.status(400).send({
        error: true,
        message: "Invalid ID"
    });
    //next(new Error('Invalid ID'));
}

function isUserValid(user){ 
    const hasEmail = typeof user.email == 'string' && user.email.trim() != "";
    const hasPassword = typeof user.password == 'string' && user.password.trim() != "";
    return hasEmail && hasPassword;
}

router.post('/register', async (req, res) => {
    //get the username / email , password
    if(isUserValid(req.body)){
        //insert into database
        const user = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name ? req.body.name : ""
        };
        //check if user already exists
        const userExists = await queries.getUserByEmail(user.email);
        if(userExists && userExists.length > 0){
            res.status(400).send({
                error: true,
                message: "Email already registered!"
            });
        }else{    
            queries.registerUser(user).then(users => {
                res.send(users[0]);
            });
        }
        
    }else{
        res.status(400).send({
            error: true,
            message: "Invalid user"
        });
    }
});

router.get('/users', async (req, res) => {
    const { email, name } = req.query; //allow filter by email and name filter
    const users = await queries.getAllUsers({ email, name });
    res.send(users);    
});

router.get('/users/:id', isIdValid, async(req, res) => {
    const user = await queries.getUserById(req.params.id);
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

router.put('/users/:id', isIdValid, async(req, res) => {
    //we will update the name only for now
    const updateUserData = {
        name: req.body.name
    };
    const updatedUser = await queries.updateUser(req.params.id, updateUserData);
    
    if(updatedUser){
        res.send(updatedUser[0]);
    }else{
        res.send(400).send({
            error: true,
            message: "Could not update user data"
        });
    }
});

router.delete('/users/:id', isIdValid, async(req, res)=>{
    const deleteUserRequest = await queries.deleteUser(req.params.id);
    if(deleteUserRequest){
        res.send({
            success: true,
            message: "Deleted successfully!"
        });
    }else{
        res.status(400).send({
            error: true,
            message: "Error encountered while trying to delete!"
        });
    } 
});

export default router;