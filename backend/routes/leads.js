const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/', leadController.createLead);
router.put('/:id', leadController.updateLeadStage);
router.get('/', leadController.getLeads);

module.exports = router;
