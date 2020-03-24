import { Router } from 'express';
import Joi from 'joi';
import investments from '../dummy_data/investments_list.json';

const router = Router();

//VALIDATION function
function validateInvestment(investment){
    const schema = {
        name: Joi.string().min(3).required(),
        capital: Joi.string().min(1).required()
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
        category: req.body.category || "online investment",
        capital: req.body.capital || "100,000",
        profit: req.body.profit || "10,000",
        status: req.body.status || "ended"
    };
    investments.push(investment);
    res.send(investment);
});

router.put('/:id', (req, res) => {
    const investment = investments.find(c => c.id === parseInt(req.params.id));
    if(!investment) res.status(404).send("System cannot find a record of what you are looking for");

    const { error } = validateInvestment(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    //go ahead and update
    investment.name = req.body.name;
    investment.capital = req.body.capital;
    res.send(investment);
});

export default router;