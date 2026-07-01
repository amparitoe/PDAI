// =========================================
// SIPE
// Buscador
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("btnBuscar")
        .addEventListener("click", buscar);

});

function buscar() {

    const mes =
        document.getElementById("mes").value.toUpperCase();

    const evaluador =
        document.getElementById("evaluador").value.toUpperCase();

    let resultados = baseDatos.filter(r => {

        const okMes =
            mes === "" || r.mes.toUpperCase() === mes;

        const okEvaluador =
            evaluador === "" ||
            r.evaluador.toUpperCase().includes(evaluador);

        return okMes && okEvaluador;

    });

    pintarTabla(resultados);

}

function pintarTabla(datos){

    const tbody=document.querySelector("#tablaResultados tbody");

    tbody.innerHTML="";

    if(datos.length===0){

        tbody.innerHTML=`
        <tr>
        <td colspan="6" class="text-center">
        No existen resultados
        </td>
        </tr>
        `;

        return;

    }

    datos.forEach((r,i)=>{

        tbody.innerHTML+=`

        <tr>

        <td>${fecha(r)}</td>

        <td>${r.evaluador}</td>

        <td>${r.tipo}</td>

        <td>${r.oi}</td>

        <td>

        <button
        class="btn btn-success btn-sm"
        onclick="verEquipo(${i})">

        👥 Equipo

        </button>

        </td>

        </tr>

        `;

    });

    window.resultadosActuales=datos;

}

function fecha(r){

    const meses={

        ENERO:"01",
        FEBRERO:"02",
        MARZO:"03",
        ABRIL:"04",
        MAYO:"05",
        JUNIO:"06",
        JULIO:"07",
        AGOSTO:"08",
        SEPTIEMBRE:"09",
        OCTUBRE:"10",
        NOVIEMBRE:"11",
        DICIEMBRE:"12"

    };

    return String(r.dia).padStart(2,"0")+"/"+meses[r.mes]+"/2026";

}

function verEquipo(indice){

    const registro=window.resultadosActuales[indice];

    const equipo=baseDatos.filter(r=>

        r.mes===registro.mes &&
        r.dia===registro.dia &&
        r.oi===registro.oi

    );

    let texto="";

    equipo.forEach(e=>{

        texto+="• "+e.evaluador+"\n";

    });

    alert(

        "ORGANISMO\n\n"

        +registro.oi+

        "\n\nFECHA\n\n"

        +fecha(registro)+

        "\n\nEQUIPO\n\n"+

        texto

    );

}
