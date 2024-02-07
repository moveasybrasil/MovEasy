function createItemList(item) {
    const newItem = $('#info-mudanca').clone().removeAttr('id').removeClass('hidden');
    $('data', newItem).html(item.data);
    $('usuario', newItem).html(item.usuario);
    $('origem', newItem).html(item.origem);
    $('destino', newItem).html(item.destino);
    $('descricao', newItem).html(item.descricao);
    $('valor', newItem).html(item.valor);

    $('#dados-lista').append($(item));
}

const listaMudanca = []

listaMudanca.push({
    data: "24/02/2024 - 08:15h às 10:12h",
    usuario: "Eduardo",
    origem: "Origem: Rua Pindamonhangaba, 3132 - Bluemanu, SC",
    destino: "Rua Carlota, 2012 - Bluemanu, SC",
    descricao: "Mudança completa, apartamento no 3º andar",
    valor: "R$ 899,87"
})

for (let item of listaMudanca) {
    createItemList(item);
}