var plantasArray = [];
var commentsArray = [];

function showPlantas(array, comentarioArray) {
    let verPlanta = JSON.parse(localStorage.getItem('planta'));
    for (let i = 0; i < plantasArray.length; i++) {
        let planta = array[i];
        let info = "";
        let imgs = "";
        let comments = "<hr>";
        if (planta.id == verPlanta.plantaId) {
            info += '<h3>' + planta.nombre + '</h3>';
            info += '<strong>Origen: ' + planta.origen + '</strong><br>';
            info += '<i>' + planta.nomcient + '</i> <br>';
            info += '(' + planta.edad + ' años).<br>';

            imgs += '<img class="img" src= "imgs/' + planta.nombre + '/1.jpg" height="200px"  HSPACE="10" alt="">';
            imgs += '<img class="img" src= "imgs/' + planta.nombre + '/2.jpg" height="200px"  HSPACE="10" alt="">';
            imgs += '<img class="img" src= "imgs/' + planta.nombre + '/3.jpg" height="200px"  HSPACE="10" alt="">';

            commentsArray.forEach(function (comment) {
                let puntos = "";
                if (comment.id_planta == verPlanta.plantaId) {
                    comments += '<strong>' + comment.user + '</strong> dijo: <br> <p>' + comment.comentario + '</p>';
                    for (let i = 1; i <= comment.calificacion; i++) {
                        puntos += '<span class="fa fa-star checked"></span>';
                    }
                    for (let i = comment.calificacion + 1; i <= 5; i++) {
                        puntos += '<span class="fa fa-star"></span>';
                    }
                    comments += '<div style="text-align: right;">' + puntos + '</div><br><hr>';
                }
            });

            document.getElementById("content").innerHTML = info;
            document.getElementById("images").innerHTML = imgs;
            document.getElementById("comments").innerHTML = comments;

        }
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(COMENTARIOS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
        }
    });
    getJSONData(URL_VIVERO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            plantasArray = resultObj.data;

            showPlantas(plantasArray, commentsArray);
        }
    });
    document.getElementById("enviarComm").addEventListener("click", function () {
        let newComment = {
            id_planta: JSON.parse(localStorage.getItem('planta')).plantaId,
            calificacion: parseInt(document.getElementById('newCal').value),
            comentario: document.getElementById('newComm').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email
        };

        commentsArray.push(newComment);
        showPlantas(plantasArray, commentsArray);

    })
});