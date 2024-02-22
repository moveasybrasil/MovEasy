
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


// Recupera os valores armazenados na localStorage
var termos = localStorage.getItem('termos');
var observacao = localStorage.getItem('observacao');
var descricaoOrigem = localStorage.getItem('descricaoOrigem');
var descricaoDestino = localStorage.getItem('descricaoDestino');
var data = localStorage.getItem('data');

// Use os valores conforme necessário
console.log("Termos:", termos);
console.log("Observação:", observacao);
console.log("Descrição de origem:", descricaoOrigem);
console.log("Descrição de destino:", descricaoDestino);
console.log("Data:", data);