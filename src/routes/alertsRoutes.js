const express = require('express');
const router = express.Router();
const alertsService = require('../services/alertsServices');

router.get('/', (req, res) => {
    res.status(200).json(alertsService.alerts);
});

router.post('/', (req, res) => {
    try {
        const { classification, batchId, message } = req.body;
        const alert = alertsService.createAlert(classification, batchId, message);
        res.status(201).json(alert);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:id', (req, res) => {
    try {
        const { decision, justification } = req.body;
        const alert = alertsService.resolveAlert(parseInt(req.params.id), decision, justification);
        res.status(200).json(alert);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;