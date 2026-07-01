// ========================================
// SIPE
// Buscador
// ========================================

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

        const coincideMes =
            mes === "" ||
            registro.mes.toUpperCase() === mes;

        const coincideEvaluador =
            evaluador === "" ||
            registro.evaluador.toUpperCase().includes(evaluador);

        return coincideMes && coincideEvaluador;

    });

    mostrarResultados(resultados);

}

function mostrarResultados(resultados) {

    const tabla = document.getElementById("tablaResultados");

    tabla.innerHTML = "";

    if (resultados.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    No se encontraron resultados
                </td>
            </tr>
        `;

        return;

    }

    resultados.forEach(r => {

        tabla.innerHTML += `
            <tr>

                <td>${formatearFecha(r)}</td>

                <td>${r.evaluador}</td>

                <td>${r.oi}</td>

                <td>${r.tipo}</td>

            </tr>
        `;

    });

}

function formatearFecha(r) {

    const meses = {

        ENERO: "01",
        FEBRERO: "02",
        MARZO: "03",
        ABRIL: "04",
        MAYO: "05",
        JUNIO: "06",
        JULIO: "07",
        AGOSTO: "08",
        SEPTIEMBRE: "09",
        OCTUBRE: "10",
        NOVIEMBRE: "11",
        DICIEMBRE: "12"

    };

    return String(r.dia).padStart(2, "0") +
        "/" +
        meses[r.mes] +
        "/2026";

}
