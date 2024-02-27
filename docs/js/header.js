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
        window.location.href = "https://www.facebook.com/moveasybrasil";
    });
    const popGit = $('#popgithub')
    $('#git-icon').on('click', (e) => {
        popGit.toggleClass("flex active");

    });
    $('#insta-icon').click((e) => {
        window.location.href = "https://www.instagram.com/moveasybrasil/";
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('#poplinkedin').length && !$(e.target).is('#in-icon')) {
            $('#poplinkedin').removeClass("flex active");
        }
    });
    $(document).click(function (e) {
        if (!$(e.target).closest('#popgithub').length && !$(e.target).is('#git-icon')) {
            $('#popgithub').removeClass("flex active");
        }
    });
});

var header = document.getElementById('header');
var navigation = document.getElementById('navigation-header');
var content = document.getElementById('content');
var btn = document.getElementById('btn-icon')
var popLinkedin = document.getElementById('poplinkedin')
var popGithub = document.getElementById('popgithub')
var footer = document.getElementsByClassName('footer')
var animationSidebar1 = false;
var animationSidebar2 = false;
var animationBtnburguer = false;

function toggleSidebar() {
    animationSidebar1 = !animationSidebar1;
    if (animationSidebar1) {
        btn.style.animationName = "animationBtnburguer"
        btn.style.marginLeft = "-100vw"
        navigation.style.marginLeft = "-10vw"
        navigation.style.animationName = "animationSidebar1"
        content.style.filter = "blur(2px)"
        content.style.pointerEvents = "none";
        document.body.style.overflow = "hidden";
    }
    else {
        navigation.style.marginLeft = "-100vw"
        navigation.style.animationName = "animationSidebar2"
        content.style.filter = ""
        btn.style.marginLeft = ""
        content.style.pointerEvents = "auto";
        document.body.style.overflow = "auto";
    }
}

window.addEventListener('resize', function (event) {
    if (window.innerWidth <= 968 && animationSidebar1) {
        toggleSidebar();
    }
});


if (isTokenValid()) {
    document.querySelectorAll(".header-login").forEach((e) => {
        e.innerHTML = "PERFIL"
    })
}

// click logo header //

document.querySelector('#logo-img').addEventListener('click', function () {
    goTo('index')
});