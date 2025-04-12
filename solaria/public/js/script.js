$(document).ready(function () {
    $('#login-form').submit(function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        var formData = $(this).serialize(); // Pega os dados do formulário

        $.ajax({
            type: 'POST',
            url: 'login.php', // O caminho para o script PHP
            data: formData,
            dataType: 'json', // Espera um JSON de resposta
            success: function (response) {
                if (response.success) {
                    alert('Login realizado com sucesso!');
                    window.location.reload(); // Recarrega a página
                } else {
                    alert('Erro: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText); // Mostra erros no console
                alert('Erro ao processar a requisição.');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Site carregado com sucesso!");
});

// Selecionando os botões de compra e o modal do carrinho
const botoesComprar = document.querySelectorAll('.btn-comprar');
const modalCarrinho = new bootstrap.Modal(document.getElementById('modalCarrinho'));
const carrinho = []; // Array para armazenar os produtos no carrinho

// Adicionando um "ouvinte" de clique a cada botão de compra
botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
        adicionarAoCarrinho();
        modalCarrinho.show();
    });
});

// Função para adicionar o produto ao carrinho
function adicionarAoCarrinho() {
    const produto = {
        id: '1', // ID do produto (você pode usar qualquer ID)
        nome: 'Carregador Solar Portátil Básico',
        preco: 99.99,
        quantidade: 1
    };

    // Verificando se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
        produtoExistente.quantidade++; // Aumentando a quantidade se já existir
    } else {
        carrinho.push(produto); // Adicionando o produto ao carrinho
    }

    atualizarModalCarrinho();
}

// Função para atualizar o modal do carrinho
function atualizarModalCarrinho() {
    const carrinhoConteudo = document.getElementById('carrinho-conteudo');
    carrinhoConteudo.innerHTML = ''; // Limpa o conteúdo anterior

    if (carrinho.length === 0) {
        carrinhoConteudo.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        const tabela = document.createElement('table');
        tabela.classList.add('table');

        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Total</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);

        const corpo = document.createElement('tbody');
        carrinho.forEach(item => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            `;
            corpo.appendChild(linha);
        });
        tabela.appendChild(corpo);

        carrinhoConteudo.appendChild(tabela);
    }
}
import { loginComGoogle } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.getElementById("googleLoginBtn");
  if (googleBtn) {
    googleBtn.addEventListener("click", loginComGoogle);
  }
});
