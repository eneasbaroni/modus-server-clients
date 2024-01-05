import { Schema, model } from 'mongoose';

const caseSchema = new Schema({
	name: {
        type: String,
        required: true
    },
	date: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	client: {
		type: String,
		required: true
	}
})

export const Case = model('Case', caseSchema);