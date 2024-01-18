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

});


