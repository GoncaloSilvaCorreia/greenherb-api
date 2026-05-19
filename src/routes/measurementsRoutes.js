const express = require('express');
const router = express.Router();
const measurementsService = require('../services/measurementsService');

router.get('/', (req, res) => {
    res.status(200).json(measurementsService.measurements);
});

router.post('/', (req, res) => {
    try {
        const { temperature, humidity, luminosity, batchId } = req.body;
        const measurement = measurementsService.createMeasurement(temperature, humidity, luminosity, batchId);
        res.status(201).json(measurement);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;