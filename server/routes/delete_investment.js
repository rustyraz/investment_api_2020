import { Router } from 'express';
import investments from '../dummy_data/investments_list.json';
import authorize from '../middlewares/authorize';

const router = Router();
 router.delete('/:id', authorize, (req, res) => {
    const investment = investments.find( c => c.id === parseInt(req.params.id));
    if(!investment) res.status(404).send('System could not find what you wanted to delete!');

    const index = investments.indexOf(investment);
    investments.splice(index,1);

    res.send(investment);
});

export default router;