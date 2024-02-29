// Adiciona a classe 'active' ao header para o item específico
document.querySelector(".header-moving").classList.add("active");

$(() => {

    function criarListaMudanca(item) {
        const novoItem = $("#modelo-mudanca").clone().removeAttr(`id`).removeClass('hidden');
        $('.data', novoItem).html(item.data);
        $('.usuario', novoItem).html(item.usuario);
        $('.origem', novoItem).html(item.origem);
        $('.destino', novoItem).html(item.destino);
        $('.descricao', novoItem).html(item.descricao);
        $('.valor', novoItem).html(item.valor);

        $('#dados-lista').append($(novoItem));
    }

    const listaMudanca = []

    listaMudanca.push({
        data: "24/02/2024<br/> 08:15h às 10:12h",
        usuario: "Eduardo ★ 4.99",
        origem: "Rua Pindamonhangaba, 3132 - Blumenau, SC",
        destino: "Rua Carlota, 2012 - Blumenau, SC",
        descricao: "Mudança completa, apartamento no 3º andar",
        valor: "899,87"
    })

    listaMudanca.push({
        data: "25/02/2024<br/> 14:27h às 16:12h",
        usuario: "Victor ★ 5.00",
        origem: "Rua São Paulo, 276 - Blumenau, SC",
        destino: "Rua Iguaçu, 1987 - Blumenau, SC",
        descricao: "Geladeira e Freezer apenas, casa",
        valor: "152,04"
    });

    listaMudanca.push({
        data: "29/02/2024<br/> 10:24h às 11:16h",
        usuario: "Luiz ★ 4.98",
        origem: "Rua Francisco Sênior, 987 - Blumenau, SC",
        destino: "Rua Jerõnimo, 577 - Gaspar, SC",
        descricao: "Sofá, apartamento 8º andar",
        valor: "454,12"
    })

    for (let item of listaMudanca) {
        criarListaMudanca(item);
    }

});

$(() => {
    $(document).on('click', '#btn-visualizar', function () {
        $('.usuario, .descricao', $(this).closest('.card')).removeClass('hidden').hide().slideDown();
        $(this).hide();
        console.log($('#btn-aceite'));
        $('.btn-aceite', $(this.closest('.card'))).show();
    });

    $(document).on('click', '#btn-aceitar', function () {
        goTo('user/perfil');
    });

});

//adiciona cor ao submenu de escolha

$(document).on('click', '#mudanca-aguardando', function () {
    $(this).addClass('active-perfil')
    $('#mudanca-aberta').removeClass('active-perfil')
    $('#lista-mudanca').hide();
    $('.pendente').addClass('flex')
    $('.pendente').show();

});

$(document).on('click', '#mudanca-aberta', function () {
    $(this).addClass('active-perfil')
    $('#mudanca-aguardando').removeClass('active-perfil')
    $('#lista-mudanca').show();
    $('.pendente').removeClass('flex').hide();

});



// Lógica lista mudanças pendentes


$(() => {

    function criarListaPendente(item) {
        const novoItem = $("#modelo-pendente").clone().removeAttr(`id`).hide();
        $('.data', novoItem).html(item.data);
        $('.usuario', novoItem).html(item.usuario);
        $('.origem', novoItem).html(item.origem);
        $('.destino', novoItem).html(item.destino);
        $('.descricao', novoItem).html(item.descricao);
        $('.valor', novoItem).html(item.valor);

        $('#lista-mudanca-pendente').append($(novoItem));
    }
    const listaPendente = []

    listaPendente.push({
        data: "29/02/2024<br/> 19:15h às 23:12h",
        usuario: "Ricardo ★ 1.99",
        origem: "Rua da Mangueira, 132 - Indaial, SC",
        destino: "Rua da Figueira, 2012 - Londrina, PR",
        descricao: "apartamento no 3º andar",
        valor: "1899,87"
    });

    for (let item of listaPendente) {
        criarListaPendente(item);
    }

});

$(() => {

    $(document).on('click', '#btn-visualizar-pendente', function () {
        $('.usuario, .descricao', $(this).closest('.pendente')).removeClass('hidden').hide().slideDown();
        $(this).hide();
        $('#btn-visualizar-pendente', $(this.closest('.pendente'))).show();
    });
});


// $(document).ready(function() {
//     // Função para buscar os dados do servidor quando a página carregar
//     buscarDadosDoServidor();
// });

// async function buscarDadosDoServidor() {
//     try {
//         const response = await fetch('url_do_seu_servidor_csharp');
//         if (!response.ok) {
//             throw new Error('Erro ao buscar os dados do servidor');
//         }
//         const data = await response.json();

//         // Preencher os campos do formulário com os dados recebidos
//         data.forEach(element => {
//             var novoModelo = $('#modelo-mudanca').clone().removeAttr('id').removeClass('hidden');
//             $('.valor', novoModelo).text(element.valor);
//             $('.data', novoModelo).text(element.data);
//             $('.usuario', novoModelo).text(element.usuario);
//             $('.origem', novoModelo).text(element.origem);
//             $('.destino', novoModelo).text(element.destino);
//             $('.descricao', novoModelo).text(element.descricao);

//             // Adicionar o novo modelo preenchido ao formulário
//             $('#dados-lista').append(novoModelo);
//         });

//     } catch (error) {
//         console.error('Erro ao buscar os dados do servidor:', error);
//     }
// }
