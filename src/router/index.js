import {Router} from 'express';
import clientRouter from './clientRouter.js';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import caseRouter from './caseRouter.js';
const router = Router();



router.get('/', (req, res) => {
    res.send('Messi Campeon!')
})

router.use('/client', clientRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/case', caseRouter)


router.get('/session', async (req, res, next) => {
    console.log('Session:', req.session);
    next();
  });

export default router