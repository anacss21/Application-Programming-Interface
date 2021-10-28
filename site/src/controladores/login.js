const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo')

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'O campo email e senha são obrigatório' });
    }

    try {
        const queryVerificarEmail = 'select * from usuarios where email = $1';
        const { rows, rowCount } = await conexao.query(queryVerificarEmail, [email]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        const usuario = rows[0];
        const senhaVerficada = await bcrypt.compare(senha, usuario.senha);

        if (!senhaVerficada) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s)' })
        }

        const { senha: senhaUsuario, ...dadosUsuario } = usuario
        const token = jwt.sign({ id: usuario.id }, segredo, { expiresIn: '2h' });
        return res.status(200).json({ usuario: dadosUsuario, token });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    };

}

module.exports = { login }