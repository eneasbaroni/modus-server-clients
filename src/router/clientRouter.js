import {Router} from 'express';
import {clientDao} from '../container/Daos/index.js';

const clientRouter = Router();

clientRouter.get('/', async (req, res) => {

    try {
        const clients = await clientDao.getAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
    
})

clientRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await clientDao.getById(id);
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
})

clientRouter.post('/', async (req, res) => {
    
    try {        
        const client = await clientDao.save(req.body);
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({error: error.message});
    }

})

clientRouter.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await clientDao.deleteById(id);
        res.status(200).json({message: 'Cliente eliminado', client});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
})

clientRouter.delete('/report', async (req, res) => {
    
    try {  
        const userId = req.body.userId;
        const reportId = req.body.reportId;      
        const client = await clientDao.deleteReport(userId, reportId);     
        res.status(200).json({message: 'Reporte eliminado', client});
    } catch (error) {        
        res.status(404).json({error: error.message});
    }    
})

clientRouter.put('/report', async (req, res) => {
    try {  
        const userId = req.body.userId;
        const report = req.body.reportUpdated;      
        const client = await clientDao.updateReport(userId, report);     
        res.status(200).json({message: 'Reporte actualizado', client});
    } catch (error) {        
        res.status(404).json({error: error.message});
    }
})

//Prueba
/*  
{
  	"username": "Eneas",
    "password": "123456",
    "contactA": "Eneas Baroni",
    "emailA": "eneasbaroni@gmailcom",    
    "phoneA": "123456789",
    "contactB": "Pablo Baroni",
    "emailB": "pablobaroni@gmailcom",
    "phoneB": "123456789"
} 
*/


clientRouter.post('/report', async (req, res) => {

    try {  
        const username = req.body.username;
        const report = req.body.informe;      
        const client = await clientDao.addReport(username, report);        
        res.status(200).json({message: 'Reporte agregado', client});
    } catch (error) {        
        res.status(404).json({error: error.message});
    }
})

//Prueba
/* 
{    
    "username" : "Eneas",
    "report": {
        "date": "2022-01-01",
        "message": "Reporte de Eneas Numero 1"
    }
}  
*/

clientRouter.post('/message', async (req, res) => { 

    try {  
        const username = req.body.username;
        const message = req.body.message;      
        const client = await clientDao.addMessage(username, message);        
        res.status(200).json({message: 'Mensaje agregada', client});
    } catch (error) {        
        res.status(404).json({error: error.message});
    }
})

clientRouter.put('/message', async (req, res) => {
    try {  
        const username = req.body.username;        
        const client = await clientDao.markAllMessagesAsRead(username);        
        res.status(200).json({message: 'Mensaje actualizada', client});
    } catch (error) {        
        res.status(404).json({error: error.message});
    }
})

//Prueba
/*
{
    "username" : "Eneas",
    "message": {
        "date": "2022-01-01",
        "message": "Ha llegado su nuevo reporte",
        "leido": false
    }
}
*/


export default clientRouter