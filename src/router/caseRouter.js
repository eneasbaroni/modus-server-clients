import {Router} from 'express';
import { caseDao } from '../container/Daos/index.js';

const caseRouter = Router();

caseRouter.get('/', async (req, res) => {
  try {
    const cases = await caseDao.getAll();
    res.status(200).json(cases);
  } catch (error) {
    res.status(404).json({error: error.message});
  }  
})

caseRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const casee = await caseDao.getById(id);
    res.status(200).json(casee);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
})

caseRouter.post('/', async (req, res) => {
  try {        
    const casee = await caseDao.save(req.body);
    res.status(200).json(casee);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
})

caseRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const casee = await caseDao.updateById(id, req.body);
    res.status(200).json(casee);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
})

caseRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const casee = await caseDao.deleteById(id);
    res.status(200).json(casee);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
})

export default caseRouter

