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

var header = document.getElementById('header');
var navigation = document.getElementById('navigation-header');
var content = document.getElementById('content');
var btn = document.getElementById('btn-icon')
var animationSidebar1 = false;
var animationSidebar2 = false;
var animationBtnburguer = false;

function toggleSidebar() {
    animationSidebar1 = !animationSidebar1;
    if(animationSidebar1) {
        btn.style.animationName = "animationBtnburguer"
        btn.style.marginLeft = "-100vw"
        navigation.style.marginLeft = "-10vw"
        navigation.style.animationName = "animationSidebar1"
        content.style.filter = "blur(2px)"
        document.getElementById('content').addEventListener("onclick", toggleSidebar);
    }
    else {
        navigation.style.marginLeft = "-100vw"
        navigation.style.animationName = "animationSidebar2"
        content.style.filter = ""
        btn.style.marginLeft = ""
        document.getElementById('content').removeEventListener("onclick", toggleSidebar);

    }
}

window.addEventListener('resize', function(event) {
        if(window.innerWidth <= 968 && animationSidebar1) {
            toggleSidebar();
        }
});


