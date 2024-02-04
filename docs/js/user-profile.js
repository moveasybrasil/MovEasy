// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach((e) => {
    e.classList.add("active")
})

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

if (!sessionStorage.getItem(`token`) && window.location.origin != "file://") { goTo(`user/login`) }

async function setProfilePhoto() {

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

setProfilePhoto()

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    goTo(`user/login`)
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

    var spans = document.querySelectorAll('.sections-perfil span');
    spans.forEach(function (span, i) {
        span.classList.remove('active-perfil');
        if (i === index) {
            span.classList.add('active-perfil');
        }
    });
}