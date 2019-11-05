$(document).ready(function () {
    $("footer").css("display", "none");


    const efectoScrollSuave = $('.btn-buscar');

    efectoScrollSuave.click(function (e) {
        // e.preventDefault();
        const anclaListado = '#' + $(this).data('listado');
        $("html,body").animate({
            scrollTop: $(anclaListado).offset().top
        }, 1000);
        $("footer").css("display", "block").animate(1000);
    })
})