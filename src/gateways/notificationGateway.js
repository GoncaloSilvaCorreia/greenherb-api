// Gateway real — em produção enviaria emails, SMS, etc.
const sendNotification = async (recipient, subject, message) => {
    // Em produção: chamada a SendGrid, Twilio, etc.
    throw new Error('Gateway não implementado em produção');
};

module.exports = { sendNotification };