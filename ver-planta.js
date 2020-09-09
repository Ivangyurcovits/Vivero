var plantasArray = [];

function showPlantas(array){
    let verPlanta = JSON.parse(localStorage.getItem('planta'));
    for (let i = 0; i < plantasArray.length; i++){
        let planta = array[i];
        let info = "";
        let imgs = "";
        if (planta.id == verPlanta.plantaId){
            info += '<h3>' + planta.nombre + '</h3>';
            info += '<strong>Origen: ' + planta.origen + '</strong><br>';
            info += '<i>' + planta.nomcient + '</i> <br>';
            info += '(' + planta.edad + ' años).<br>';

            imgs += '<img class="img" src= "imgs/'+ planta.nombre +'/1.jpg" width="100px" alt="">';
            imgs += '<img class="img" src= "imgs/'+ planta.nombre +'/2.jpg" width="100px" alt="">';
            imgs += '<img class="img" src= "imgs/'+ planta.nombre +'/3.jpg" width="100px" alt="">';

            document.getElementById("content").innerHTML = info;
            document.getElementById("images").innerHTML = imgs;

        }
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL_VIVERO).then(function (resultObj){
        if (resultObj.status === "ok"){
            plantasArray = resultObj.data;

            showPlantas(plantasArray);
        }
    });
});