const herbsService = require('../../src/services/herbsService');

beforeEach(() => {
    herbsService.herbs.length = 0;
});

// ===== PARTICIONAMENTO DE EQUIVALÊNCIA =====
describe('createHerb - Particionamento de Equivalência', () => {

    test('TU15 - criação com dados válidos', () => {
        const herb = herbsService.createHerb('Hortelã', 'Mentha spicata', 90, 15, 25, 50, 70, 5000, 20000);
        expect(herb.id).toBeDefined();
        expect(herb.name).toBe('Hortelã');
    });

    test('TU16 - nome vazio deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('', 'Mentha spicata', 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome inválido');
    });

    test('TU17 - nome científico vazio deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', '', 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome científico inválido');
    });

    test('TU18 - temperatura mínima maior que máxima deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', 'Mentha spicata', 90, 30, 25, 50, 70, 5000, 20000)
        ).toThrow('Temperatura inválida');
    });

    test('TU19 - humidade mínima maior que máxima deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', 'Mentha spicata', 90, 15, 25, 80, 50, 5000, 20000)
        ).toThrow('Humidade inválida');
    });
});

// ===== VALORES LIMITE - DURAÇÃO DO CICLO [1, 365] =====
describe('createHerb - Valores Limite (cycledays)', () => {

    test('TU20 - cycledays = 0 (abaixo do limite) deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', 'Mentha spicata', 0, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Duração do ciclo inválida');
    });

    test('TU21 - cycledays = 1 (limite inferior) deve ser aceite', () => {
        const herb = herbsService.createHerb('Hortelã', 'Mentha spicata', 1, 15, 25, 50, 70, 5000, 20000);
        expect(herb.cycledays).toBe(1);
    });

    test('TU22 - cycledays = 90 (valor nominal) deve ser aceite', () => {
        const herb = herbsService.createHerb('Hortelã', 'Mentha spicata', 90, 15, 25, 50, 70, 5000, 20000);
        expect(herb.cycledays).toBe(90);
    });

    test('TU23 - cycledays = 365 (limite superior) deve ser aceite', () => {
        const herb = herbsService.createHerb('Hortelã', 'Mentha spicata', 365, 15, 25, 50, 70, 5000, 20000);
        expect(herb.cycledays).toBe(365);
    });

    test('TU24 - cycledays = 366 (acima do limite) deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', 'Mentha spicata', 366, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Duração do ciclo inválida');
    });
});

// ===== IMPORTAÇÃO CSV =====
describe('importHerbs', () => {

    test('TU25 - importação com ficheiro vazio deve lançar erro', () => {
        expect(() => herbsService.importHerbs([])).toThrow('Ficheiro vazio');
    });

    test('TU26 - importação com linhas válidas deve retornar sucesso', () => {
        const rows = [
            { name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
            { name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 30, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 22000 }
        ];
        const result = herbsService.importHerbs(rows);
        expect(result.success).toBe(2);
        expect(result.failed).toBe(0);
    });

    test('TU27 - importação com linhas inválidas deve registar erros', () => {
        const rows = [
            { name: '', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
            { name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 30, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 22000 }
        ];
        const result = herbsService.importHerbs(rows);
        expect(result.success).toBe(1);
        expect(result.failed).toBe(1);
        expect(result.errors[0].line).toBe(1);
    });

    test('TU28 - importação com todas as linhas inválidas', () => {
        const rows = [
            { name: '', scientificName: '', cycledays: 0, minTemp: 0, maxTemp: 0, minHumidity: 0, maxHumidity: 0, minLuminosity: 0, maxLuminosity: 0 }
        ];
        const result = herbsService.importHerbs(rows);
        expect(result.success).toBe(0);
        expect(result.failed).toBe(1);
    });
});