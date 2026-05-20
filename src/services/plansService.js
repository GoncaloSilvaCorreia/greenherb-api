const plans = [];

const VALID_TYPES = ['regular', 'emergencia', 'pontual'];

const createPlan = (type, minTemp, maxTemp, minHumidity, maxHumidity, minLuminosity, maxLuminosity, cycleDays, authorizedBy) => {

    // Particionamento de Equivalência - tipo de plano
    // DECISÃO 1: if (!VALID_TYPES.includes(type))
    if (!VALID_TYPES.includes(type)) {
        throw new Error('Tipo de plano inválido');
    }

    // Plano pontual exige autorização do Responsável Técnico
    // DECISÃO 2: if (type === 'pontual' && !authorizedBy)
    if (type === 'pontual' && !authorizedBy) {
        throw new Error('Plano pontual requer autorização do Responsável Técnico');
    }

    // Valores Limite - temperatura [18, 28]
    // DECISÃO 3: if (minTemp < 18 || maxTemp > 28 || minTemp >= maxTemp)
    if (minTemp < 18 || maxTemp > 28 || minTemp >= maxTemp) {
        throw new Error('Temperatura fora dos limites [18, 28]');
    }

    // Valores Limite - humidade [40, 80]
    // DECISÃO 4: if (minHumidity < 40 || maxHumidity > 80 || minHumidity >= maxHumidity)
    if (minHumidity < 40 || maxHumidity > 80 || minHumidity >= maxHumidity) {
        throw new Error('Humidade fora dos limites [40, 80]');
    }

    // Valores Limite - luminosidade [5000, 25000]
    // DECISÃO 5: if (minLuminosity < 5000 || maxLuminosity > 25000 || minLuminosity >= maxLuminosity)
    if (minLuminosity < 5000 || maxLuminosity > 25000 || minLuminosity >= maxLuminosity) {
        throw new Error('Luminosidade fora dos limites [5000, 25000]');
    }

    // Valores Limite - duração do ciclo [1, 365]
    // DECISÃO 6: if (cycleDays < 1 || cycleDays > 365)
    if (cycleDays < 1 || cycleDays > 365) {
        throw new Error('Duração do ciclo inválida [1, 365]');
    }

    const plan = {
        id: plans.length + 1,
        type,
        minTemp,
        maxTemp,
        minHumidity,
        maxHumidity,
        minLuminosity,
        maxLuminosity,
        cycleDays,
        authorizedBy: authorizedBy || null
    };
    plans.push(plan);
    return plan;
};

module.exports = { createPlan, plans };