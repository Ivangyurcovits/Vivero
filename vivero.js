var viveroArray = [];

var minEdad = undefined;
var maxEdad = undefined;

function showVivero(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let planta = array[i];
        if(((minEdad == undefined) || (minEdad != undefined && parseInt(planta.edad) >= minEdad)) &&
        ((maxEdad == undefined) || (maxEdad != undefined && parseInt(planta.edad) <= maxEdad))){

        contenido += 'ID: ' + planta.id + '<br>';
        contenido += 'Nombre: ' + planta.nombre + '<br>';
        contenido += 'Nombre científico: ' + planta.nomcient + '<br>';
        contenido += 'Origen: ' + planta.origen + '<br>';
        contenido += 'Altura: ' + planta.altura + '<br>';
        contenido += 'Edad: ' + planta.edad + '<br>';
        contenido += '<br><hr><br>';
        }
        document.getElementById("listado").innerHTML = contenido;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(URL_VIVERO).then(function(resultObj) {
        if (resultObj.status === "ok") {
            viveroArray = resultObj.data;
            showVivero(viveroArray);
        }
    });
});
