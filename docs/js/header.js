$(() => {
    $('#icone-mobile').click(() => {
        $('.menu-mobile-links').css({ display: "flex", opacity: "1", transition: "0.1s" });
        $('#icone-mobile').addClass("hidden");
        $('#icone-mobile2').removeClass("hidden");

    });
    $('#icone-mobile2').click(() => {
        $(".menu-mobile-links").css({ display: 'none', opacity: 0 });
        $('#icone-mobile2').addClass("hidden");
        $('#icone-mobile').removeClass("hidden");

    })
    const popUp = $('#poplinkedin');
    $('#in-icon').click((e) => {
        popUp.toggleClass("flex active");
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
    
    $(document).click(function (e) {
        if (!$(e.target).closest('#poplinkedin').length && !$(e.target).is('#in-icon')) {
            $('#poplinkedin').removeClass("flex active");
        }
    });
});