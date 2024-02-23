// Adiciona a classe 'active' ao header para o item específico
document.querySelector(".header-moving").classList.add("active");

$(function () {
    $("#button-continuar").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    });

    $("#button-voltar").click(() => {
        $("#form-continuar-solicitacao").show();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").hide();
    });

    $("#button-continuar2").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").show();
    });

    $("#button-voltar2").click(() => {
        $("#form-continuar-solicitacao").hide();
        $("#form-continuar2-solicitacao").show();
        $("#form-finalizar-solicitacao").hide();
    });
});

//Enviar dados ao banco
$(function () {
    $('#formulario-solicitacao').submit(function (event) {
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

$(function () {
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

// Inicialize um array para armazenar os valores das tags selecionadas
var selectedValues = [];

// Inicialize um array para armazenar os textos das tags selecionadas
var selectedValues = [];

function toggleTag(tagName) {
    var tagElement = document.querySelector('.tag-' + tagName);
    if (!tagElement) return; // Verifica se a tag existe

    // Obtém o texto da tag
    var tagText = tagElement.textContent.trim();

    // Alterna a classe 'selected' na tag
    tagElement.classList.toggle('selected');

    // Se a tag estiver selecionada, adicione seu texto à lista de valores selecionados
    if (tagElement.classList.contains('selected')) {
        selectedValues.push(tagText);
    } else {
        // Se a tag estiver sendo desselecionada, remova seu texto da lista de valores selecionados
        var index = selectedValues.indexOf(tagText);
        if (index !== -1) {
            selectedValues.splice(index, 1);
        }
    }

    // Exibe os valores selecionados no console (você pode fazer o que quiser com esses valores)
    console.log('Valores selecionados:', selectedValues);
}


/* FETCH PARA PEGAR O CEP */

function ConsultarCepOrigem() {
    let cep = document.getElementById("CepOrigem").value.trim();
    if (!cep || cep.length !== 8 || !/^\d+$/.test(cep)) {
        alert("Campo CEP inválido!");
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then(response => response.json())
        .then(answer => {
            document.getElementById("EnderecoOrig").value = answer.logradouro || '';
            document.getElementById("DistritoOrig").value = answer.bairro || '';
            document.getElementById("CidadeOrig").value = answer.localidade || '';
            document.getElementById("SiglaOrig").value = answer.uf || '';
        })
        .catch(error => console.log(error));
}

function ConsultarCepDestino() {
    let cep = document.getElementById("CepDestino").value.trim();
    if (!cep || cep.length !== 8 || !/^\d+$/.test(cep)) {
        alert("Campo CEP inválido!");
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then(response => response.json())
        .then(answer => {
            document.getElementById("EnderecoDest").value = answer.logradouro || '';
            document.getElementById("DistritoDest").value = answer.bairro || '';
            document.getElementById("CidadeDest").value = answer.localidade || '';
            document.getElementById("SiglaDest").value = answer.uf || '';
        })
        .catch(error => console.log(error));
}

/* GUARDA AS INFORMAÇÕES EM LOCAL STORAGE */
function enviarFormulario() {
    // if (verificarInputs()) {
        salvarDadosLocalmente();
        redirecionarParaPaginaOrcamento()};
    // } else {
//         alert('Por favor, preencha todos os campos corretamente.');
//     }
// }

// function verificarInputs() {
//     const campos = ['CepOrigem', 'EnderecoOrig', 'DistritoOrig', 'CidadeOrig', 'SiglaOrig', 'NumeroOrig', 'CepDest', 'EnderecoDest', 'DistritoDest', 'CidadeDest', 'SiglaDest', 'NumeroDest'];
//     let todosPreenchidos = true;

//     campos.forEach(campo => {
//         const valor = document.getElementById(campo).value;
//         const elemento = document.getElementById(campo);
//         if (!valor) {
//             elemento.classList.add('campo-vazio');
//             todosPreenchidos = false;
//         } else {
//             elemento.classList.remove('campo-vazio');
//         }
//     });

//     if (!todosPreenchidos) {
//         alert('Por favor, preencha todos os campos obrigatórios antes de enviar o formulário.');
//     }   

//     return todosPreenchidos;
// }

function salvarDadosLocalmente() {
    const campos = {
        'CepOrigem': 'cepOrigem',
        'EnderecoOrig': 'enderecoOrig',
        'DistritoOrig': 'distritoOrig',
        'CidadeOrig': 'cidadeOrig',
        'SiglaOrig': 'siglaOrig',
        'NumeroOrig': 'numeroOrig',
        'ComplementoOrig': 'complementoOrig',
        'CepDest': 'cepDest',
        'EnderecoDest': 'enderecoDest',
        'DistritoDest': 'distritoDest',
        'CidadeDest': 'cidadeDest',
        'SiglaDest': 'siglaDest',
        'NumeroDest': 'numeroDest',
        'ComplementoDest': 'complementoDest'
    };

    let dadosOrigem = {}, dadosDestino = {};

    Object.keys(campos).forEach(id => {
        const valor = document.getElementById(id).value;
        if (!id.value) {
            id.value == 'zero';
        }
        const chave = campos[id];

        if (id.includes('Orig')) {
            dadosOrigem[chave] = valor;
        } else {
            dadosDestino[chave] = valor;
        }
    });

    localStorage.setItem('dadosOrigem', JSON.stringify(dadosOrigem));
    localStorage.setItem('dadosDestino', JSON.stringify(dadosDestino));
}

function redirecionarParaPaginaOrcamento() {
    window.location.href = 'pagina/orcamento.html';
}
