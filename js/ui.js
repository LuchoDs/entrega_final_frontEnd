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
export const mostrarMensaje = (texto) => {
    alert(texto);
};