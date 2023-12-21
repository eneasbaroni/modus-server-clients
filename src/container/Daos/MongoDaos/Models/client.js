import { Schema, model } from 'mongoose';

const clientSchema = new Schema({    
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactA: {
        type: String,
        required: true
    },
    emailA: {
        type: String,
        required: true
    },
    phoneA: {
        type: String,
        required: true
    },  
    contactB: {
        type: String,
    },
    emailB: {
        type: String,
    },
    phoneB: {
        type: String,
    },
    reports: {
        type: Array,
        required: true
    },
    messages: {
        type: Array,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

//Prueba
/* const client = {
    username: 'Eneas',
    password: '123456',
    contactA: 'Eneas Baroni',
    emailA: 'eneasbaroni@gmailcom',    
    phoneA: '123456789',
    contactB: 'Pablo Baroni',
    emailB: 'pablobaroni@gmailcom',
    phoneB: '123456789',
} */

export const Client = model('Client', clientSchema);
