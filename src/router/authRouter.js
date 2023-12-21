import { Router } from 'express';
import loginUser from '../middleware/login.js';

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
       
    try {
        const user = await loginUser(req.body.username, req.body.password);
        if (user) res.status(200).json(user);        
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
});	  

authRouter.get('/login-error', (req, res) => {
    res.status(401).send({ message: 'Login fallido' });
})

export default authRouter

