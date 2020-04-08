import db_connection from './knex';

const queries = {
    //USERS queries
    getAllUsers(query){
        const knexQuery = db_connection('users');
        if(query.email){
            knexQuery.where('email',query.email);
        }
        if(query.name){
            knexQuery.where('name','ilike',`%${query.name}%`); //we can look for lowercase and uppercase
        }
        return knexQuery;
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
    updateUser(id, data ){
        return db_connection('users').where('id', id).update(data, '*');
    },
    deleteUser(id){
        return db_connection('users').where('id',id).del();
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
