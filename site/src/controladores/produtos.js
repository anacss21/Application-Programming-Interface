const conexao = require('../conexao');

const produtosUsuario = async (req, res) => {
    const { usuario } = req;

    try {

        const query = 'select * from produtos where usuario_id = $1'
        const encontrarProduto = await conexao.query(query, [usuario.id]);

        return res.status(200).json(encontrarProduto.rows)

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}
const detalharProdutos = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const query = 'select * from produtos where usuario_id = $1 and id = $2'
        const encontrarProduto = await conexao.query(query, [usuario.id, id]);

        if (encontrarProduto.rowCount === 0) {
            return res.status(404).json({ mensagem: `Não existe produto cadastrado com ID ${id}` })
        }
        return res.status(200).json(encontrarProduto.rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}
const cadastrarProduto = async (req, res) => {
    const { usuario } = req;
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório." })
    };
    if (!quantidade) {
        return res.status(400).json({ mensagem: "O campo quantidade é obrigatório." })
    };

    if (!preco) {
        return res.status(400).json({ mensagem: "O campo preço é obrigatório." })
    };
    if (!descricao) {
        return res.status(400).json({ mensagem: "O campo descrição é obrigatório." })
    };

    try {

        if (quantidade <= 0) {
            return res.status(401).json({ mensagem: 'Você deve cadastrar ao menos um produto' })
        }

        const adicionarProdutos = 'insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';
        const produtosAdicionados = await conexao.query(adicionarProdutos, [usuario.id, nome, quantidade, categoria, preco, descricao, imagem])

        if (produtosAdicionados.rowCount === 0) {
            return res.status(401).json({ mensagem: 'Não foi possível adicionar os produtos.' })
        }

        return res.status(204).json()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}
const atualizarProdutos = async (req, res) => {
    const { usuario } = req;
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const { id } = req.params;

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório." })
    };
    if (!quantidade) {
        return res.status(400).json({ mensagem: "O campo quantidade é obrigatório." })
    };

    if (!preco) {
        return res.status(400).json({ mensagem: "O campo preço é obrigatório." })
    };
    if (!descricao) {
        return res.status(400).json({ mensagem: "O campo descrição é obrigatório." })
    };

    try {
        const query = 'select * from produtos where usuario_id = $1 and id = $2'
        const encontrarProduto = await conexao.query(query, [usuario.id, id]);

        if (encontrarProduto.rowCount === 0) {
            return res.status(404).json({
                mensagem: `Não existe produto cadastrado com ID ${id}`
            });
        }

        const atualizarProdutos = 'update produtos set usuario_id = $1, nome = $2, quantidade = $3, categoria = $4, preco = $5, descricao = $6, imagem =$7 where id = $8'
        const produtosAdicionados = await conexao.query(atualizarProdutos, [usuario.id, nome, quantidade, categoria, preco, descricao, imagem, id])

        if (produtosAdicionados.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Não foi possível adicionar os produtos.' })
        }

        return res.status(204).json()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}
const excluirProdutos = async (req, res) => {
    const { id } = req.params;

    try {
        const { rowCount } = await conexao.query('delete from produtos where id = $1', [id]);

        if (rowCount === 0) {
            return res.status(400).json({
                mensagem: `Não existe produto cadastrado com ID ${id}`
            })
        }
        return res.status(204).json()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = { produtosUsuario, detalharProdutos, cadastrarProduto, atualizarProdutos, excluirProdutos }