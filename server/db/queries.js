import db_connection from './knex';

const queries = {
    //USERS queries
    getAllUsers(){
        return db_connection('users');
    },
    getUserById(id){
        return db_connection('users').where('id',id);
    },
    getUserByEmail(email){
        return db_connection('users').where('email', email);
    },
    registerUser(user){
        return db_connection('users').insert(user, '*'); //will return for us the the saved record with the ID
    },
    //get all investments
    getAllInvestments(){
        return db_connection('investments')
    },
    getInvestmentById(id){
        return db_connection('investments').where('id',id);
    }
};
export default queries;
