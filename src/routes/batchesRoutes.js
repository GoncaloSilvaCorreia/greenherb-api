const express = require('express');
const router = express.Router();
const batchesService = require('../services/batchesService');

router.get('/', (req, res) => {
    res.status(200).json(batchesService.batches);
});

router.post('/', (req, res) => {
    try {
        const { herbId, planId } = req.body;
        const batch = batchesService.createBatch(herbId, planId);
        res.status(201).json(batch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:id/state', (req, res) => {
    try {
        const { state } = req.body;
        const batch = batchesService.transitionState(parseInt(req.params.id), state);
        res.status(200).json(batch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/:id/losses', (req, res) => {
    try {
        const { loss } = req.body;
        const batch = batchesService.registerLoss(parseInt(req.params.id), loss);
        res.status(200).json(batch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;