const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ error: 'username, password e role são obrigatórios' });
        }
        const user = await authService.register(username, password, role);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'username e password são obrigatórios' });
        }
        const tokens = await authService.login(username, password);
        return res.status(200).json(tokens);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: 'refreshToken é obrigatório' });
        }
        const tokens = await authService.refresh(refreshToken);
        return res.status(200).json(tokens);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

module.exports = { register, login, refresh };