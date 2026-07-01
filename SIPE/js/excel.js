// ============================================
// SIPE
// Lectura del archivo Excel
// ============================================

let baseDatos = [];

const EXCLUIR = [
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

async function cargarPlanificacion() {

    baseDatos = [];

    const respuesta = await fetch("datos/planificacion.xlsx");

    if (!respuesta.ok) {
        throw new Error("No se encontró datos/planificacion.xlsx");
    }

    const buffer = await respuesta.arrayBuffer();

    const libro = XLSX.read(buffer, {
        type: "array"
    });

    libro.SheetNames.forEach(nombreHoja => {

        const hoja = libro.Sheets[nombreHoja];

        const datos = XLSX.utils.sheet_to_json(hoja, {
            header: 1,
            defval: ""
        });

        leerHoja(nombreHoja, datos);

    });

    console.log("Registros encontrados:", baseDatos.length);

}

function leerHoja(mes, datos) {

    // Fila donde empiezan los evaluadores
    for (let fila = 4; fila < datos.length; fila++) {

        let evaluador = datos[fila][1];

        if (!evaluador) continue;

        evaluador = evaluador.toString().trim();

        // Columnas donde están los días
        for (let columna = 4; columna < datos[fila].length; columna++) {

            let actividad = datos[fila][columna];

            if (!actividad) continue;

            actividad = actividad.toString().trim();

            if (actividad === "") continue;

            if (EXCLUIR.includes(actividad.toUpperCase())) continue;

            let dia = datos[2][columna];

            if (!dia) continue;

            let tipo = "EVALUACIÓN";
            let oi = actividad;

            if (actividad.toUpperCase().startsWith("TEST.")) {

                tipo = "TESTIFICACIÓN";

                oi = actividad.substring(5).trim();

            }

            if (actividad.toUpperCase().startsWith("POSIBLE TEST.")) {

                tipo = "POSIBLE TESTIFICACIÓN";

                oi = actividad.substring(14).trim();

            }

            baseDatos.push({

                mes: mes,

                dia: dia,

                evaluador: evaluador,

                tipo: tipo,

                oi: oi

            });

        }

    }

}
