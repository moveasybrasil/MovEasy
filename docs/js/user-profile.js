$("#trocar-perfil").click(() => {
    if ($("#sections-perfil-veiculos").is(":visible")) {
        $("#sections-perfil-veiculos").hide();
    } else {
        $("#sections-perfil-veiculos").show();
    }
});




// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
    e.classList.add("active")
})

if (!sessionStorage.getItem(`token`) && window.location.origin != "file://") { goTo(`user/login`) }

async function sendPhoto() {

    const files = document.querySelector('[name=file]').files
    let formData = new FormData()
    formData.append('image', files[0])

    await request("PUT", `${serverURL}/user/photo`,
        (xhr) => {
            console.log(xhr.responseText)
        },
        null,
        formData,
        true
    )

    await setProfilePhoto()
}

// Simula um clique no elemento de input de arquivo
function choosePhoto() {
    document.getElementById('file-input').click();
}

function fileChanged() {


    var fileInput = document.getElementById('photo-input');
    var selectedFile = fileInput.files[0];

    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Exemplo de como exibir a imagem carregada
            var imagePreview = document.getElementById('photo-input-label').getElementsByTagName('img')[0];
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);

        // Volta a foto para o default
        document.getElementById("photo-change").setAttribute('src', getUrl('assets/images/default.jpg'))

        // Limpa a seleção de foto
        var $el = $('#photo-input');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();




    }
}

document.getElementById('photo-input-span').addEventListener('click', function () {
    document.getElementById('photo-input').click();
});
function FileChange() {
    input = document.getElementById('photo-input');
    if (input.files && input.files[0]) {
        var formData = new FormData();
        formData.append('image', input.files[0]);

        fetch(`${serverURL}/user/photo`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            method: 'PUT',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);
                // Atualize a imagem do perfil aqui se o upload for bem-sucedido
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('photo').setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}



async function ChangeProfilePhoto() {
    let url;
    try {
        await request("PUT", `${serverURL}/user/photo`, (xhr) => {
            url = `${r2URL}/${xhr.responseText}?${Date.now().toString()}`;
            console.log(url);
            document.getElementById('photo').setAttribute('src', url);
        }, null, null, true)
    } catch {
        url = `${r2URL}/user/default.jpg`
        document.getElementById("photo").setAttribute("src", url)
    }
};


async function loadProfilePhoto() {

    let url;
    try {
        await request("GET", `${serverURL}/user/photo`, (xhr) => {
            url = `${r2URL}/${xhr.responseText}?${Date.now().toString()}`;
            console.log(url)
            document.getElementById("photo").setAttribute('src', url)
        }, null, null, true)
    } catch {
        url = `${r2URL}/user/default.jpg`
        document.getElementById("photo").setAttribute('src', url)
    }
}

function updateInfo() {
    const data = {
        document: "string",
        telephone1: "string",
        telephone2: "string",
        email: "string",
        name: "string",
        cnh: "string"
    }

    request("PUT", `${serverURL}/user`, (xhr) => {
        console.log(xhr.responseText)
        if (xhr.status == 200) {
            if (sessionStorage.getItem(`token`) == localStorage.getItem(`token`)) {
                localStorage.setItem(`user`, xhr.responseText)
            }

            sessionStorage.setItem(`user`, xhr.responseText)
        }
    }, data, null, true)
}

function mostrarDiv(idDiv, index) {
    var divs = document.querySelectorAll(".mostrar-div");
    divs.forEach(function (div) {
        div.style.display = "none";
    });

    var div = document.getElementById(idDiv);
    if (div) {
        div.style.display = "block";
    }

    var spans = document.querySelectorAll('.sections-perfil span', '.sections-perfil-mobile span');
    spans.forEach(function (span) {
        span.classList.remove('active-perfil');
    });

    if (index >= 0 && index < spans.length) {
        spans[index].classList.add('active-perfil');
    }

    var imgs = document.querySelectorAll('.mostrar-img');
    imgs.forEach(function (img) {
        img.classList.remove('active-img');
    });

    if (index >= 0 && index < divs.length) {
        var img = divs[index].querySelector('.mostrar-img');
        if (img) {
            img.classList.add('active-img');
        }
    }
}

// Informações do Perfil
async function loadProfileInfo() {
    userId = JSON.parse(sessionStorage.getItem("user")).id ?? "XXXXXXXX"
    userName = JSON.parse(sessionStorage.getItem("user")).name ?? "Não Informado"
    userEmail = JSON.parse(sessionStorage.getItem("user")).email ?? "Não Informado"
    userTel1 = JSON.parse(sessionStorage.getItem("user")).telephone1 ?? "Não Informado"
    userTel2 = JSON.parse(sessionStorage.getItem("user")).telephone2 ?? "Não Informado"
    const isVeiculosHidden = $("#sections-perfil-veiculos").is(":hidden");

    const userAbout = isVeiculosHidden ?
        "Sou um cliente da MovEasy e estou aqui para solicitar mudanças!" :
    "Sou um motorista certificado pela MovEasy, comprometido em fornecer um serviço de mudança confiável e eficiente. Estou aqui para garantir uma experiência tranquila e sem complicações durante a sua mudança!";


    const userType = isVeiculosHidden ? "Cliente" : "Prestador de Serviço";

    document.getElementById("nome-usuario-perfil").innerHTML = userName
    document.getElementById("email-perfil").innerHTML = userEmail
    document.getElementById("id-perfil").innerHTML = userId
    document.getElementById("telefone1-perfil").innerHTML = userTel1
    //document.getElementById("telefone2-perfil").innerHTML = userTel2
    document.getElementById("sobre-perfil").innerHTML = userAbout
    document.getElementById("tipo-perfil").innerHTML = userType;
}

// Foto de Perfil

// async function loadHistorico() {
//     function getAddressFromAddressDto(address) {
//         return `${address.street} ${address.number}, ${address.district}, ${address.city}-${address.fu}`;
//     }

//     try {
//         await request("GET", `${serverURL}/service/closed`, (xhr) => {
//             if (xhr.status === 200) {
//                 const data = JSON.parse(xhr.responseText);
//                 data.forEach(element => {
//                     const novoHistorico = $("#modelo-historico").clone().removeAttr("id").removeClass("hidden");
//                     $(".data", novoHistorico).html(new Date(element.date).toLocaleString("pt-BR"));
//                     $(".origem", novoHistorico).html(getAddressFromAddressDto(element.address));
//                     $(".destino", novoHistorico).html(getAddressFromAddressDto(element.address1));
//                     $(".valor", novoHistorico).html(`R$ ${element.price}`);
//                     $("#dados-historico").append(novoHistorico);

//                     $("#not-add-historic").hide()
//                 })
//             } else {
//                 $("#not-add-historic").show();
//             }
//         }, null, null, true)
//     } catch (error) {
//         console.error("Erro ao carregar o histórico:", error);
//         $("#not-add-historic").show();
//     }
// }

//Objeto Veículo
async function loadVehicle() {
    request("GET", `${serverURL}/vehicle/id`, (xhr) => {
        if (xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(element => {

                const novoVeiculo = $("#modelo-veiculo").clone().removeAttr(`id`).removeClass('hidden');
                $('.modelo', novoVeiculo).html(element.name);
                $('.ano', novoVeiculo).html(element.year);
                $('.cor', novoVeiculo).html(element.colour);
                $('.placa', novoVeiculo).html(element.licensePlate);
                $('.images', novoVeiculo).html("Sem imagens cadastradas");

                $("#dados-veiculos").append($(novoVeiculo));

                $("#not-add-vehicle").hide()

            });
        } else {
            $("#not-add-vehicle").show()
        }
    }, null, null, true)
}

async function LoadProfile() {
    await loadProfileInfo()
    await loadProfilePhoto()
    // await loadHistorico()
    await loadVehicle()
    mostrarDiv('container-dados-informacoes', 0)
}

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    goTo(`user/login`)
}

