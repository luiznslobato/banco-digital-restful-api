let { contas } = require('./bancodedados');

// Verifica se foi informada a senha e se estar correta
const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Senha não informada!' });
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.status(403).json({ mensagem: 'Senha incorreta!' });
    }
    next();
}

// Verifica se todos os campos da requisição foram informados
const validarCorpoRequisicao = (req, res, next) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }
    next();
}

// Verifica se o numero da conta foi informado como parametro na URL e se já tem cadastro
const validarContaCadastrada = (req, res, next) => {
    const { numeroConta } = req.params;

    const contaCadastrada = contas.find(conta => Number(conta.numeroConta) === Number(numeroConta));

    if (!contaCadastrada) {
        return res.status(400).json({ mensagem: "Conta não encontrada!" });
    }
    next();
}

module.exports = {
    validarSenha,
    validarCorpoRequisicao,
    validarContaCadastrada
}
