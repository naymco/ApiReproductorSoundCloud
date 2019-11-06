$(document).ready(function () {



    const efectoScrollSuave = $('.btn-buscar');

    efectoScrollSuave.click(function (e) {
        // e.preventDefault();
        const anclaListado = '#' + $(this).data('listado');
        $("html,body").animate({
            scrollTop: $(anclaListado).offset().top
        }, 1000);

    });


    var $sidebar = $('.barra-lateral'),
        $content = $('.contenedor-principal');

    //Since our CSS is going to monkey with the height as you scroll, I need to know the initial height.
    let sidebarHeight = $sidebar.height();

    if ($sidebar.length > 0 && $content.length > 0) {
        let $window = $(window),
            offset = $sidebar.offset();

        $window.scroll(function () {

            if ($content.height() > sidebarHeight) {
                let new_margin = $window.scrollTop() - offset.top;
                if ($window.scrollTop() > offset.top) {
                    $sidebar.addClass("fixed");
                    $sidebar.scrollTop(new_margin);
                } else {
                    $sidebar.removeClass("fixed");
                }
            }
        });
    }
    const navBar = $('nav');
    $(window).on('scroll', function newClassBar() {
        if ($(window).scrollTop()) {
            navBar.addClass('black');

        } else {
            navBar.removeClass('black');



        }
    });


});