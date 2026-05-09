const express = require('express');
const authRoutes = require('./routes/authRoutes');
/*const usersRoutes = require('./routes/usersRoutes');
const herbsRoutes = require('./routes/herbsRoutes');
const plansRoutes = require('./routes/plansRoutes');
const batchesRoutes = require('./routes/batchesRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const measurementsRoutes = require('./routes/measurementsRoutes');
const alertsRoutes = require('./routes/alertsRoutes');
const automationRoutes = require('./routes/automationRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const auditRoutes = require('./routes/auditRoutes');*/

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
/*app.use('/users', usersRoutes);
app.use('/herbs', herbsRoutes);
app.use('/plans', plansRoutes);
app.use('/batches', batchesRoutes);
app.use('/tasks', tasksRoutes);
app.use('/measurements', measurementsRoutes);
app.use('/alerts', alertsRoutes);
app.use('/automation', automationRoutes);
app.use('/reports', reportsRoutes);
app.use('/audit', auditRoutes);*/

module.exports = app;