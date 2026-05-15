const measurements = [];

const createMeasurement = (temperature, humidity, luminosity, batchId) => {
    if (!batchId) throw new Error('Lote inválido');

    if (temperature === null || temperature === undefined || isNaN(temperature)) {
        throw new Error('Temperatura inválida');
    }
    if (humidity === null || humidity === undefined || isNaN(humidity)) {
        throw new Error('Humidade inválida');
    }
    if (luminosity === null || luminosity === undefined || isNaN(luminosity)) {
        throw new Error('Luminosidade inválida');
    }
    if (temperature < -50 || temperature > 100) {
        throw new Error('Temperatura fora do intervalo aceitável');
    }
    if (humidity < 0 || humidity > 100) {
        throw new Error('Humidade fora do intervalo aceitável');
    }
    if (luminosity < 0) {
        throw new Error('Luminosidade não pode ser negativa');
    }

    const measurement = {
        id: measurements.length + 1,
        temperature,
        humidity,
        luminosity,
        batchId,
        createdAt: new Date().toISOString()
    };
    measurements.push(measurement);
    return measurement;
};

const validateMeasurement = (measurement) => {
    const errors = [];
    if (measurement.temperature === null || measurement.temperature === undefined) {
        errors.push('Temperatura em falta');
    }
    if (measurement.humidity === null || measurement.humidity === undefined) {
        errors.push('Humidade em falta');
    }
    if (measurement.luminosity === null || measurement.luminosity === undefined) {
        errors.push('Luminosidade em falta');
    }
    return errors;
};

module.exports = { createMeasurement, validateMeasurement, measurements };