const authService = require('../../src/services/authService');

// limpa os utilizadores antes de cada teste
beforeEach(() => {
    authService.users.length = 0;
});

// ===== TESTES DE REGISTO =====
describe('register', () => {

    test('TU01 - registo com dados válidos e perfil Tecnico', async () => {
        const user = await authService.register('joao', '123456', 'Tecnico');
        expect(user.username).toBe('joao');
        expect(user.role).toBe('Tecnico');
        expect(user.id).toBeDefined();
    });

    test('TU02 - registo com perfil Responsavel', async () => {
        const user = await authService.register('maria', '123456', 'Responsavel');
        expect(user.role).toBe('Responsavel');
    });

    test('TU03 - registo com perfil Administrador', async () => {
        const user = await authService.register('admin', '123456', 'Administrador');
        expect(user.role).toBe('Administrador');
    });

    test('TU04 - registo com perfil inválido deve lançar erro', async () => {
        await expect(
            authService.register('joao', '123456', 'Hacker')
        ).rejects.toThrow('Perfil inválido');
    });

    test('TU05 - registo com utilizador duplicado deve lançar erro', async () => {
        await authService.register('joao', '123456', 'Tecnico');
        await expect(
            authService.register('joao', 'outrapass', 'Tecnico')
        ).rejects.toThrow('Utilizador já existe');
    });
});

// ===== TESTES DE LOGIN =====
describe('login', () => {

    beforeEach(async () => {
        await authService.register('joao', '123456', 'Tecnico');
    });

    test('TU06 - login com credenciais válidas devolve tokens', async () => {
        const result = await authService.login('joao', '123456');
        expect(result.token).toBeDefined();
        expect(result.refreshToken).toBeDefined();
    });

    test('TU07 - login com username inexistente deve lançar erro', async () => {
        await expect(
            authService.login('desconhecido', '123456')
        ).rejects.toThrow('Credenciais inválidas');
    });

    test('TU08 - login com password errada deve lançar erro', async () => {
        await expect(
            authService.login('joao', 'passworderrada')
        ).rejects.toThrow('Credenciais inválidas');
    });
});

// ===== TESTES DE REFRESH TOKEN =====
describe('refresh', () => {

    test('TU09 - refresh com token válido devolve novo token', async () => {
        await authService.register('joao', '123456', 'Tecnico');
        const { refreshToken } = await authService.login('joao', '123456');
        const result = authService.refresh(refreshToken);
        expect(result.token).toBeDefined();
    });

    test('TU10 - refresh com token inválido deve lançar erro', async () => {
        expect(() =>
            authService.refresh('token_invalido')
        ).toThrow('Refresh token inválido');
    });
});