// ===============================
// SIPE - Motor de lectura Excel
// ===============================

let baseDatos = [];

const ignorar = [
    "VACACIONES",
    "PERMISO",
    "CURSO",
    "CAPACITACIÓN",
    "CAPACITACION",
    "FERIADO",
    "IAAC",
    "ILAC",
    "REUNIÓN",
    "REUNION",
    "LICENCIA",
    "DESCANSO",
    "0"
];

async function cargarExcel(){

    baseDatos=[];

    const response = await fetch("datos/planificacion.xlsx");

    if(!response.ok){
        throw new Error("No se pudo abrir el archivo Excel.");
    }

    const buffer = await response.arrayBuffer();

    const workbook = XLSX.read(buffer,{
        type:"array"
    });

    workbook.SheetNames.forEach(nombreHoja=>{

        leerHoja(nombreHoja,workbook.Sheets[nombreHoja]);

    });

}

function leerHoja(nombreHoja,hoja){

    const datos = XLSX.utils.sheet_to_json(hoja,{
        header:1,
        defval:""
    });

    // fila donde empiezan los evaluadores
    for(let fila=4;fila<datos.length;fila++){

        let evaluador=datos[fila][1];

        if(!evaluador) continue;

        evaluador=evaluador.toString().trim();

        for(let columna=4;columna<datos[fila].length;columna++){

            let actividad=datos[fila][columna];

            if(!actividad) continue;

            actividad=actividad.toString().trim();

            if(actividad=="") continue;

            if(ignorar.includes(actividad.toUpperCase())) continue;

            let dia=datos[2][columna];

            if(!dia) continue;

            let tipo="EVALUACIÓN";
            let oi=actividad;

            if(actividad.toUpperCase().startsWith("TEST.")){

                tipo="TESTIFICACIÓN";

                oi=actividad.substring(5).trim();

            }

            if(actividad.toUpperCase().startsWith("POSIBLE TEST.")){

                tipo="POSIBLE TESTIFICACIÓN";

                oi=actividad.substring(14).trim();

            }

            baseDatos.push({

                mes:nombreHoja,

                dia:dia,

                evaluador:evaluador,

                tipo:tipo,

                oi:oi

            });

        }

    }

}
