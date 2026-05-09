const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'greenherb_secret';

// utilizadores em memória (substituir por BD no futuro)
const users = [];

const register = async (username, password, role) => {
    const validRoles = ['Tecnico', 'Responsavel', 'Administrador'];
    if (!validRoles.includes(role)) {
        throw new Error('Perfil inválido');
    }
    const existing = users.find(u => u.username === username);
    if (existing) {
        throw new Error('Utilizador já existe');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, password: hashed, role };
    users.push(user);
    return { id: user.id, username, role };
};

const login = async (username, password) => {
    const user = users.find(u => u.username === username);
    if (!user) {
        throw new Error('Credenciais inválidas');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Credenciais inválidas');
    }
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
        { id: user.id },
        SECRET,
        { expiresIn: '7d' }
    );
    return { token, refreshToken };
};

const refresh = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, SECRET);
        const user = users.find(u => u.id === decoded.id);
        if (!user) {
            throw new Error('Utilizador não encontrado');
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            SECRET,
            { expiresIn: '1h' }
        );
        return { token };
    } catch (err) {
        throw new Error('Refresh token inválido');
    }
};

module.exports = { register, login, refresh, users };