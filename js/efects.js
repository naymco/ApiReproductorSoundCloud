$(document).ready(function () {
    $("footer").css("display", "none");
    // Efecto de scroll para posicionar al usuario en la búsqueda y saltando de la cabecera al contenido directamente
    const efectoScrollSuave = $('.btn-buscar');

    efectoScrollSuave.click(function () {
        const anclaListado = '#' + $(this).data('listado');
        $("html,body").animate({
            scrollTop: $(anclaListado).offset().top
        }, 1000);
    });

    //Efecto sidebar fija, donde se encuentra el reproductor, así siempre está a mano por si deseas cambiar la canción
    let sidebar = $('.barra-lateral')
    let content = $('.contenedor-principal');
    let sidebarHeight = sidebar.height();

    if (sidebar.length > 0 && content.length > 0) {
        let $window = $(window)
        let offset = sidebar.offset() // Esta función la uso para que el sidebar recupere los margenes originales

        $window.scroll(function () {
            // agregaré una nueva clase a la barra lateral, 
            // para darle estilos en css y usaré position: fixed, dándole top, y left para colocarla en su lugar
            if (content.height() > sidebarHeight) {
                var new_margin = $window.scrollTop() - offset.top;
                if ($window.scrollTop() > offset.top) {
                    sidebar.addClass("fixed");
                    sidebar.scrollTop(new_margin);
                } else { // aquí remuevo de nuevo la clase al volver arriba
                    sidebar.removeClass("fixed");
                }
            }
        });
    }

    // De nuevo uso el agregar y elimnar una clase nueva, pero aquí la agrego a la barra de navegación para 
    // añadir el efecto de desaparecer y no molestar tanto cuando estás deciciendo que canción poner
    $(window).on('scroll', function () {
        if ($(window).scrollTop()) {
            $('nav').addClass('black');
        } else {
            $('nav').removeClass('black');
        }
    });

    // Esta función la aprendí en las clases de Juan de Jquery donde propuso cambiar los botones de color
    // con un picker creado en html. El usuario puede cambiar el color, del navbar, sidebar y también del logo. 
    $(document).ready(function () {
        $('.cambio-color').change(function () {
            $('nav, #listado-relacionado-barra-lateral').css('background', $(this).val());
            $('span').css('color', $(this).val());
        });
    });

});