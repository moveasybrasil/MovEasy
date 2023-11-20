function createFAQ(faq) {
    const novoFAQ = $("#modelo").clone().removeAttr(`id`).removeClass('hidden');
    $('.pergunta', novoFAQ).html(faq.pergunta);
    $('.resposta', novoFAQ).html(faq.resposta);
    $("#faq").append($(novoFAQ));
}

const lista = []

lista.push({
    pergunta: "Pergunta",
    resposta: "Resposta"
})


for(let faq of lista) {
    createFAQ(faq);
}
