
    function submitForm() {
        var name = document.querySelector('[data-placeholder="Digite seu nome"]').innerText;
        var email = document.querySelector('[data-placeholder="Digite seu email"]').innerText;
        var message = document.querySelector('[data-placeholder="Digite sua mensagem"]').innerText;
        
        // Aqui você pode fazer o que desejar com os dados, como enviar para um servidor, por exemplo.
        console.log("Nome: " + name);
        console.log("Email: " + email);
        console.log("Mensagem: " + message);
        
        // Limpa os campos após o envio
        document.querySelectorAll('.editable').forEach(function(element) {
            element.innerText = '';
        });
        
        alert("Orçamento enviado!");
    }

var valorTotal;

function exibirDadosNaPaginaOrcamento() {
    const dadosOrigem = JSON.parse(localStorage.getItem('dadosOrigem'));
    const dadosDestino = JSON.parse(localStorage.getItem('dadosDestino'));
    console.log(dadosOrigem)
    console.log(dadosDestino)
    if (dadosOrigem && dadosDestino) {
        // Exibe os dados de origem
        const origemDiv = document.getElementById('origem');
        for (const chave in dadosOrigem) {
            origem.innerHTML += `<p>${chave}: ${dadosOrigem[chave]}</p>`;
        }

        // Exibe os dados de destino
        const destinoDiv = document.getElementById('final');

        for (const chave in dadosDestino) {
            destinoDiv.innerHTML += `<p>${chave}: ${dadosDestino[chave]}</p>`;
        }

        const valorDiv = document.getElementById('orcamentoTotal');
        valorDiv.innerHTML = `<h2>R$ ${valorTotal},00</h2>`;
        
    } else {
        console.error('Dados de origem e/ou destino não encontrados no localStorage.');
    }
}

$(() => {
    valorTotal = localStorage.getItem('valorTotal');
    exibirDadosNaPaginaOrcamento()
});