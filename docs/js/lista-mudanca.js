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
    origem: "Rua Pindamonhangaba, 3132 - Bluemanu, SC",
    destino: "Rua Carlota, 2012 - Bluemanu, SC",
    descricao: "Mudança completa, apartamento no 3º andar",
    valor: "899,87"
})

for (let item of listaMudanca) {
    criarListaMudanca(item);
}

});