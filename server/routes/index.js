import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        name: "Smart Investment management system API",
        version : "1.0",
        year: "2020"
    });
});

export default router;