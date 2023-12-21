import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    
    const user = req.user;
    
    if (!user) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    res.send(req.user);
})

export default userRouter