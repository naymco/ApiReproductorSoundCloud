// defino todas las constantes
const claveId = 'aa06b0630e34d6055f9c6f8beb8e02eb'; // clave id de soundcloud necesaria para conectar a su api
const formBuscar = document.getElementById('formulario-buscador');
const inputBusqueda = document.getElementById('input-busqueda');
const botonBuscador = document.getElementById('boton-buscador');
const cabeceraCaratula = document.getElementById('cabecera-caratula');
const listadoBusqueda = document.getElementById('listado-busqueda');
const audio = document.querySelector('.reproductor-musica');
let resultDrop = [];

function reproducirPista(pistaActual) { // con esta funcion creo el src del audio para ejecutarlo al darle al play

    audio.src = ` ${pistaActual.id}?client_id=${claveId}`;
    audio.autoplay = true;
    pistaActual.data = true;
    let music = audio.src;
    pararPistaActual(pistaActual, music);
    // console.log(pistaActual)
}

function pararPistaActual(pista, music) {
    console.log(pista)
    if ( pista.data ) {
        // let iconoStop = `<i id="pista.id" class="fa fa-stop button-delete-style" aria-hidden="true"></i>`;
        pista.className = 'fa fa-stop button-delete-style';
        pista.addEventListener('click', function (event) {
            event.preventDefault();
            pararPista(pista);
        })
        console.log(pista)
    } else {
        pista.className = 'fa fa-play button-play-style';
    }
}

function pararPista(pista) {
        audio.pause();
        audio.currentTime = 0;
        pista.className = 'fa fa-play button-play-style';
        pista.addEventListener('click', function (event) {
            event.preventDefault();
            reproducirPista(pista);
        })

}

formBuscar.addEventListener('submit', function (e) { // evento que escuchará el submit del formulario
    let buscar = inputBusqueda.value // capturo el valor del input
    console.log(buscar)
    buscarCantante(buscar); // envio la informacion del input a la funcion que hace la busqueda
});

async function fetching(url) {
    let result = await fetch(url);
    let artists = await result.json();
    if (artists === undefined) {
        return result;
    } else {
        return artists;
    }
}

async function buscarCantante(cantante) {
    console.log('está buscando');
    let json = await fetching(`https://api.soundcloud.com/users/?client_id=${claveId}&q=${cantante}`);

    while (listadoBusqueda.hasChildNodes()) {
        listadoBusqueda.removeChild(listadoBusqueda.firstChild)
    }
    console.log(json)

    for (var i = 0; i < 10; i++) {
        var datosArtista = {}
        datosArtista.id = json[i].id;
        datosArtista.nombre = json[i].username;
        datosArtista.imagen = json[i].avatar_url;
        datosArtista.pistas = json[i].track_count;

        var infoArtistHTML = `
                <div class="caratula-disco" id="${datosArtista.id}">
                    <p class="idArtista"></p>
                    <img src="${datosArtista.imagen}" class="imagen-disco">
                    <h3 class="nombre-cantante"> ${datosArtista.nombre}</h3>
                    <p class="nombre-cancion">Nº de pistas: ${datosArtista.pistas}</p>
                </div>
            `;
        listadoBusqueda.insertAdjacentHTML('beforeend', infoArtistHTML)

        const caratulaDisco = document.querySelectorAll('.caratula-disco');
        for (let e = 0; e < caratulaDisco.length; e++) {
            let artista = caratulaDisco[e].id
            caratulaDisco[e].addEventListener('click', function () {
                console.log(artista)
                subirCanciones(artista);
            });
        }
    }
}

function obtenerDatosDelArtista(json) {
    let DatosArtista = [];
    let detalle;
    for (let g = 0; g < json.length; g++) { // Bucle para encontrar los objetos dentro de la Array
        var infoPista = {}

        infoPista.id = json[g].stream_url
        infoPista.imagen = json[g].artwork_url
        infoPista.title = json[g].title
        infoPista.artist = json[g].user.username
        DatosArtista.push(infoPista)

    }
    detalle = ordenarArrays(DatosArtista);
    return detalle;
}

