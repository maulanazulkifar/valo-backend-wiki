const agents = require('../services/agents.services');

async function getAll(req, res, next) {
    try {
        const allAgent = await agents.getAll(req.body);
        res.json(allAgent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function getById(req, res, next) {

    try {
        const agent = await agents.get(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json(agent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function create(req, res, next) {
    try {
        // Call saveIfUnique function to save the model only if the uuid is unique
        const newAgent = await agents.create(req.body);
        res.status(201).json({ message: 'Agent successfully added', agent: newAgent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function update(req, res, next) {
    try {
        const agentId = req.params.id;
        const updates = req.body;
        const updatedAgent = await agents.update(agentId, updates);
        if (!updatedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.json({ message: 'Agent updated successfully', agent: updatedAgent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function deleteAgent(req, res, next) {

    try {
        const agent = await agents.deleteAgent(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json({ message: 'Agent deleted successfully', agent: agent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function syncAgent(req, res, next) {

    try {
        const syncAgent = await agents.syncAgent();
        res.json({ message: 'Agents synchronized successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteAgent,
    syncAgent
}