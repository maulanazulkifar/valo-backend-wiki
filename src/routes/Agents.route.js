const express = require('express');
const router = express.Router();
const agentsController = require('../controller/agents.controller')

/* GET All Agents */
router.get('/', agentsController.getAll);
/* GET Agent by id */
router.get('/:id', agentsController.getById);
/* POST Agent to Create new agent */
router.post('/create', agentsController.create);
/* PUT Agent to Update agent */
router.put('/update/:id', agentsController.update);
/* DELETE Agent to Remove agent */
router.delete('/delete/:id', agentsController.deleteAgent);
/* Sync Agent with Valorant-api */
router.get('/sync/get', agentsController.syncAgent);

module.exports = router;