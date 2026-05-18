const request = require('supertest');
const app = require('../../src/app');

describe('TI01 - POST /auth/register', () => {

    test('TI01a - registo válido com perfil Tecnico devolve 201', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({ username: 'tecnico1', password: '123456', role: 'Tecnico' });
        expect(res.status).toBe(201);
        expect(res.body.username).toBe('tecnico1');
        expect(res.body.role).toBe('Tecnico');
    });

    test('TI01b - registo válido com perfil Responsavel devolve 201', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({ username: 'responsavel1', password: '123456', role: 'Responsavel' });
        expect(res.status).toBe(201);
    });

    test('TI01c - registo válido com perfil Administrador devolve 201', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({ username: 'admin1', password: '123456', role: 'Administrador' });
        expect(res.status).toBe(201);
    });

    test('TI01d - perfil inválido devolve 400', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({ username: 'hacker', password: '123456', role: 'Hacker' });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    test('TI01e - username duplicado devolve 400', async () => {
        await request(app).post('/auth/register').send({ username: 'duplicado', password: '123456', role: 'Tecnico' });
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({ username: 'duplicado', password: '123456', role: 'Tecnico' });
        expect(res.status).toBe(400);
    });

    test('TI01f - body vazio devolve 400', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({});
        expect(res.status).toBe(400);
    });

    test('TI01g - sem Content-Type devolve 400', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send('username=joao&password=123456&role=Tecnico');
        expect(res.status).toBe(400);
    });

    test('TI01h - método GET não permitido devolve 404', async () => {
        const res = await request(app).get('/auth/register');
        expect(res.status).toBe(404);
    });
});

describe('TI02 - POST /auth/login', () => {

    beforeEach(async () => {
        await request(app).post('/auth/register').send({ username: 'loginuser', password: '123456', role: 'Tecnico' });
    });

    test('TI02a - login válido devolve 200 com tokens', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'loginuser', password: '123456' });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.refreshToken).toBeDefined();
    });

    test('TI02b - password errada devolve 401', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'loginuser', password: 'errada' });
        expect(res.status).toBe(401);
    });

    test('TI02c - username inexistente devolve 401', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'naoexiste', password: '123456' });
        expect(res.status).toBe(401);
    });

    test('TI02d - body vazio devolve 400', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({});
        expect(res.status).toBe(400);
    });

    test('TI02e - username vazio devolve 400', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({ username: '', password: '123456' });
        expect(res.status).toBe(400);
    });
});

describe('TI03 - POST /auth/refresh', () => {

    let refreshToken;

    beforeEach(async () => {
        await request(app).post('/auth/register').send({ username: 'refreshuser', password: '123456', role: 'Tecnico' });
        const res = await request(app).post('/auth/login').send({ username: 'refreshuser', password: '123456' });
        refreshToken = res.body.refreshToken;
    });

    test('TI03a - refresh token válido devolve 200 com novo token', async () => {
        const res = await request(app)
            .post('/auth/refresh')
            .set('Content-Type', 'application/json')
            .send({ refreshToken });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('TI03b - refresh token inválido devolve 401', async () => {
        const res = await request(app)
            .post('/auth/refresh')
            .set('Content-Type', 'application/json')
            .send({ refreshToken: 'token_invalido' });
        expect(res.status).toBe(401);
    });

    test('TI03c - sem refresh token devolve 400', async () => {
        const res = await request(app)
            .post('/auth/refresh')
            .set('Content-Type', 'application/json')
            .send({});
        expect(res.status).toBe(400);
    });
});