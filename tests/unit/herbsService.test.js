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

    // Atualiza estes testes existentes para passar o perfil
    test('TU25 - importação com ficheiro vazio deve lançar erro', () => {
        expect(() => herbsService.importHerbs([], 'Administrador')).toThrow('Ficheiro vazio');
    });

    test('TU26 - importação com linhas válidas deve retornar sucesso', () => {
        const rows = [
            { name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
            { name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 30, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 22000 }
        ];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.success).toBe(2);
        expect(result.failed).toBe(0);
    });

    test('TU27 - importação com linhas mistas deve registar erros', () => {
        const rows = [
            { name: '', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
            { name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 30, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 22000 }
        ];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.success).toBe(1);
        expect(result.failed).toBe(1);
    });

    test('TU28 - importação com todas as linhas inválidas', () => {
        const rows = [
            { name: '', scientificName: '', cycledays: 0, minTemp: 0, maxTemp: 0, minHumidity: 0, maxHumidity: 0, minLuminosity: 0, maxLuminosity: 0 }
        ];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.success).toBe(0);
        expect(result.failed).toBe(1);
    });
});

// ===== VALORES NULOS E VAZIOS =====
describe('createHerb - Valores Nulos e Vazios', () => {

    test('TU123 - nome null deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb(null, 'Mentha spicata', 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome inválido');
    });

    test('TU124 - nome undefined deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb(undefined, 'Mentha spicata', 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome inválido');
    });

    test('TU125 - nome com apenas espaços deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('   ', 'Mentha spicata', 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome inválido');
    });

    test('TU126 - nome científico null deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', null, 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome científico inválido');
    });

    test('TU127 - nome científico undefined deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', undefined, 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome científico inválido');
    });

    test('TU128 - nome científico com apenas espaços deve lançar erro', () => {
        expect(() =>
            herbsService.createHerb('Hortelã', '   ', 90, 15, 25, 50, 70, 5000, 20000)
        ).toThrow('Nome científico inválido');
    });
});

// ===== IMPORTAÇÃO CSV - CONTROLO DE ACESSO POR PERFIL =====
describe('importHerbs - Controlo de Acesso', () => {

    const validRows = [
        { name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }
    ];

    // PE - Classe válida
    test('TU129 - Administrador pode importar CSV', () => {
        const result = herbsService.importHerbs(validRows, 'Administrador');
        expect(result.success).toBe(1);
        expect(result.failed).toBe(0);
    });

    // PE - Classe inválida
    test('TU130 - Tecnico não pode importar CSV', () => {
        expect(() =>
            herbsService.importHerbs(validRows, 'Tecnico')
        ).toThrow('Apenas o Administrador pode importar ervas');
    });

    // PE - Classe inválida
    test('TU131 - Responsavel não pode importar CSV', () => {
        expect(() =>
            herbsService.importHerbs(validRows, 'Responsavel')
        ).toThrow('Apenas o Administrador pode importar ervas');
    });

    // PE - Classe inválida
    test('TU132 - sem perfil não pode importar CSV', () => {
        expect(() =>
            herbsService.importHerbs(validRows, null)
        ).toThrow('Apenas o Administrador pode importar ervas');
    });
});

// ===== IMPORTAÇÃO CSV - CAMPOS NULOS E VAZIOS NAS LINHAS =====
describe('importHerbs - Campos Nulos e Vazios nas Linhas', () => {

    test('TU133 - linha com nome null regista erro', () => {
        const rows = [{ name: null, scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.failed).toBe(1);
        expect(result.errors[0].error).toBe('Nome inválido');
    });

    test('TU134 - linha com nome vazio regista erro', () => {
        const rows = [{ name: '', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.failed).toBe(1);
        expect(result.errors[0].error).toBe('Nome inválido');
    });

    test('TU135 - linha com nome científico null regista erro', () => {
        const rows = [{ name: 'Hortelã', scientificName: null, cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.failed).toBe(1);
        expect(result.errors[0].error).toBe('Nome científico inválido');
    });

    test('TU136 - linha com cycledays null regista erro', () => {
        const rows = [{ name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: null, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.failed).toBe(1);
    });

    test('TU137 - CSV com linhas mistas (válidas e nulas)', () => {
        const rows = [
            { name: null, scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
            { name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 30, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 22000 }
        ];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.success).toBe(1);
        expect(result.failed).toBe(1);
    });

    test('TU138 - CSV com todas as linhas nulas', () => {
        const rows = [
            { name: null, scientificName: null, cycledays: null, minTemp: null, maxTemp: null, minHumidity: null, maxHumidity: null, minLuminosity: null, maxLuminosity: null }
        ];
        const result = herbsService.importHerbs(rows, 'Administrador');
        expect(result.success).toBe(0);
        expect(result.failed).toBe(1);
    });
});