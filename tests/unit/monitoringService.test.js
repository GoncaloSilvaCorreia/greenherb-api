const monitoringService = require('../../src/services/monitoringService');
const temperatureGateway = require('../../src/gateways/temperatureGateway');
const notificationGateway = require('../../src/gateways/notificationGateway');
const alertsService = require('../../src/services/alertsServices');

// Mock automático dos gateways com Jest
jest.mock('../../src/gateways/temperatureGateway');
jest.mock('../../src/gateways/notificationGateway');

beforeEach(() => {
    alertsService.alerts.length = 0;
    jest.clearAllMocks();
});

const mockPlan = {
    minTemp: 18,
    maxTemp: 28,
    minHumidity: 40,
    maxHumidity: 80,
    minLuminosity: 5000,
    maxLuminosity: 25000
};

// =====================================================
// STUB — temperatureGateway
// Substitui o sensor externo com valores controlados
// Tipo: Stub (fornece dados pré-definidos)
// =====================================================
describe('SP01 - Stub: temperatureGateway', () => {

    test('SP01a - temperatura normal → sem alerta, sem notificação', async () => {
        // STUB: define o valor devolvido pelo gateway
        temperatureGateway.getTemperature.mockResolvedValue(23);
        notificationGateway.sendNotification.mockResolvedValue(true);

        const result = await monitoringService.checkTemperature(1, mockPlan);

        expect(result.temperature).toBe(23);
        expect(result.alert).toBeNull();
        expect(result.notified).toBe(false);
        // Stub devolveu 23 → dentro dos limites → sem notificação
        expect(notificationGateway.sendNotification).not.toHaveBeenCalled();
    });

    test('SP01b - temperatura acima do limite → alerta Aviso', async () => {
        // STUB: simula sensor a devolver temperatura elevada
        temperatureGateway.getTemperature.mockResolvedValue(30);
        notificationGateway.sendNotification.mockResolvedValue(true);

        const result = await monitoringService.checkTemperature(1, mockPlan);

        expect(result.temperature).toBe(30);
        expect(result.alert).not.toBeNull();
        expect(result.alert.classification).toBe('Aviso');
        expect(result.notified).toBe(true);
    });

    test('SP01c - temperatura crítica (>33) → alerta Critico', async () => {
        // STUB: simula falha grave do sensor (temperatura muito alta)
        temperatureGateway.getTemperature.mockResolvedValue(34);
        notificationGateway.sendNotification.mockResolvedValue(true);

        const result = await monitoringService.checkTemperature(1, mockPlan);

        expect(result.alert.classification).toBe('Critico');
        expect(result.notified).toBe(true);
    });

    test('SP01d - temperatura abaixo do limite → alerta Aviso', async () => {
        // STUB: simula temperatura muito baixa
        temperatureGateway.getTemperature.mockResolvedValue(10);
        notificationGateway.sendNotification.mockResolvedValue(true);

        const result = await monitoringService.checkTemperature(1, mockPlan);

        expect(result.alert).not.toBeNull();
        expect(result.notified).toBe(true);
    });

    test('SP01e - gateway falha → lança erro', async () => {
        // STUB: simula falha de comunicação com o sensor
        temperatureGateway.getTemperature.mockRejectedValue(
            new Error('Sensor indisponível')
        );

        await expect(
            monitoringService.checkTemperature(1, mockPlan)
        ).rejects.toThrow('Sensor indisponível');
    });
});

// =====================================================
// MOCK — notificationGateway
// Verifica que as notificações são enviadas corretamente
// Tipo: Mock (verifica comportamento/chamadas)
// =====================================================
describe('SP02 - Mock: notificationGateway', () => {

    test('SP02a - alerta gerado → notificação enviada ao admin', async () => {
        temperatureGateway.getTemperature.mockResolvedValue(30);
        notificationGateway.sendNotification.mockResolvedValue(true);

        await monitoringService.checkTemperature(1, mockPlan);

        // MOCK: verifica que sendNotification foi chamado
        expect(notificationGateway.sendNotification).toHaveBeenCalledTimes(1);
        expect(notificationGateway.sendNotification).toHaveBeenCalledWith(
            'admin@greenherb.pt',
            expect.stringContaining('Lote 1'),
            expect.stringContaining('30')
        );
    });

    test('SP02b - sem alerta → notificação NÃO enviada', async () => {
        temperatureGateway.getTemperature.mockResolvedValue(23);
        notificationGateway.sendNotification.mockResolvedValue(true);

        await monitoringService.checkTemperature(1, mockPlan);

        // MOCK: verifica que sendNotification NÃO foi chamado
        expect(notificationGateway.sendNotification).not.toHaveBeenCalled();
    });

    test('SP02c - alerta Critico → subject contém "Critico"', async () => {
        temperatureGateway.getTemperature.mockResolvedValue(34);
        notificationGateway.sendNotification.mockResolvedValue(true);

        await monitoringService.checkTemperature(1, mockPlan);

        // MOCK: verifica o conteúdo da notificação
        expect(notificationGateway.sendNotification).toHaveBeenCalledWith(
            'admin@greenherb.pt',
            expect.stringContaining('Critico'),
            expect.any(String)
        );
    });

    test('SP02d - alerta Aviso → subject contém "Aviso"', async () => {
        temperatureGateway.getTemperature.mockResolvedValue(30);
        notificationGateway.sendNotification.mockResolvedValue(true);

        await monitoringService.checkTemperature(1, mockPlan);

        expect(notificationGateway.sendNotification).toHaveBeenCalledWith(
            'admin@greenherb.pt',
            expect.stringContaining('Aviso'),
            expect.any(String)
        );
    });

    test('SP02e - falha no envio de notificação → lança erro', async () => {
        temperatureGateway.getTemperature.mockResolvedValue(30);
        // MOCK: simula falha no serviço de notificações
        notificationGateway.sendNotification.mockRejectedValue(
            new Error('Serviço de notificações indisponível')
        );

        await expect(
            monitoringService.checkTemperature(1, mockPlan)
        ).rejects.toThrow('Serviço de notificações indisponível');
    });

    test('SP02c - múltiplas leituras → notificação enviada para cada alerta', async () => {
        temperatureGateway.getTemperature
            .mockResolvedValueOnce(30) // primeira leitura: alerta
            .mockResolvedValueOnce(23) // segunda leitura: normal
            .mockResolvedValueOnce(31); // terceira leitura: alerta

        notificationGateway.sendNotification.mockResolvedValue(true);

        await monitoringService.checkTemperature(1, mockPlan);
        await monitoringService.checkTemperature(1, mockPlan);
        await monitoringService.checkTemperature(1, mockPlan);

        // MOCK: verifica que foi chamado exatamente 2 vezes
        expect(notificationGateway.sendNotification).toHaveBeenCalledTimes(2);
    });
});