LoadProfile()

function modalVeiculo() {
    var content = document.getElementById('content');
    var modalVeiculo = document.getElementById('modal-veiculo-principal');
    var btnModal = document.getElementById('selecionar-veiculo-principal');
    var spanClose = document.getElementsByClassName('close-modal');

    btnModal.onclick = function () {
        modalVeiculo.style.display = "block";
        content.style.pointerEvents = "none";
        content.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    }

    spanClose.onclick = function () {
        modalVeiculo.style.display = "none";
        content.style.pointerEvents = "auto";
        content.style.backgroundColor = "none";
    }

    window.onclick = function (event) {
        if (event.target == modalVeiculo) {
            modalVeiculo.style.display = "none";
            content.style.pointerEvents = "auto";
            content.style.backgroundColor = "#FFF";
        }
    }
};

function ShowPending() {
    const savedMovingOrigin = localStorage.getItem('dadosOrigem');
    const savedMovingDestination = localStorage.getItem('dadosDestino');
    const savedTotal = localStorage.getItem('valorTotal');
    // Verifica se há informações salvas
    if (savedMovingOrigin && savedMovingDestination && savedTotal) {
        // Converte a string JSON de volta para um objeto
        const savedMovingOrig = JSON.parse(savedMovingOrigin);
        const savedMovingDest = JSON.parse(savedMovingDestination);
        const savedTotalValor = JSON.parse(savedTotal);
        console.log(savedMovingDest);
        // Atualiza as informações da mudança pendente
        document.getElementById('dataMudanca').innerHTML = `<b>Data da mudança:</b><pre> </pre> ${savedMovingDest['Data da mudança']}`;
        document.getElementById('origem').innerHTML = `<b>Endereço de origem:</b><pre> </pre> ${savedMovingOrig['Endereço de origem']}, ${savedMovingOrig["Cidade de origem"]}`;
        document.getElementById('destino').innerHTML = `<b>Endereço de destino:</b><pre> </pre> ${savedMovingDest['Endereço do destino']}, ${savedMovingDest["Cidade do destino"]}`;
        document.getElementById('money').innerHTML = `<b>Valor:</b><pre> </pre> R$${savedTotalValor},00`;

        // Calcula e atualiza o valor total
        const novoHistorico = $("#modelo-historico").clone().removeAttr("id").removeClass("hidden");
        $(".data", novoHistorico).html(new Date(savedMovingDest['Data da mudança']).toLocaleString("pt-BR"));
        $(".origem", novoHistorico).html(savedMovingOrig.address);
        $(".destino", novoHistorico).html(savedMovingDest.destination);
        $(".valor", novoHistorico).html(`R$${savedTotalValor.money}`);
        $("#dados-historico").append(novoHistorico);
        // Esconde a mensagem de "Nenhum histórico adicionado"
        $("#not-add-historic").hide();
    } else {
        // Se não houver dadosDestino, mostra a mensagem de "Nenhum histórico adicionado"
        $("#not-add-historic").show();
    }
}
// Chama a função para mostrar os dados pendentes
ShowPending();