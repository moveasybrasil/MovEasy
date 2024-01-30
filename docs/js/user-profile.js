// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach( (e) => {
    e.classList.add("active")
})

async function sendPhoto() {

    const files = document.querySelector('[name=file]').files
    let formData = new FormData()
    formData.append('image', files[0])

    await request("PUT", `${serverURL}/user/photo`, 
        (xhr)=> {
            console.log(xhr.responseText)
        },
        null,
        formData,
        true
    )

    await setProfilePhoto()
}

if(!sessionStorage.getItem(`token`) && window.location.origin != "file://") { goTo(`user/login`)}

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
$('#photo').click( (e) => {
    modalPhoto.removeClass("modal");
    modalPhoto.toggleClass("show");
});

const closeModal = $('#fecha-modal')
closeModal.click( (e) => {
    modalPhoto.removeClass("show");
    modalPhoto.toggleClass("modal");
})