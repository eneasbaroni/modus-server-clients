import bcrypt from "bcrypt";; 
import {clientDao} from "../container/Daos/index.js";

const loginUser = async (username, password) => {
    
    const client = await clientDao.findByName(username);
    
    if (!client) {
        throw new Error('El usuario no existe');
    }        

    const match = await bcrypt.compare(password, client.password);

    if (!match) {
        throw new Error('Contraseña incorrecta');
    }

    return client;
    
}

export default loginUser