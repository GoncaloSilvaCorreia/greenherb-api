const express = require('express');
const router = express.Router();
const automationService = require('../services/automationService');

router.get('/', (req, res) => {
    res.status(200).json({ mode: automationService.getMode(), rules: automationService.rules });
});

router.post('/', (req, res) => {
    try {
        const { action, condition, threshold } = req.body;
        const rule = automationService.createRule(action, condition, threshold);
        res.status(201).json(rule);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/mode', (req, res) => {
    try {
        const { mode } = req.body;
        const result = automationService.setMode(mode);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;