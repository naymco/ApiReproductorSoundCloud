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
        //Since our CSS is going to monkey with the height as you scroll, I need= $sidebar.height();
    })

    var $sidebar = $('.barra-lateral'),
        $content = $('.contenedor-principal');

    //Since our CSS is going to monkey with the height as you scroll, I need to know the initial height.
    var sidebarHeight = $sidebar.height();

    if ($sidebar.length > 0 && $content.length > 0) {
        var $window = $(window),
            offset = $sidebar.offset(),
            timer;

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

   



    /* function borrarCancion(node) {
        node.on('mousedown', function (ev) {
            const clickDerecho = ev.button === 2;
            const cancionEnLista = $('.enLista');
            if (clickDerecho) {
                if (
                    confirm('¿estás seguro que quieres eliminar la canción?')
                ) {
                    $(cancionEnLista).remove();
                }
            }
        })
    } */
})