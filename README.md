# API RESTful Banco Digital
O projeto trata-se de uma API RESTFul que simula um banco digital, com as seguintes funcionalidades:

-   Criar conta bancária;
-   Listar contas bancárias;
-   Atualizar os dados do usuário da conta bancária;
-   Excluir uma conta bancária;
-   Depósitar em uma conta bancária;
-   Sacar de uma conta bancária;
-   Transferir valores entre contas bancárias;
-   Consultar saldo da conta bancária;
-   Emitir extrato bancário.

Os dados são persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`.

<br>

## Executando o projeto:

   1. Clone o repositório para o seu computador;
   2. Abra o terminal na pasta raiz do repositório;
   3. Execute o comando `npm install` no terminal para instalar as dependências do projeto;
   4. Execute o comando `npm run dev` no terminal para iniciar o servidor;
   5. Abra o Insomnia e crie uma nova coleção;
   6. Importe o arquivo `insomnia_api_restful_banco_digital.json` dentro da coleção para                                                           
      testar todas as funcionalidades do projeto já definidas e salvas nesse arquivo.
      
>  **Programas importantes:**
>                                            
>  **Node** versão igual ou superior á 20.11.0 - [Node Download](https://nodejs.org/pt-br/download/)                                                                                 
>  **Insomnia** versão igual ou superior á 9.0.0 - [Insomnia Download](https://insomnia.rest/download)

<br>

## Endpoints

### Listar contas bancárias 
`GET` `/contas?senha_banco=Cubos123Bank`

![](https://i.imgur.com/HJVVwud.png)

-   **Lista todas as contas bancárias existentes** a partir da seguintes validações:

    -   A senha do banco deve ser informada (passada como query params na url);
    -   A senha do banco deve está correta.
    -   
<br>

### Criar conta bancária
`POST` `/contas`

![](https://i.imgur.com/Of5l1Yg.png)

-   **Cria uma conta bancária** a partir da seguintes validações:
  
    -   CPF deve ser um campo único;
    -   E-mail deve ser um campo único;
    -   Todos os campos devem serem informados;
    -   Define o saldo inicial da conta como 0;
    -   Cria uma nova conta cujo número é único.

<br>

### Atualizar usuário da conta bancária
`PUT` `/contas/:numeroConta/usuario`

![](https://i.imgur.com/hyTMY1I.png)

-   **Atualiza apenas os dados do usuário de uma conta bancária** a partir da seguintes validações:

    -   Todos os campos no body da requisição devem serem informados;
    -   O número da conta passado como parametro na URL deve ser válida;
    -   O CPF informado não pode pertencer a outra conta bancaria;
    -   O E-mail informado não pode pertencer a outra conta bancaria.

<br>

### Excluir Conta
`DELETE` `/contas/:numeroConta`

![](https://i.imgur.com/1vjJKEc.png)

-   **Exclui uma conta bancária existente** a partir da seguintes validações:

    -   O número da conta passado como parametro na URL deve ser válido;
    -   Permiti excluir uma conta bancária apenas se o saldo for 0.

<br>

### Depositar
`POST` `/transacoes/depositar`

![](https://i.imgur.com/dNlHN01.png)

-   **Soma o valor do depósito ao saldo de uma conta válida e registrar essa transação** a partir da seguintes validações:

    -   O número da conta e o valor do depósito devem serem informados no body;
    -   A conta bancária informada deve existir;
    -   Depósitos com valores negativos ou zerados não são permitidos.

<br>

### Sacar
`POST` `/transacoes/sacar`

![](https://i.imgur.com/gUOHcRj.png)

-  **Subtrai o valor de saque do saldo da conta bancária e registrar essa transação.** a partir da seguintes validações:

    -   O núumero da conta, o valor do saque e a senha devem serem informados no body;
    -   A conta bancária informada deve existir;
    -   A senha informada deve ser válida para a conta informada;
    -   Deve haver saldo disponível para saque.

<br>

### Tranferir
`POST` `/transacoes/transferir`

![](https://i.imgur.com/yC7cfWr.png)

-   **Subtrai o valor de transferência do saldo de uma conta de origem e soma esse valor ao saldo de uma conta de destino e registrar essa transação**  a partir da seguintes validações:

    -   O número da conta de origem, de destino, senha da conta de origem e valor da transferência devem serem informados no body;
    -   A conta bancária de origem informada deve existir;
    -   A conta bancária de destino informada deve existir;
    -   A senha informada deve ser válida para a conta de origem informada;
    -   Deve haver saldo disponível na conta de origem para a transferência.

<br>

### Saldo
`GET` `/contas/saldo?numero_conta=123&senha=123`

![](https://i.imgur.com/F5JvyQR.png)

-   **Retorna o saldo de uma conta bancaria** a partir da seguintes validações:

    -   O número da conta e a senha devem serem informadas (passados como query params na url);
    -   A conta bancária informada deve existir;
    -   A senha informada deve ser válida.

<br>

### Extrato
`GET` `/contas/extrato?numero_conta=123&senha=123`

![](https://i.imgur.com/GXey0GJ.png)



-   **Lista as transações realizadas de uma conta** a partir da seguintes validações:

    -   O número da conta e a senha devem serem informadas (passados como query params na url);
    -   A conta bancária informada deve existir;
    -   A senha informada deve ser válida.

<br>

## Autor

 <img style="border-radius: 50%;" src="https://i.imgur.com/etKbfgP.jpg" width="100px;" alt=""/>
Feito por **Luiz Nonato** 👋🏽 Entre em contato!

<div>
<a href="https://www.linkedin.com/in/luiz-nonato-silva-lobato-943203187" target="_blank"><img loading="lazy" src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>   
<a href = "mailto:contato.luiznonato@gmail.com"><img loading="lazy" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>
