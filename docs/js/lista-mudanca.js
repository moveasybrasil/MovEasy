$(() => {

function criarListaMudanca(item) {
    const novoItem = $("#modelo-mudanca").clone().removeAttr(`id`).removeClass('hidden');
    $('.img-perfil', novoItem).html(item.data);
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

    $(document).on('click', '#btn-visualizar', function() {
    //console.log($('.usuario, .descricao', $(this).closest('.card')));
    //console.log($('.usuario, .descricao')); 
    $('.usuario, .descricao', $(this).closest('.card')).removeClass('hidden').hide().slideDown();
    $(this).hide();
    console.log($('#btn-aceite'));
    $('.btn-aceite', $(this.closest('.card'))).show();
});

    $(document).on('click', '.btn-aceite', $this.closest('.card'), function() {
        //lógica quando aceitar uma mudança.
});

});