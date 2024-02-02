// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
    e.classList.add("active")
})

function check1() {
    document.getElementById("radio-two").checked = false
    document.getElementById("radio-one").checked = true

    document.getElementById("s1").classList.add("ativo")
    document.getElementById("s2").classList.remove("ativo")
}

function check2() {
    document.getElementById("radio-two").checked = true
    document.getElementById("radio-one").checked = false

    document.getElementById("s1").classList.remove("ativo")
    document.getElementById("s2").classList.add("ativo")
}

$(() => {

    $("#button-continuar1").click(() => {
        const checked = {
            radio_one: $("#radio-one")[0].checked,
            radio_two: $("#radio-two")[0].checked,
        }

        console.log(checked)

        let camposInvalidos = false
        let msg = "Selecione um tipo de usúario!"

        if (!checked.radio_one && !checked.radio_two) {
            camposInvalidos = true
            msg = "Selecione um tipo de usúario!"
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            $("#box1").hide();
            $("#box2").show();
        }

    });


    $("#button-continuar2").click(() => {
        const values = {
            email: $("#email")[0].value,
            senha: $("#password")[0].value,
            confirmar_senha: $("#confirmed-password")[0].value
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (values.senha.length < 8) {
            $('input[id="password"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#senha").addClass("invalid");
            $('input[id="confirmed-password"]').css("border", "2px solid red");
            $("#confirmed-senha").addClass("invalid");
            msg = "A senha deve ter mais de 8 caracteres!"
        } else if (!(values.senha == values.confirmar_senha)) {
            $('input[id="password"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#senha").addClass("invalid");
            $('input[id="confirmed-password"]').css("border", "2px solid red");
            $("#confirmed-senha").addClass("invalid");
            msg = "As senhas não são iguais!"
        } else {
            $("#senha").removeClass("invalid");
            $('input[id="password"]').css("border", "1px solid #bbb");
            $('input[id="confirmed-password"]').css("border", "1px solid #bbb");
        }

        if (!values.email) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Os campos em vermelho estão inválidos!"
        } else if (!~values.email.indexOf("@")) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Há informações faltando no e-mail informado!"
        } else if (!~values.email.split("@")[1].indexOf(".")) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Há informações faltando no e-mail informado!"
        } else if (!values.email.split("@")[1].split(".")[1]) {
            $('input[id="email"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#email").addClass("invalid");
            msg = "Há informações faltando no e-mail informado!"
        } else {
            $("#email").removeClass("invalid");
            $('input[id="email"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            $("#box2").hide();
            $("#box3").show();
        }
    });

    $("#button-cadastrar1").click(() => {
        const values = {
            nome: $("#nome")[0].value,
            cpf_or_cnpj: $("#cpf-cnpj")[0].value,
            telefone: $("#telefone")[0].value,
            term: $("#termos-de-uso")[0].checked
        }

        console.log(values)

        let camposInvalidos = false
        let msg = "Os campos em vermelho estão incorretos!"

        if (!values.term) {
            camposInvalidos = true
            msg = "Você deve aceitar os termos de uso."
        }

        if (!values.telefone) {
            $('input[id="telefone"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#telefone").addClass("invalid");
            msg = "O seu número de telefone não pode ter mais ou menos de 11 números! Coloque o seu DDD e o número, exemplo: 47987654321."
        } else if (!values.telefone.length == 11) {
            $('input[id="telefone"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#telefone").addClass("invalid");
        } else {
            $("#senha").removeClass("invalid");
            $('input[id="cpf-cnpj"]').css("border", "1px solid #bbb");
        }

        if (!values.cpf_or_cnpj) {
            $('input[id="cpf-cnpj"]').css("border", "2px solid red");
            camposInvalidos = true;
            $("#cpf-cnpj").addClass("invalid");
            msg = "Os campos em vermelho estão incorretos!";
        } else if (values.cpf_or_cnpj.length < 11) {
            $('input[id="cpf-cnpj"]').css("border", "2px solid red");
            camposInvalidos = true;
            $("#cpf-cnpj").addClass("invalid");
            msg = "O seu CPF ou CNPJ deve ter mais de 11 números!";
        } else if (values.cpf_or_cnpj.length > 14 || values.cpf_or_cnpj.length === 12 || values.cpf_or_cnpj.length === 13) {
            $('input[id="cpf-cnpj"]').css("border", "2px solid red");
            camposInvalidos = true;
            $("#cpf-cnpj").addClass("invalid");
            msg = "O seu CNPJ deve ter 14 números!";
        } else {
            $("#senha").removeClass("invalid");
            $('input[id="cpf-cnpj"]').css("border", "1px solid #bbb");
        }

        if (!values.nome) {
            $('input[id="nome"]').css("border", "2px solid red");
            camposInvalidos = true
            $("#nome").addClass("invalid");
            msg = "Os campos em vermelho estão incorretos!"
        } else {
            $("#nome").removeClass("invalid");
            $('input[id="nome"]').css("border", "1px solid #bbb");
        }

        if (camposInvalidos) {
            alert(msg);
        } else {
            SignUp();
            $("#box3").hide();
            $("#box4").show();
        }
    });

    $("#button-login").click(() => {
        goTo("user/login");
    })

    $("#button-voltar1").click(() => {
        $("#box1").show();
        $("#box2").hide();
    })
    $("#button-voltar2").click(() => {
        $("#box2").show();
        $("#box3").hide();
    })
    $("#button-voltar3").click(() => {
        $("#box3").show();
        $("#box4").hide();
    })

    $(document).ready(function () {
        $('[name=telefone]').mask('(00) 0000-0000#');
    });

    $('#cpf-cnpj').mask('000.000.000-00', {
        onKeyPress: function (cpfcnpj, e, field, options) {
            cpfcnpj = cpfcnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
            const masks = ['000.000.000-000', '00.000.000/0000-00'];
            const mask = (cpfcnpj.length > 11) ? masks[1] : masks[0];
            $('#cpf-cnpj').mask(mask, options);
        }
    });
})


// Visualizar Senha

var passwordInput = document.getElementById('password');
var eyePasswordSpy1 = document.getElementById('eye-password-spy1');


eyePasswordSpy1.addEventListener('mousedown', function () {
    passwordInput.type = 'text';
});

eyePasswordSpy1.addEventListener('mouseup', function () {
    passwordInput.type = 'password';
});

eyePasswordSpy1.addEventListener('mouseout', function () {
    passwordInput.type = 'password';
});

eyePasswordSpy1.addEventListener('dragstart', function (event) {
    event.preventDefault();
});


var confirmedPasswordInput = document.getElementById('confirmed-password');
var eyePasswordSpy2 = document.getElementById('eye-password-spy2');

eyePasswordSpy2.addEventListener('mousedown', function () {
    confirmedPasswordInput.type = 'text';
});

eyePasswordSpy2.addEventListener('mouseup', function () {
    confirmedPasswordInput.type = 'password';
});

eyePasswordSpy2.addEventListener('mouseout', function () {
    confirmedPasswordInput.type = 'password';
});

eyePasswordSpy2.addEventListener('dragstart', function (event) {
    event.preventDefault();
});


// slideToggle(slow) para header mobile


function SignUp() {

    let user = {
        document: document.getElementById("cpf-cnpj").value,
        telephone: document.getElementById("telefone").value,
        name: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        type: document.getElementById("radio-two").checked ? 1 : 0
    }

    request("POST", `${serverURL}/user`, (xhr) => {
        if (xhr.status == 200) {
            document.getElementById("response-message").innerHTML = xhr.responseText
        } else {
            document.getElementById("response-message").innerHTML = xhr.responseText
        }
    }, user
    )


}