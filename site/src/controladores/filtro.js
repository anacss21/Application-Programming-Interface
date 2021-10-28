const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');

const verificacao = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization === 'Bearer') {
        return res.status(401).json({ mensagem: 'Token não informado' });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { usuario } = jwt.verify(token, segredo)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado' })
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, segredo);

        const query = 'select * from usuarios where id = $1';
        const { rows, rowCount } = await conexao.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json('O usuario não foi encontrado');
        }

        const { senha, ...usuario } = rows[0];
        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }



};

module.exports = verificacao;