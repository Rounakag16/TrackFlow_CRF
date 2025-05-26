const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Create lead
router.post('/', leadController.createLead);

// Update only stage
router.put('/:id/stage', leadController.updateLeadStage);

// Full update
router.put('/:id', leadController.updateLead);

// Get all leads (with optional filters)
router.get('/', leadController.getLeads);

// Get lead by ID
router.get('/:id', leadController.getLeadById);

module.exports = router;
