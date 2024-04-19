const mongoose = require('mongoose');
const { Schema } = mongoose;

const mongoString = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2"

mongoose.connect(mongoString);

const jsonSchema = new Schema({},{ timestamps: true ,strict: false});

const AgentsModel = mongoose.model('Agents', jsonSchema);


module.exports = AgentsModel;

