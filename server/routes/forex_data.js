import { Router } from 'express';
import axios from 'axios';
import config from '../config/settings';

const router = Router();

router.get('/', async (req, res) => {
    //https://fcsapi.com/api-v2/forex/list?type=forex&top_symbol=1&access_key=kiIDszLmYCoeudVJf6z1ifZUGoR5gc7AdQSXBPdFCOotuVIkGK
    try {
        const api_url = `${config.fcsapi.base_url}latest?symbol=EUR/USD,USD/JPY,GBP/CHF,NZD/USD&access_key=${config.fcsapi.forex_api_key}`;
        const fetch_response = await axios.get(api_url);
        res.send(fetch_response.data);
    } catch (error) {
        res.status(400).send(error);
    }
    
});

export default router;