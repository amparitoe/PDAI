window.onload = async () => {

    try {

        await cargarPlanificacion();

        console.log(baseDatos);

    } catch (e) {

        alert(e.message);

    }

};
