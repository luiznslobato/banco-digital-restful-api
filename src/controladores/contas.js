let { contas, identificadorConta } = require('../bancodedados');

// Lista todas as contas bancarias
const listarContas = (req, res) => {
    if (!contas.length) {
        return res.status(200).json({ mensagem: "Nenhuma conta bancaria encontrada!" });
    }
    return res.status(200).json(contas);
}

// Cria uma nova conta bancaria
const criarConta = (req, res) => {

    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const contaCadastrada = contas.find(conta => conta.cpf === cpf || conta.email === email);

    if (contaCadastrada) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado!" });
    }

    const novaConta = {
        numeroConta: identificadorConta++,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo: 0
    };

    contas.push(novaConta);

    return res.status(201).send();
};

// Atualiza os dados do usuário
const atualizarUsuario = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    const dadosUsuario = contas.find(conta => conta.cpf === cpf || conta.email === email);
    if (dadosUsuario && Number(dadosUsuario.numeroConta) !== Number(numeroConta)) {
        return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" });
    }

    const conta = contas.find((conta) => {
        return conta.numeroConta === Number(numeroConta);
    });

    conta.nome = nome;
    conta.cpf = cpf;
    conta.data_nascimento = data_nascimento;
    conta.telefone = telefone;
    conta.email = email;
    conta.senha = senha;

    return res.status(204).send();
}

//Exclui uma conta bancaria cadastrada
const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => {
        return conta.numeroConta === Number(numeroConta);
    });

    if (Number(conta.saldo) !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }

    let indice = contas.indexOf(conta);
    contas.splice(indice, 1);

    return res.status(204).send()
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta
}
