// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-faq").forEach( (e) => {
    e.classList.add("active")
})

function createFAQ(faq) {
    const novoFAQ = $("#modelo").clone().removeAttr(`id`).removeClass('hidden');
    $('.pergunta', novoFAQ).html(faq.pergunta);
    $('.resposta', novoFAQ).html(faq.resposta);
    $("#faq").append($(novoFAQ));
}

const lista = []

lista.push({
    pergunta: "Quais serviços de mudança de móveis são oferecidos?",
    resposta: "É oferecido serviços de carregamento, transporte, e descarregamento de móveis."
})
lista.push({
    pergunta: "Quanto tempo leva para agendar uma mudança?",
    resposta: "O tempo de agendamento pode variar de acordo com a data e o local, mas geralmente demora uma semana."
})
lista.push({
    pergunta: "Quais são os métodos de pagamento aceitos?",
    resposta: "Aceitamos cartão de crédito, PIX, e boleto."
})
lista.push({
    pergunta: "É oferecido serviço de desmontagem e montagem de móveis?",
    resposta: "Isto deve ser tratado com o motorista."
})
lista.push({
    pergunta: "Como posso obter um orçamento para a minha mudança?",
    resposta: "Você pode acessar a página \"Agendar\" para receber uma estimativa. Tenha em mente que os preços podem sofrer alterações até a finalização do pedido."
})
lista.push({
    pergunta: "Posso agendar uma mudança em um fim de semana ou feriado?",
    resposta: "Sim, você pode agendar uma mudança para qualquer data, mas não podemos garantir que haverá alguem para lhe atender."
})
lista.push({
    pergunta: "O que devo fazer ser precisar reagendar minha mudança?",
    resposta: "Se o reagendamento for antes do tempo limite, você pode cancelar o pedido e realizar um novo agendamento. Se estiver dentro do tempo limite, uma multa será aplicada ao pedido."
})

for(let faq of lista) {
    createFAQ(faq);
}
