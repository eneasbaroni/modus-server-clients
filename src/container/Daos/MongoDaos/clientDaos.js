import MongoContainer from "../../MongoContainer.js";
import { Client } from "./Models/client.js";
import bcrypt from 'bcrypt';

class ClientContainer extends MongoContainer {
    constructor() {
        super(Client); //llama al constructor del padre, con el schema correspondiente
    }

    async save(obj) {//sobreescribe el metodo padre para verificar que no haya usuarios duplicados
        try {
            const clientExist = await Client.findOne({ username: obj.username })
            if (clientExist) {
                throw new Error('El usuario ya existe');
            }
            const hashPass = await bcrypt.hash(obj.password, 8);
            obj.password = hashPass;
            obj.reports = [];
            obj.messages = [];
            const data = await super.save(obj);
            return data;
        } catch (error) {
            throw error;
        }
    }

    //borrar el cliente de forma logica
    async deleteById(idEl) {
        //encontrar cliente y cambiarle a false el active
        try {
            const client = await Client.findOneAndUpdate({ _id: idEl }, { active: false });
            if (!client) {
                throw new Error('No se encontro el cliente');
            }
            return client;
        } catch (error) {
            throw error;
        }
        
    }

    //metodo para buscar por email
    async findByName(username) {
        try {
            const client = await Client.findOne({ username });
            if (!client) {
                return false;
            }
            return client;
        } catch (error) {
            console.log(error);
        }
    }

    //metodo para agregar un reporte
    async addReport(username, report) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const formattedDate = `${day}-${month}-${year}`
        //id= username and dateGettima
        const timestamp = new Date().getTime();
        const _id = `${username}-${timestamp}`
        

        report.fecha = formattedDate
        report._id = _id
        try {            
            const client = await Client.findOneAndUpdate({ username }, { $push: { reports: report } });
            if (!client) {
                throw new Error('No se encontro el cliente');
            }
            return client;
        } catch (error) {
            throw error;
        }
        
    }

    async deleteReport(userId, reportId) {
        try {
            const client = await Client.findByIdAndUpdate(userId, { $pull: { reports: { _id: reportId } } });
            if (!client) {
                throw new Error('No se encontro el cliente o el informe no existe');
            }
            return client;
        } catch (error) {
            throw error;
        }
    }

    async updateReport(userId, report) {        
        
        try {           
            const client = await Client.findOneAndUpdate({ _id: userId, 'reports._id': report._id }, { $set: { 'reports.$': report } });
            if (!client) {
                throw new Error('No se encontro el cliente o el informe no existe');
            }
            return client;            
            
        } catch (error) {
            throw error;
        }
    }

    //metodo para agregar un mensaje
    async addMessage(username, messageText) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const formattedDate = `${year}-${month}-${day}`
        
        const newMessage = {
            date: formattedDate,
            message: messageText,
            leido: false
        }
        try {
            const client = await Client.findOneAndUpdate({ username }, { $push: { messages: newMessage } });
            if (!client) {
                throw new Error('No se encontro el cliente');
            }
            return client;
        } catch (error) {           
            throw error;
        }        
    }

    //marcar todos los mensajes como del usuario como leidos
    async markAllMessagesAsRead(username) {
        try {
            const client = await Client.findOneAndUpdate(
                { username },
                { $set: { "messages.$[].leido": true } },
                { new: true }
            );
            if (!client) {
                throw new Error("No se encontro el cliente");
            }
            return client;
        } catch (error) {
            throw error;
        }
    }   
}

export default ClientContainer