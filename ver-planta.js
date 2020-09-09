var plantasArray = [];
var commentsArray =[];

function showPlantas(array, comentarioArray){
    let verPlanta = JSON.parse(localStorage.getItem('planta'));
    for (let i = 0; i < plantasArray.length; i++){
        let planta = array[i];
        let info = "";
        let imgs = "";
        let comments = "<hr>";
        if (planta.id == verPlanta.plantaId){
            info += '<h3>' + planta.nombre + '</h3>';
            info += '<strong>Origen: ' + planta.origen + '</strong><br>';
            info += '<i>' + planta.nomcient + '</i> <br>';
            info += '(' + planta.edad + ' años).<br>';

            imgs += '<img class="img" src= "imgs/'+ planta.nombre +'/1.jpg" height="200px"  HSPACE="10" alt="">';
            imgs += '<img class="img" src= "imgs/'+ planta.nombre +'/2.jpg" height="200px"  HSPACE="10" alt="">';
            imgs += '<img class="img" src= "imgs/'+ planta.nombre +'/3.jpg" height="200px"  HSPACE="10" alt="">';

            for (let comment in comentarioArray){
                if (comentarioArray[comment].id_planta == verPlanta.plantaId){
                    comments += '<strong>'+ comentarioArray[comment].user +'</strong> dijo: <br>';
                    comments += '<p>'+ comentarioArray[comment].comentario +'</p><br>';
                    comments += 'Calificación  <strong>'+ comentarioArray[comment].calificacion +'</strong>';
                    comments += '<br><hr>'
                }
            }

            document.getElementById("content").innerHTML = info;
            document.getElementById("images").innerHTML = imgs;
            document.getElementById("comments").innerHTML = comments;

        }
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(COMENTARIOS_URL).then(function(resultObj){
        if (resultobj.status === "ok") {
            commentsArray = resultObj.data;            
        }
    });
    getJSONData(URL_VIVERO).then(function (resultObj){
        if (resultObj.status === "ok"){
            plantasArray = resultObj.data;

            showPlantas(plantasArray, commentsArray);
        }
    });
});