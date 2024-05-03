let { contas, saques, depositos, transferencias } = require('../bancodedados');

// Deposita um valor especificado ao saldo de uma conta bancaria e registrar essa transação
const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor deve ser maior que zero!" });
    }

    const conta = contas.find((conta) => conta.numeroConta === Number(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta báncaria não encontrada!" });
    }

    conta.saldo += Number(valor);

    const registroDeposito = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: Number(valor)
    };
    depositos.push(registroDeposito);

    return res.status(204).send();
}

// Saca um valor especificado de uma conta bancária e registrar essa transação
const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const conta = contas.find((conta) => conta.numeroConta === Number(numero_conta));
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancaria não encontrada!" });
    }

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor não pode ser menor que zero!" });
    }

    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    if (conta.saldo < Number(valor)) {
        return res.status(403).json({ mensagem: "Saldo insuficiente!" });
    }

    conta.saldo -= Number(valor);

    const registroSaque = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: Number(valor)
    };
    saques.push(registroSaque);

    return res.status(200).json({ mensagem: "Saque realizado com sucesso!" });

}

// Transfere dinheiro de uma conta bancária para outra e registrar essa transação
const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor da transferência deve ser maior que zero!" });
    }

    const contaOrigem = contas.find(conta => conta.numeroConta === Number(numero_conta_origem));
    const contaDestino = contas.find(conta => conta.numeroConta === Number(numero_conta_destino));

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: "Conta de origem ou destino não encontrada!" });
    }

    if (contaOrigem.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    if (contaOrigem.saldo < Number(valor)) {
        return res.status(403).json({ mensagem: "Saldo insuficiente!" });
    }

    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);

    const registroTransferencia = {
        data: new Date().toISOString(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: Number(valor)
    };
    transferencias.push(registroTransferencia);

    return res.status(200).send();
}

// Exibi o saldo da conta bancária em específicada
const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" });
    }

    const conta = contas.find(conta => conta.numeroConta === Number(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    return res.status(200).json({ saldo: conta.saldo });
}

// Lista as transações realizadas de uma conta específicada
const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" });
    }

    const conta = contas.find(conta => conta.numeroConta === Number(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (conta.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    const extratoConta = {
        depositos: depositos.filter(transacao => transacao.numero_conta === numero_conta),
        saques: saques.filter(transacao => transacao.numero_conta === numero_conta),
        transferenciasEnviadas: transferencias.filter(transacao => transacao.numero_conta_origem === numero_conta),
        transferenciasRecebidas: transferencias.filter(transacao => transacao.numero_conta_destino === numero_conta)
    };

    return res.status(200).json(extratoConta);
}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}
