const herbs = [];

const createHerb = (name, scientificName, cycledays, minTemp, maxTemp, minHumidity, maxHumidity, minLuminosity, maxLuminosity) => {
    if (name === null || name === undefined || name.toString().trim() === '') {
        throw new Error('Nome inválido');
    }
    if (scientificName === null || scientificName === undefined || scientificName.toString().trim() === '') {
        throw new Error('Nome científico inválido');
    }
    if (cycledays < 1 || cycledays > 365) {
        throw new Error('Duração do ciclo inválida');
    }
    if (minTemp < 0 || maxTemp > 50 || minTemp >= maxTemp) {
        throw new Error('Temperatura inválida');
    }
    if (minHumidity < 0 || maxHumidity > 100 || minHumidity >= maxHumidity) {
        throw new Error('Humidade inválida');
    }
    if (minLuminosity < 0 || maxLuminosity > 100000 || minLuminosity >= maxLuminosity) {
        throw new Error('Luminosidade inválida');
    }
    const herb = {
        id: herbs.length + 1,
        name,
        scientificName,
        cycledays,
        minTemp,
        maxTemp,
        minHumidity,
        maxHumidity,
        minLuminosity,
        maxLuminosity
    };
    herbs.push(herb);
    return herb;
};

const importHerbs = (rows, userRole) => {
    if (!rows || rows.length === 0) {
        throw new Error('Ficheiro vazio');
    }
    if (userRole !== 'Administrador') {
        throw new Error('Apenas o Administrador pode importar ervas');
    }
    const results = { success: 0, failed: 0, errors: [] };
    rows.forEach((row, index) => {
        try {
            createHerb(
                row.name,
                row.scientificName,
                row.cycledays,
                row.minTemp,
                row.maxTemp,
                row.minHumidity,
                row.maxHumidity,
                row.minLuminosity,
                row.maxLuminosity
            );
            results.success++;
        } catch (err) {
            results.failed++;
            results.errors.push({ line: index + 1, error: err.message });
        }
    });
    return results;
};

const getAll = () => herbs;

module.exports = { createHerb, importHerbs, getAll, herbs };