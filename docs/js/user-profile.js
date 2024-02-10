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

const modalPhoto = $('#modal-photo');
$('#photo').click((e) => {
    modalPhoto.removeClass("modal");
    modalPhoto.toggleClass("show");
});

const closeModal = $('#fecha-modal')
closeModal.click((e) => {
    modalPhoto.removeClass("show");
    modalPhoto.toggleClass("modal");

    // Volta a foto para o default
    document.getElementById("photo-change").setAttribute('src', getUrl('assets/images/default.jpg'))

    // Limpa a seleção de foto
    var $el = $('#photo-input');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
})

function fileChanged() {
    let selectedFile = document.getElementById('photo-input').files[0];
    let img = document.getElementById('photo-change')

    let reader = new FileReader();
    reader.onload = function () {
        img.src = this.result
    }
    reader.readAsDataURL(selectedFile);
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
async function loadProfileInfo(){
    userId = JSON.parse(sessionStorage.getItem("user")).id ?? "XXXXXXXX"
    userName = JSON.parse(sessionStorage.getItem("user")).name ?? "Nome Completo"
    userEmail = JSON.parse(sessionStorage.getItem("user")).email ?? "seuemail@email.com"

    document.getElementById("nome-usuario-perfil").innerHTML = userName
    document.getElementById("email-perfil").innerHTML = userEmail
    document.getElementById("id-perfil").innerHTML = userId
}

// Foto de Perfil
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

//Objeto Histórico
async function loadHistorico() {
    request("GET", `${serverURL}/service/closed`, (xhr)=>{
        if(xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(element => {

                const novoHistorico = $("#modelo-historico").clone().removeAttr(`id`).removeClass('hidden');
                $('.data', novoHistorico).html(element.date);
                $('.origem', novoHistorico).html(element.address.street);
                $('.destino', novoHistorico).html(element.address1.street);
                $('.valor', novoHistorico).html(element.price/100);
            
                $("#dados-historico").append($(novoHistorico));

            });
        } else {
            $("#not-add-historic").show()
        }
    }, null, null, true)


    // function createHistorico(historico) {
    //     const novoHistorico = $("#modelo-historico").clone().removeAttr(`id`).removeClass('hidden');
    //     $('.data', novoHistorico).html(historico.data);
    //     $('.origem', novoHistorico).html(historico.origem);
    //     $('.destino', novoHistorico).html(historico.destino);
    //     $('.valor', novoHistorico).html(historico.valor);
    
    //     $("#dados-historico").append($(novoHistorico));
    // }
    
    // const listaH = []
    
    // listaH.push({
    //     data: "25/02/2024 - 18:30h às 19:30h",
    //     origem: "Rua Francisco Vahldieck, 2726 - Bluemanu, SC - (Complemento: Cond. Fortaleza de Sagres, Apto 3015)",
    //     destino: "Rua Iguaçu, 147 - Bluemanu, SC",
    //     valor: "R$ 298,87"
    // })
    // listaH.push({
    //     data: "25/02/2024 - 14:27h às 16:12h",
    //     origem: "Origem: Rua São Paulo, 276 - Bluemanu, SC",
    //     destino: "Rua Iguaçu, 1987 - Bluemanu, SC",
    //     valor: "R$ 432,04"
    // })
    // listaH.push({
    //     data: "24/02/2024 - 10:24h às 11:16h",
    //     origem: "Origem: Rua Francisco Sênior, 987 - Bluemanu, SC",
    //     destino: "Rua Jerõnimo, 577 - Bluemanu, SC - (Complemento: Casa de esquina)",
    //     valor: "R$ 354,12"
    // })
    // listaH.push({
    //     data: "24/02/2024 - 08:15h às 10:12h",
    //     origem: "Origem: Rua Pindamonhangaba, 3132 - Bluemanu, SC",
    //     destino: "Rua Carlota, 2012 - Bluemanu, SC",
    //     valor: "R$ 122,12"
    // })
    
    // for (let historico of listaH) {
    //     createHistorico(historico);
    // }
}

//Objeto Veículo
async function loadVehicle() {
    request("GET", `${serverURL}/vehicle/id`, (xhr)=>{
        if(xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(element => {

                const novoVeiculo = $("#modelo-veiculo").clone().removeAttr(`id`).removeClass('hidden');
                $('.modelo', novoVeiculo).html(element.name);
                $('.ano', novoVeiculo).html(element.year);
                $('.cor', novoVeiculo).html(element.colour);
                $('.placa', novoVeiculo).html(element.licensePlate);
                $('.images', novoVeiculo).html("Sem imagens cadastradas");
            
                $("#dados-veiculos").append($(novoVeiculo));

            });
        } else {
            $("#not-add-vehicle").show()
        }
    }, null, null, true)
}

async function LoadProfile() {
    await loadProfileInfo()
    await loadProfilePhoto()
    await loadHistorico()
    await loadVehicle()
}

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    goTo(`user/login`)
}

LoadProfile()