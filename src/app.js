const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const herbsRoutes = require('./routes/herbsRoutes');
const plansRoutes = require('./routes/plansRoutes');
const { seedHerbs, seedPlans } = require('./data/seed');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/herbs', herbsRoutes);
app.use('/plans', plansRoutes);

seedHerbs();
seedPlans();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});

module.exports = app;