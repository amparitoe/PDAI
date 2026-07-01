// ===============================================
// SIPE
// Lector de la planificación
// ===============================================

let baseDatos = [];

const actividadesExcluir = [
    "VACACIONES",
    "CURSO",
    "CAPACITACIÓN",
    "CAPACITACION",
    "PERMISO",
    "FERIADO",
    "REUNIÓN",
    "REUNION",
    "IAAC",
    "ILAC",
    "LICENCIA"
];

async function cargarExcel(){

    baseDatos=[];

    const response=await fetch("datos/planificacion.xlsx");

    const buffer=await response.arrayBuffer();

    const workbook=XLSX.read(buffer,{
        type:"array"
    });

    workbook.SheetNames.forEach(nombreHoja=>{

        const hoja=workbook.Sheets[nombreHoja];

        const datos=XLSX.utils.sheet_to_json(hoja,{
            header:1,
            defval:""
        });

        procesarHoja(nombreHoja,datos);

    });

    console.log(baseDatos);

}

function procesarHoja(mes,datos){

    for(let fila=4;fila<datos.length;fila++){

        const evaluador=datos[fila][1];

        if(!evaluador) continue;

        for(let columna=4;columna<datos[fila].length;columna++){

            let valor=datos[fila][columna];

            if(valor===0) continue;

            if(valor==="") continue;

            valor=String(valor).trim();

            if(valor==="0") continue;

            if(esActividadExcluir(valor)) continue;

            const dia=datos[2][columna];

            if(!dia) continue;

            let tipo="EVALUACIÓN";
            let oi=valor;

            if(valor.toUpperCase().startsWith("TEST.")){

                tipo="TESTIFICACIÓN";

                oi=valor.replace(/TEST\./i,"").trim();

            }

            if(valor.toUpperCase().startsWith("POSIBLE TEST.")){

                tipo="POSIBLE TESTIFICACIÓN";

                oi=valor.replace(/POSIBLE TEST\./i,"").trim();

            }

            baseDatos.push({

                mes,

                dia,

                evaluador,

                tipo,

                oi

            });

        }

    }

}

function esActividadExcluir(texto){

    texto=texto.toUpperCase();

    return actividadesExcluir.some(palabra=>texto.includes(palabra));

}

cargarExcel();
