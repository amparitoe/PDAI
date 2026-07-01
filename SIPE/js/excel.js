// ==========================================
// SIPE
// Motor de lectura del Excel
// ==========================================

let baseDatos = [];

async function cargarExcel() {

    const respuesta = await fetch("datos/planificacion.xlsx");

    const buffer = await respuesta.arrayBuffer();

    const workbook = XLSX.read(buffer, {
        type: "array"
    });

    workbook.SheetNames.forEach(nombreHoja => {

        const hoja = workbook.Sheets[nombreHoja];

        const datos = XLSX.utils.sheet_to_json(hoja, {
            header: 1,
            defval: ""
        });

        procesarHoja(nombreHoja, datos);

    });

    console.log("Registros cargados:", baseDatos.length);

}

function procesarHoja(mes, datos){

    // Aquí construiremos el lector del Excel

}

cargarExcel();
