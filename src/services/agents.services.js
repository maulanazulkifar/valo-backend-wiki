const helper = require('../utils/helper.util');
const axios = require('axios');
const AgentModel = require('../model/agents.model')

async function getAll(page = 1){
    return AgentModel.find();
}
async function get(id){
    try {
        const agent = AgentModel.findById(id);
        if (agent) {
            return agent
        } else {
            return false
        }
    } catch {
        return false;
    }
}
async function create(data){
    const newAgent = new AgentModel(data);
    await newAgent.save();
    return newAgent;
}
async function update(id, data){
    return AgentModel.findByIdAndUpdate(id, data, {new: true});
}
async function deleteAgent(id){
    return AgentModel.findByIdAndDelete(id);
}
async function syncAgent(){
    // Fetch agents data from Valorant API
    const response = await fetch('https://valorant-api.com/v1/agents');
    const { data: valorantAgents } = await response.json();

    // Get agents data from MongoDB
    const mongoAgents = await AgentModel.find();

    // Map agents data to UUIDs for easier comparison
    const mongoAgentName = mongoAgents.map(agent => agent.name);

    // Iterate through Valorant agents
    for (const valorantAgent of valorantAgents) {
        // Check if the agent exists in MongoDB
        const existingAgentIndex = mongoAgentName.indexOf(valorantAgent.name);

        // If agent doesn't exist, insert it into MongoDB
        if (existingAgentIndex === -1) {
            await AgentModel.create(valorantAgent);
        } else {
            // If agent exists, update it in MongoDB
            await AgentModel.findOneAndUpdate({ name: valorantAgent.name }, valorantAgent);
            // Remove the UUID from the list as it has been processed
            mongoAgentName.splice(existingAgentIndex, 1);
        }
    }
    return true;
}
module.exports = {
    getAll,
    get,
    create,
    update,
    deleteAgent,
    syncAgent
}