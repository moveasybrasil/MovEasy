// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-home").forEach( (e) => {
    e.classList.add("active")
})

$(() => {
       $('#text-bt').click( (e) => {
        goTo('agenda')
       })
    });