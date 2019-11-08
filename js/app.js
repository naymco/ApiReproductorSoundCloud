// defino todas las constantes
const claveId = 'aa06b0630e34d6055f9c6f8beb8e02eb'; // clave id de soundcloud necesaria para conectar a su api
const formBuscar = document.getElementById('formulario-buscador');
const inputBusqueda = document.getElementById('input-busqueda');
const botonBuscador = document.getElementById('boton-buscador');
const cabeceraCaratula = document.getElementById('cabecera-caratula');
const listadoBusqueda = document.getElementById('listado-busqueda');
const audio = document.querySelector('.reproductor-musica');

function reproducirPista(pistaActual) {
    console.log(pistaActual.id);
    audio.src = ` ${pistaActual.id}?client_id=${claveId}`;
    audio.autoplay = true;

    let copiaPista = pistaActual.cloneNode(true)
    listadoBusqueda.appendChild(copiaPista);
}

formBuscar.addEventListener('submit', function (e) { // evento que escuchará el submit del formulario
    var buscar = inputBusqueda.value // capturo el valor del input
    console.log(buscar)
    buscarCantante(buscar); // envio la informacion del input a la funcion que hace la busqueda
})

function buscarCantante(cantante) {
    console.log('está buscando');
    fetch(`https://api.soundcloud.com/users/?client_id=${claveId}&q=${cantante}`) // con fetch envia la informacion para obtener respuesta del servidor de soundcloud con la clave id 
        .then(function (response) {
            /* console.log(res) */
            return response.json() // retorna la información de la api de soundcloud en formato json
        })
        .then(function (json) { // creo un objeto dentro de una array que contendrá la información que necesito del json anterior
            console.log(json);

            while (listadoBusqueda.hasChildNodes()) {
                listadoBusqueda.removeChild(listadoBusqueda.firstChild)
            }

            for (var i = 0; i < 10; i++) {
                var datosArtista = {}
                datosArtista.id = json[i].id // le digo que busque la propiedad id, nombre, imagen y pistas del artista y los guarde en un objeto
                datosArtista.nombre = json[i].username
                datosArtista.imagen = json[i].avatar_url
                datosArtista.pistas = json[i].track_count

                var infoArtistHTML = `
                <div class="caratula-disco" id="${datosArtista.id}">
                    <p class="idArtista"></p>
                    <img src="${datosArtista.imagen}" class="imagen-disco">
                    <h3 class="nombre-cantante"> ${datosArtista.nombre}</h3>
                    <p class="nombre-cancion">Nº de pistas: ${datosArtista.pistas}</p>
                </div>
            `;
                listadoBusqueda.insertAdjacentHTML('beforeend', infoArtistHTML)

            }


        })
        .then(function () {
            const caratulaDisco = document.querySelectorAll('.caratula-disco');
            for (let e = 0; e < caratulaDisco.length; e++) {
                let artista = caratulaDisco[e].id
                caratulaDisco[e].addEventListener('click', function () {
                    console.log(artista)
                    subirCanciones(artista);
                })
            }
        });

    function subirCanciones(selecCantante) {
        fetch(`https://api.soundcloud.com/users/${selecCantante}/tracks/?client_id=${claveId}&limit=100`)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                console.log(json)

                while (listadoBusqueda.hasChildNodes()) {
                    listadoBusqueda.removeChild(listadoBusqueda.firstChild)
                }
                if (json.length === 0) { // condicion para verificar que el disco contiene canciones
                    console.log('failure');
                    let errorCabecera =
                        `<h3 id="failHeading">Oops! Unfortunately, the artist you selected does not provide any free tracks for streaming. Please search again.</h3>
            `;
                    listadoBusqueda.insertAdjacentHTML('beforeend', errorCabecera)
                } else {
                    console.log('success')
                    cabeceraPista = `
                    <div class="barra-ordenada">
                         <h3 class="titulo-ordenado"></h3>
                    </div>
                    `;
                    listadoBusqueda.insertAdjacentHTML('beforeend', cabeceraPista);


                    var DatosArtista = []
                    for (let g = 0; g < json.length; g++) {
                        var infoPista = {}

                        infoPista.id = json[g].stream_url
                        infoPista.imagen = json[g].artwork_url
                        infoPista.title = json[g].title
                        infoPista.artist = json[g].user.username
                        DatosArtista.push(infoPista)
                    }

                    DatosArtista.sort((x, y) => {
                        a = x.title.toUpperCase()
                        b = y.title.toUpperCase()

                        if (a > b) {
                            return 1
                        } else {
                            if (a < b) {
                                return -1
                            }
                            return 0;
                        }
                    });
                    console.log(DatosArtista)
                    for (let m = 0; m < DatosArtista.length; m++) {
                        let pistaHTML = `
                        <div class="pista" id="${DatosArtista[m].id}" draggable="true" ondragstart="drag(event)" onclick="reproducirPista(this)">
                        <img class="imagen-pista" src="${DatosArtista[m].imagen}" alt="No funciona la imagen">
                            <div class="titulo-descripcion">
                                <p class="titulo-pista">${DatosArtista[m].title}</p>
                                <p class="artista-pista">${DatosArtista[m].artist}</p>
                            </div>
                            
                        </div>
                        
                 `;

                        listadoBusqueda.insertAdjacentHTML('beforeend', pistaHTML)

                    }

                }
            });
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let dataDnD = ev.target.appendChild(document.getElementById(data));
    ev.dataTransfer.clearData();
    const arrastrarAqui = document.getElementById('arrastrar-aqui');
    let eliminarTitulo = document.getElementsByTagName('h2')[0];

    document.getElementById(`${data}`).className = 'enLista';
    arrastrarAqui.removeChild(eliminarTitulo)

}

function dragOver(ev) {
    ev.preventDefault();
}