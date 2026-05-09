const authService = require('../../src/services/authService');

beforeEach(() => {
    authService.users.length = 0;
});

// ===== TESTES DE REGISTO =====
describe('register', () => {

    // Classes válidas de perfil
    test('TU01 - registo com perfil válido Tecnico', async () => {
        const user = await authService.register('joao', '123456', 'Tecnico');
        expect(user.username).toBe('joao');
        expect(user.role).toBe('Tecnico');
        expect(user.id).toBeDefined();
    });

    test('TU02 - registo com perfil válido Responsavel', async () => {
        const user = await authService.register('maria', '123456', 'Responsavel');
        expect(user.role).toBe('Responsavel');
    });

    test('TU03 - registo com perfil válido Administrador', async () => {
        const user = await authService.register('admin', '123456', 'Administrador');
        expect(user.role).toBe('Administrador');
    });

    // Classe inválida de perfil
    test('TU04 - registo com perfil inválido deve lançar erro', async () => {
        await expect(
            authService.register('joao', '123456', 'Hacker')
        ).rejects.toThrow('Perfil inválido');
    });

    // Classe inválida de username - duplicado
    test('TU05 - registo com utilizador duplicado deve lançar erro', async () => {
        await authService.register('joao', '123456', 'Tecnico');
        await expect(
            authService.register('joao', 'outrapass', 'Tecnico')
        ).rejects.toThrow('Utilizador já existe');
    });

    // Classe inválida de username - vazio
    test('TU06 - registo com username vazio deve lançar erro', async () => {
        await expect(
            authService.register('', '123456', 'Tecnico')
        ).rejects.toThrow('Username inválido');
    });

    // Classe inválida de password - vazia
    test('TU07 - registo com password vazia deve lançar erro', async () => {
        await expect(
            authService.register('joao', '', 'Tecnico')
        ).rejects.toThrow('Password inválida');
    });
});

// ===== TESTES DE LOGIN =====
describe('login', () => {

    beforeEach(async () => {
        await authService.register('joao', '123456', 'Tecnico');
    });

    // Classe válida de credenciais
    test('TU08 - login com credenciais válidas devolve tokens', async () => {
        const result = await authService.login('joao', '123456');
        expect(result.token).toBeDefined();
        expect(result.refreshToken).toBeDefined();
    });

    // Classe inválida de username - inexistente
    test('TU09 - login com username inexistente deve lançar erro', async () => {
        await expect(
            authService.login('desconhecido', '123456')
        ).rejects.toThrow('Credenciais inválidas');
    });

    // Classe inválida de username - vazio
    test('TU10 - login com username vazio deve lançar erro', async () => {
        await expect(
            authService.login('', '123456')
        ).rejects.toThrow('Username inválido');
    });

    // Classe inválida de password - errada
    test('TU11 - login com password errada deve lançar erro', async () => {
        await expect(
            authService.login('joao', 'passworderrada')
        ).rejects.toThrow('Credenciais inválidas');
    });

    // Classe inválida de password - vazia
    test('TU12 - login com password vazia deve lançar erro', async () => {
        await expect(
            authService.login('joao', '')
        ).rejects.toThrow('Password inválida');
    });
});

// ===== TESTES DE REFRESH TOKEN =====
describe('refresh', () => {

    // Classe válida de token
    test('TU13 - refresh com token válido devolve novo token', async () => {
        await authService.register('joao', '123456', 'Tecnico');
        const { refreshToken } = await authService.login('joao', '123456');
        const result = authService.refresh(refreshToken);
        expect(result.token).toBeDefined();
    });

    // Classe inválida de token
    test('TU14 - refresh com token inválido deve lançar erro', async () => {
        expect(() =>
            authService.refresh('token_invalido')
        ).toThrow('Refresh token inválido');
    });
});