function ordenarArrays(array) {
    let result = 0
    array.sort((x, y) => {
        a = x.title.toUpperCase();
        b = y.title.toUpperCase();

        if (a > b) {
            return result = 1;
        } else {
            return result = -1;
        }
        return result;
    });
    return array;
}

async function subirCanciones(selecCantante) { //con esta funcion obtengo la información de soundcloud y me retorna la info en formato json
    let json = await fetching(`https://api.soundcloud.com/users/${selecCantante}/tracks/?client_id=${claveId}&limit=100`);

    while (listadoBusqueda.hasChildNodes()) { //bucle que limpia el contenido al hacer búsquedas
        listadoBusqueda.removeChild(listadoBusqueda.firstChild)
    }

    if (json.length === 0) { // condicion para verificar que el disco contiene canciones
        console.log('failure');
        let errorCabecera = // en caso de haber un error informará de ello al usuario
            `<h3 id="failHeading">Oops! Unfortunately, the artist you selected does not provide any free tracks for streaming. Please search again.</h3>`;
        listadoBusqueda.insertAdjacentHTML('beforeend', errorCabecera)
    } else {
        let detalleArtista = obtenerDatosDelArtista(json);
        // console.log(detalleArtista)
        pintarArtistaHTML(detalleArtista);
    }
}

function pintarArtistaHTML(DatosArtista) {
    // console.log(DatosArtista)
    for (let m = 0; m < DatosArtista.length; m++) { // Bucle para obtener datos de la pista y pintarla en pantalla
        let pistaHTML = `
                        <div class="pista" id="${DatosArtista[m].id}" draggable="true" ondragstart="drag(event)" >
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

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    let data = ev.dataTransfer.getData("text");
    let indexComplete;
    let songsAttributes = [];
    let eliminarTitulo = document.getElementsByTagName('h2')[1];

    eliminarTitulo.style.display = 'none';

    resultDrop.push(data);
    for (let indexMusic = 0; indexMusic < resultDrop.length; indexMusic++) {
        if (resultDrop.length > 0) {
            ev.target.appendChild(document.getElementById(resultDrop[indexMusic]));
            ev.dataTransfer.clearData();
            const arrastrarAqui = document.getElementById('arrastrar-aqui');
            document.getElementById(`${data}`).className = 'enLista';
            songsAttributes = document.getElementsByClassName('enLista');
            indexComplete = indexMusic;

        }
    }
    for (let indexAttr = 0; indexAttr < songsAttributes.length; indexAttr++) {
        console.log(songsAttributes[indexAttr]);
        }

        let handleSong = document.createElement('div');
        let buttonHandle = document.createElement('div');

        handleSong.id = 'handle-song';
        handleSong.dataset = active = false;
        buttonHandle.className = ' handle-button';

        let htmlAttr = `
                       <i id="${songsAttributes[indexComplete].id}" data="${active}" onclick="reproducirPista(this)" class="fa fa-play button-play-style" aria-hidden="true"></i>       
                       <i id="${songsAttributes[indexComplete].id}" onclick="buttonDeleteSong(event, this)" class="fa fa-trash button-delete-style" aria-hidden="true"></i>
                      `;
        // document.getElementById('handle-song').innerHTML = htmlAttr;
        // handleSong.appendChild();

        handleSong.innerHTML = htmlAttr;
        songsAttributes[indexComplete].appendChild(handleSong);


    }



function buttonDeleteSong(event, del) {
    event.preventDefault();
    let target = document.getElementById(`${del.id}`);
    target.style.display = 'none';
}

function dragOver(ev) {
    ev.preventDefault();
}

//
// var newDiv = document.createElement("div");
// newDiv.id = "span";
// var respuesta = document.getElementById("respuestas");
// respuesta.appendChild(newDiv);
// document.getElementById('span').innerHTML = 'El registre ha sido borrado.';
