// Adiciona a classe 'active' ao header para o item específico
document.querySelector(".header-moving").classList.add("active");

$(function () {

    $("#button-continuar").click(() => {
        const values = {
            data: $("#Data")[0].value,
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.data) {
            $('input[id="Data"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#Data").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#Data").removeClass("invalid");
            $('input[id="Data"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            $("#form-continuar-solicitacao").hide();
            $("#form-continuar2-solicitacao").show();
            $("#form-finalizar-solicitacao").hide();
        }
    });

    $("#button-continuar2").click(() => {
        const values = {
            cepOrig: $("#CepOrigem")[0].value,
            endOrig: $("#EnderecoOrig")[0].value,
            disOrig: $("#DistritoOrig")[0].value,
            cidOrig: $("#CidadeOrig")[0].value,
            sigOrig: $("#SiglaOrig")[0].value,
            numOrig: $("#NumeroOrig")[0].value,
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.numOrig) {
            $('input[id="NumeroOrig"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#NumeroOrig").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#NumeroOrig").removeClass("invalid");
            $('input[id="NumeroOrig"]').css("border", "1px solid #bbb");
        }

        if (!values.sigOrig) {
            $('input[id="SiglaOrig"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#SiglaOrig").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#SiglaOrig").removeClass("invalid");
            $('input[id="SiglaOrig"]').css("border", "1px solid #bbb");
        }

        if (!values.cidOrig) {
            $('input[id="CidadeOrig"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#DCidadeOrigata").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#CidadeOrig").removeClass("invalid");
            $('input[id="CidadeOrig"]').css("border", "1px solid #bbb");
        }

        if (!values.disOrig) {
            $('input[id="DistritoOrig"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#DistritoOrig").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#DistritoOrig").removeClass("invalid");
            $('input[id="DistritoOrig"]').css("border", "1px solid #bbb");
        }

        if (!values.endOrig) {
            $('input[id="EnderecoOrig"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#EnderecoOrig").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#EnderecoOrig").removeClass("invalid");
            $('input[id="EnderecoOrig"]').css("border", "1px solid #bbb");
        }

        if (!values.cepOrig) {
            $('input[id="CepOrigem"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#CepOrigem").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#CepOrigem").removeClass("invalid");
            $('input[id="CepOrigem"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            $("#form-continuar-solicitacao").hide();
            $("#form-continuar2-solicitacao").hide();
            $("#form-finalizar-solicitacao").show();
        }
    });

    $("#Enviar").click(() => {
        const values = {
            cepDest: $("#CepDestino")[0].value,
            endDest: $("#EnderecoDest")[0].value,
            disDest: $("#DistritoDest")[0].value,
            cidDest: $("#CidadeDest")[0].value,
            sigDest: $("#SiglaDest")[0].value,
            numDest: $("#NumeroDest")[0].value,
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.numDest) {
            $('input[id="NumeroDest"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#NumeroDest").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#NumeroDest").removeClass("invalid");
            $('input[id="NumeroDest"]').css("border", "1px solid #bbb");
        }

        if (!values.sigDest) {
            $('input[id="SiglaDest"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#SiglaDest").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#SiglaDest").removeClass("invalid");
            $('input[id="SiglaDest"]').css("border", "1px solid #bbb");
        }

        if (!values.cidDest) {
            $('input[id="CidadeDest"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#CidadeDest").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#CidadeDest").removeClass("invalid");
            $('input[id="CidadeDest"]').css("border", "1px solid #bbb");
        }

        if (!values.disDest) {
            $('input[id="DistritoDest"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#DistritoDest").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#DistritoDest").removeClass("invalid");
            $('input[id="DistritoDest"]').css("border", "1px solid #bbb");
        }

        if (!values.endDest) {
            $('input[id="EnderecoDest"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#EnderecoDest").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#EnderecoDest").removeClass("invalid");
            $('input[id="EnderecoDest"]').css("border", "1px solid #bbb");
        }

        if (!values.cepDest) {
            $('input[id="CepDestino"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#CepDestino").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else {
            $("#CepDestino").removeClass("invalid");
            $('input[id="CepDestino"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            enviarFormulario()
        }
    });


    $("#button-voltar").click(() => {
        $("#form-continuar-solicitacao").show();
        $("#form-continuar2-solicitacao").hide();
        $("#form-finalizar-solicitacao").hide();
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
        const response = await fetch(`${serverURL}/services/open`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
            method: 'POST',
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

var selectedValues = [];

let valorTotal = 0;

function toggleTag(tagName) {
    var tagElement = document.querySelector('.tag-' + tagName);
    if (!tagElement) return; // Verifica se a tag existe

    // Obtém o texto da tag
    var tagText = tagElement.textContent.trim();
    const valor = 150;
    // Alterna a classe 'selected' na tag
    tagElement.classList.toggle('selected');

    // Se a tag estiver selecionada, adicione seu texto à lista de valores selecionados
    if (tagElement.classList.contains('selected')) {
        selectedValues.push(tagText);
        valorTotal += valor;

    } else {
        // Se a tag estiver sendo desselecionada, remova seu texto da lista de valores selecionados
        var index = selectedValues.indexOf(tagText);
        if (index !== -1) {
            selectedValues.splice(index, 1);
            valorTotal -= valor;
        }

    }
    localStorage.setItem('valorTotal', valorTotal);
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
    salvarDadosLocalmente();
    redirecionarParaPaginaOrcamento(

    )
};


function salvarDadosLocalmente() {
    const campos = {
        'CepOrigem': 'CEP de origem',
        'EnderecoOrig': 'Endereço de origem',
        'DistritoOrig': 'Bairro de origem',
        'CidadeOrig': 'Cidade de origem',
        'SiglaOrig': 'Sigla de origem',
        'NumeroOrig': 'Número de origem',
        'ComplementoOrig': 'Complemento de origem',
        'CepDestino': 'CEP do destino',
        'EnderecoDest': 'Endereço do destino',
        'DistritoDest': 'Bairro do destino',
        'CidadeDest': 'Cidade do destino',
        'SiglaDest': 'Sigla do destino',
        'NumeroDest': 'Número do destino',
        'ComplementoDest': 'Complemento do destino',
        'Data': 'Data da mudança'
    };

    let dadosOrigem = {}, dadosDestino = {};

    Object.keys(campos).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const valor = element.value;
            const chave = campos[id]; // Move this line here
            if (id.includes('Orig')) {
                dadosOrigem[chave] = valor;
            } else {
                dadosDestino[chave] = valor;
            }
        } else {
            console.error(`Element with ID '${id}' not found.`);
        }
    });

    localStorage.setItem('dadosOrigem', JSON.stringify(dadosOrigem));
    localStorage.setItem('dadosDestino', JSON.stringify(dadosDestino));

    console.log(dadosOrigem);
    console.log(dadosDestino);
}

function redirecionarParaPaginaOrcamento() {
    window.location.href = 'orcamento.html';
}
