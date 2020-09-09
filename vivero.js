const ORDER_ASC_BY_AGE = "edad -> EDAD";
const ORDER_DESC_BY_AGE = "EDAD -> edad";


var plantasArray = [];
var minEdad = undefined;
var maxEdad = undefined;
var search = undefined;

function sortPlantas(criterio, array) {
    let result = [];
    if (criterio === ORDER_ASC_BY_AGE) {
        result = array.sort(function (a, b) {
            if (a.edad < b.edad) { return -1; }
            if (a.edad > b.edad) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_AGE) {
        result = array.sort(function (a, b) {
            if (a.edad > b.edad) { return -1; }
            if (a.edad < b.edad) { return 1; }
            return 0;
        });
    }
    return result;

}

function verPlanta(id){
    localStorage.setItem('planta', JSON.stringify({plantaId: id}));
    window.location = 'ver-planta.html';
}

function showPlantas(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let planta = array[i];
        if (((minEdad == undefined) || (minEdad != undefined && parseInt(planta.edad) >= minEdad)) &&
            ((maxEdad == undefined) || (maxEdad != undefined && parseInt(planta.edad) <= maxEdad))) {

            if (search == undefined || planta.nombre.toLowerCase().indexOf(search) != -1) {

                contenido += 'ID: ' + planta.id + '<br>';
                contenido += 'Nombre: ' + planta.nombre + '<br>';
                contenido += 'Nombre científico: ' + planta.nomcient + '<br>';
                contenido += 'Origen: ' + planta.origen + '<br>';
                contenido += 'Altura: ' + planta.altura + '<br>';
                contenido += 'Edad: ' + planta.edad + '<br>';
                contenido += '<button style="float: right;" onclick="verPlanta('+ planta.id +')">Ver planta</button><br>'
                contenido += '<br><hr><br>';
            }

        }
        document.getElementById("listado").innerHTML = contenido;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL_VIVERO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            plantasArray = resultObj.data;

            plantasArray = sortPlantas(ORDER_DESC_BY_AGE, plantasArray);

            showPlantas(plantasArray);
        }
    });

    document.getElementById("sortEdadAsc").addEventListener("click", function () {
        plantasArray = sortPlantas(ORDER_ASC_BY_AGE, plantasArray);
        showPlantas(plantasArray);
    })

    document.getElementById("sortEdadDesc").addEventListener("click", function () {
        plantasArray = sortPlantas(ORDER_DESC_BY_AGE, plantasArray);
        showPlantas(plantasArray);
    })

    document.getElementById("filtrar").addEventListener("click", function () {

        minEdad = document.getElementById("rango-min").value;
        maxEdad = document.getElementById("rango-max").value;
        if ((minEdad != undefined) && (minEdad != "") && (parseInt(minEdad)) >= 0) {
            minEdad = parseInt(minEdad);
        } else {
            minEdad = undefined;
        }
        if ((maxEdad != undefined) && (maxEdad != "") && (parseInt(maxEdad)) >= 0) {
            maxEdad = parseInt(maxEdad);
        } else {
            maxEdad = undefined;
        }
        showPlantas(plantasArray);
    });
    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("rango-min").value = "";
        document.getElementById("rango-max").value = "";

        minEdad = undefined;
        maxEdad = undefined;

        showPlantas(plantasArray);
    });

    document.getElementById("search").addEventListener("input", function () {
        search = document.getElementById("search").value.toLowerCase();
        showPlantas(plantasArray);
    });
    document.getElementById("cleanSearch").addEventListener("click", function () {
        document.getElementById("search").value = "";
        search = undefined;
        showPlantas(plantasArray);
    });

});
