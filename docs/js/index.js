// Adiciona a tag 'active' ao header para o item especifico
document.querySelectorAll(".header-home").forEach((e) => {
    e.classList.add("active")
})

$(() => {
    $('#text-bt').click((e) => {
        goTo('agenda')
    })
    $('#in-icon').click((e) => {
        $('#poplinkedin').toggleClass("flex active");
    });
    $('#fb-icon').click((e) => {
        window.location.href = "https://pt-br.facebook.com";
    });
    $('#x-icon').click((e) => {
        window.location.href = "https://twitter.com";
    });
    $('#insta-icon').click((e) => {
        window.location.href = "https://www.instagram.com/";
    });
    });