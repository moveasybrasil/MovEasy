// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-moving").forEach( (e) => {
    e.classList.add("active")
})

$(() => {
 
    $("#button-continuar").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    });
 
    $("#button-voltar").click(() => {
        $("#form-continuar-solicitacao").show();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").hide();
    })

    $("#button-continuar2").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").show();
    });
 
    $("#button-voltar2").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    })

});

//Enviar dados ao banco

$(document).ready(function() {
    $('#formulario-solicitacao').submit(function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        var formData = $(this).serialize(); // Serializa os dados do formulário

        enviarDadosParaBanco(formData);
    });
});

async function enviarDadosParaBanco(formData) {
    try {
        const response = await fetch('url_do_seu_servidor_csharp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }

        alert('Dados enviados com sucesso!'); // Exibe uma mensagem de sucesso
        // Aqui você pode redirecionar o usuário ou fazer outras ações após o envio bem-sucedido
    } catch (error) {
        alert('Ocorreu um erro ao enviar os dados: ' + error); // Exibe uma mensagem de erro
    }
}
$(document).ready(function() {
    // Função para buscar dados do banco de dados quando a página carregar
    async function buscarDadosDoBanco() {
        try {
            const response = await fetch('url_do_seu_servidor_csharp');
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do banco de dados');
            }
            const data = await response.json();
            // Manipule os dados recebidos aqui (por exemplo, exibindo-os em uma tabela HTML)
            console.log('Dados do banco de dados:', data);
        } catch (error) {
            console.error('Erro ao buscar dados do banco de dados:', error);
        }
    }

    // Chame a função para buscar os dados do banco de dados quando a página carregar
    buscarDadosDoBanco();
});