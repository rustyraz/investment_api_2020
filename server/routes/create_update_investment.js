import { Router } from 'express';
import Joi from 'joi';
import investments from '../dummy_data/investments_list.json';

const router = Router();

//VALIDATION function
function validateInvestment(investment){
    const schema = {
        name: Joi.string().min(3).required(),
        capital: Joi.string().min('1').required()
    };

    return Joi.validate(investment, schema);
}

router.post('/', (req, res) => {
    const { error } = validateInvestment(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    } 

    //continue to posting
    const investment = {
        id: investments.length+1,
        name: req.body.name,
        category: req.body.category,
        capital: req.body.capital,
        profit: req.body.profit,
        status: req.body.status
    };
    investments.push(investment);
    res.send(investment);
});

router.put('/', (req, res) => {

});

export default router;