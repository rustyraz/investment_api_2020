import { Router } from 'express';
import investments_list from '../dummy_data/investments_list.json';

const router = Router();

//LIST ALL
router.get('/', (req, res) => {
    res.send(investments_list);
});

//LIST BY ID
router.get('/:id', (req, res) => {
    const investment = investments_list.find( c => c.id === parseInt(req.params.id));
    if(!investment) res.status(404).send('Ooooops! System could not find what you were looking for!');
    res.send(investment);
});

export default router;