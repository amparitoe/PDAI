window.onload = async function(){

    try{

        await cargarExcel();

        console.log(baseDatos);

        alert("Planificación cargada.\n\nRegistros encontrados: "+baseDatos.length);

    }
    catch(error){

        console.error(error);

        alert(error.message);

    }

}
