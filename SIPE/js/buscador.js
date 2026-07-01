// ===============================================
// SIPE
// Buscador de Evaluaciones
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnBuscar")
        .addEventListener("click", buscar);

});

function buscar() {

    const mes = document
        .getElementById("mes")
        .value
        .trim()
        .toUpperCase();

    const evaluador = document
        .getElementById("evaluador")
        .value
        .trim()
        .toUpperCase();

    let resultados = baseDatos.filter(registro => {

        const cumpleMes =
            mes === "" || registro.mes.toUpperCase() === mes;

        const cumpleEvaluador =
            evaluador === "" ||
            registro.evaluador.toUpperCase().includes(evaluador);

        return cumpleMes && cumpleEvaluador;

    });

    mostrarResultados(resultados);

}

function mostrarResultados(resultados){

    const tbody =
        document.querySelector("#tablaResultados tbody");

    tbody.innerHTML="";

    if(resultados.length===0){

        tbody.innerHTML=`
        <tr>
            <td colspan="5" class="text-center">
                No se encontraron evaluaciones
            </td>
        </tr>
        `;

        return;

    }

    resultados.forEach(r=>{

        tbody.innerHTML+=`

        <tr>

            <td>${formatearFecha(r)}</td>

            <td>${r.mes}</td>

            <td>${r.evaluador}</td>

            <td>${r.tipo}</td>

            <td>${r.oi}</td>

        </tr>

        `;

    });

}

function formatearFecha(r){

    const meses={
        "ENERO":"01",
        "FEBRERO":"02",
        "MARZO":"03",
        "ABRIL":"04",
        "MAYO":"05",
        "JUNIO":"06",
        "JULIO":"07",
        "AGOSTO":"08",
        "SEPTIEMBRE":"09",
        "OCTUBRE":"10",
        "NOVIEMBRE":"11",
        "DICIEMBRE":"12"
    };

    let dia=String(r.dia).padStart(2,"0");

    return dia+"/"+meses[r.mes]+"/2026";

}
