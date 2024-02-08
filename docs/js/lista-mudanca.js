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
    usuario: "Eduardo",
    origem: "Rua Pindamonhangaba, 3132 <br/> Bluemanu, SC",
    destino: "Rua Carlota, 2012 <br/> Blumenau, SC",
    descricao: "Mudança completa, apartamento no 3º andar",
    valor: "899,87"
})

listaMudanca.push({
    data: "25/02/2024<br/> 14:27h às 16:12h",
    usuario: "Victor",
    origem: "Rua São Paulo, 276 <br/> Blumenau, SC",
    destino: "Rua Iguaçu, 1987 <br/> Blumenau, SC",
    descricao: "Geladeira e Freezer apenas, casa",
    valor: "152,04"
});

listaMudanca.push({
    data: "29/02/2024<br/> 10:24h às 11:16h",
    usuario: "Luiz",
    origem: "Rua Francisco Sênior, 987 <br/> Blumenau, SC",
    destino: "Rua Jerõnimo, 577  <br/> Gaspar, SC",
    descricao: "Sofá, apartamento 8º andar",
    valor: "454,12"
})

for (let item of listaMudanca) {
    criarListaMudanca(item);
}

});

$(() => {

$('.btn-aceite').click(function() {
    // console.log($('.usuario, .descricao', $(this).closest('.card')));
    // console.log($('.usuario, .descricao')); <- mostra no console qual é o contexto
    $('.usuario, .descricao', $(this).closest('.card')).removeClass('hidden').hide().slideDown();
    $(this).text('Aceitar');
});

});