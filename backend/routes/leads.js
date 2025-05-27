const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/', leadController.createLead);
router.put('/:id/stage', leadController.updateLeadStage);
router.put('/:id', leadController.updateLead);
router.get('/', leadController.getLeads);
router.get('/:id', leadController.getLeadById);

module.exports = router;
