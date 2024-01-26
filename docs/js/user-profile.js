// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach( (e) => {
    e.classList.add("active")
})

if(!sessionStorage.getItem(`token`) && window.location.origin != "file://") { goTo(`user/login`)}

function setProfilePhoto() {

    let url = () => {
        try {
            request("GET", `${serverURL}/user/photo`, (xhr) => {
                if(xhr.status == 200) {
                    return `${r2URL}/${xhr.responseText}`;
                } else {
                    return `${r2URL}/user/default.jpg`
                }
            }) 
        } catch {
            return `${r2URL}/user/default.jpg` 
        }
    }

    document.getElementById("photo").src = url();
}