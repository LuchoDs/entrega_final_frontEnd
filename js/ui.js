//PARA FUNCIONES QUE ACTUALIZAN COSAS QUE VE EL USUARIO

//PARA MENSAJES QUE LOS EVENTOS CLICK FUNCIONAN Y HACEN ALGO

//para el número de productos en el carrito
export const actualizarContador = (carrito) => {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = carrito.length;
    }    
};

//Para mostrar mensajes cuando hago click en algun lado
// Para mostrar mensajes dinámicos cuando hacés click en algún lado
// Usamos 'async' porque adentro vamos a esperar (await) respuestas o tiempos de SweetAlert2
export const mostrarMensaje = async (tipo, producto = '') => {
    
    // El diccionario con los datos de diseño de cada alerta
    const configuraciones = {
        agregar: {
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: `¡Agregaste "${producto}" al 🛒!`,
            width: 'auto',
            customClass: {
                popup: 'configuracion-alerta'
            }

        },
        eliminar: {
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'error',
            title: `¡Eliminaste "${producto}" del 🛒! `,
            width: 'auto',
            customClass: {
                popup: 'configuracion-alerta icono-atencion'
            }
           
        },
        vaciar: {
            position: 'top',
            title: '¿Estás seguro/a de vaciar tu carrito?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'No, dejarlo',
            confirmButtonColor: '#e74c3c', // Rojo para vaciar
            cancelButtonColor: '#7c8384',   // Gris para cancelar
            customClass: {
                popup: 'configuracion-alerta icono-atencion pos-icon'
            }
        }
    };

    // Buscamos la configuración en base al tipo (o una por defecto)
    const alertaConfig = configuraciones[tipo] || {
        toast: true,
        position: 'top-end',
        title: 'Actualizando carrito...',
        icon: 'info',
        timer: 1000
    };

    // 'await' frena el código hasta que la alerta termine (por timer o por click)
    const resultado = await Swal.fire({
        ...alertaConfig // Spread operator: desarma el objeto elegido y pasa sus propiedades
    });

    // Si la acción era vaciar, le devolvemos un booleano (true/false) a quien llamó a la función
    if (tipo === 'vaciar') {
        return resultado.isConfirmed; 
    }
};