$(document).ready(function () {
    $("footer").css("display", "none");


    const efectoScrollSuave = $('.btn-buscar');

    efectoScrollSuave.click(function (e) {
        const anclaListado = '#' + $(this).data('listado');
        $("html,body").animate({
            scrollTop: $(anclaListado).offset().top
        }, 1000);
        $("footer").css("display", "block").animate(1000);
    })

    var $sidebar = $('.barra-lateral'),
        $content = $('.contenedor-principal');

    var sidebarHeight = $sidebar.height();

    if ($sidebar.length > 0 && $content.length > 0) {
        var $window = $(window),
            offset = $sidebar.offset()


        $window.scroll(function () {

            if ($content.height() > sidebarHeight) {
                var new_margin = $window.scrollTop() - offset.top;
                if ($window.scrollTop() > offset.top) {
                    // Fix sidebar
                    $sidebar.addClass("fixed");
                    // Scroll it the appropriate ammount
                    $sidebar.scrollTop(new_margin);
                } else {
                    $sidebar.removeClass("fixed");
                }
            }
        });
    }
    $(window).on('scroll', function () {
        if ($(window).scrollTop()) {
            $('nav').addClass('black');
        } else {
            $('nav').removeClass('black');
        }
    });


    $(document).ready(function () {
        $('.cambio-color').change(function () {
            $('nav, #listado-relacionado-barra-lateral').css('background', $(this).val());
            $('span').css('color', $(this).val());
            /*
                        $('.caratula-disco:hover').css('background-color', $(this).val());
                        $('.pista:hover').css('background-color', $(this).val()); */


        });
    });

});