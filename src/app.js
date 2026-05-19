const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const herbsRoutes = require('./routes/herbsRoutes');
const plansRoutes = require('./routes/plansRoutes');
const alertsRoutes = require('./routes/alertsRoutes');
const measurementsRoutes = require('./routes/measurementsRoutes');
const batchesRoutes = require('./routes/batchesRoutes');
const automationRoutes = require('./routes/automationRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/herbs', herbsRoutes);
app.use('/plans', plansRoutes);
app.use('/alerts', alertsRoutes);
app.use('/measurements', measurementsRoutes);
app.use('/batches', batchesRoutes);
app.use('/automation', automationRoutes);

if (process.env.NODE_ENV !== 'test') {
    const { seedUsers, seedHerbs, seedPlans, seedBatches, seedMeasurements, seedAlerts, seedAutomation } = require('./data/seed');
    seedUsers().then(() => {
        seedHerbs();
        seedPlans();
        seedBatches();
        seedMeasurements();
        seedAlerts();
        seedAutomation();
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor a correr na porta ${PORT}`);
    });
}

module.exports = app;