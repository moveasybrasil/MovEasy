// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-login").forEach( (e) => {
    e.classList.add("active")
})

function sendPhoto() {

    const files = document.querySelector('[name=file]').files
    let formData = new FormData()
    formData.append('photo', files[0])

    request("PUT", `${serverURL}/user/photo`, 
        (xhr)=> {
            console.log(chr.responseText)
        },
        null,
        formData,
        true
    )

}