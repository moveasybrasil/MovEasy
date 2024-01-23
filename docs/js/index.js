// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-home").forEach( (e) => {
    e.classList.add("active")
})

$(() => {

    $("#buscar-opc").click( ()=> {
        
        const values = {
            origem_estado: $("#origem_estado")[0].value,
            origem_cidade: $("#origem_cidade")[0].value,
            destino_estado: $("#destino_estado")[0].value,
            destino_cidade: $("#destino_cidade")[0].value
        }

        const texts = {
            origem_estado: "Estado de Origem",
            origem_cidade: "Cidade de Origem",
            destino_estado: "Estado de Destino",
            destino_cidade: "Cidade de Destino"
        }

        for(key in values) {
            if(!values[key]){
                alert(`${texts[key]} não informado/a!`)
                $(`#${key}`).addClass("invalid")
                return
            } else {
                $(`#${key}`).removeClass("invalid")
            }
        }

        console.log(values);

    })

})