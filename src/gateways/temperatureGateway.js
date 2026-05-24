// Gateway real — em produção ligaria a sensores físicos
const getTemperature = async (batchId) => {
    // Em produção: chamada a API de sensores, base de dados IoT, etc.
    throw new Error('Gateway não implementado em produção');
};

module.exports = { getTemperature };