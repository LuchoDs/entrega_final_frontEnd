import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

//para resetear el carrito localmente cuando elimino un producto, porque sino, hasta 
//no refrescar la pagina, no vería los cambios
//obligo a devolver lo que se actualizó en el localStore
    contenedor.innerHTML = "";
    divAcciones.innerHTML ="";

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "Tu carrito está vacío 😶"

        contenedor.appendChild(mensaje);
        return;//return: usado como cierre de función. (no uso el else del if)
    }
//todo esto es para cuando hay productos:
    carrito.forEach((producto, index)=> {//*producto* es mi variable iteradora
        
        const articleProductos = document.createElement("article");
        articleProductos.classList.add("card", "text-dark");

        const imgProducto = document.createElement("img");
        imgProducto.src = `../${producto.imagen}`;
        //template string para construir la ruta de imagen
        imgProducto.alt = producto.nombre;
        
        const tituloProducto = document.createElement("h3");
        tituloProducto.textContent = producto.nombre;

        const precioProducto = document.createElement("p");
        precioProducto.textContent = `Precio: $ ${producto.precio.toLocaleString('es-AR')}.-`;

        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "bg-secondary", "text-dark", "btn-eliminar");
        botonEliminar.textContent = "Eliminar Producto ❌";
        
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(index);
//una vez eliminado un producto, vuelvo a mostrar desde el localStorage
//resconstruyendo el DOM con las tarjetas que quedan en el carrito del localStorage
            renderizarCarrito();
        });

        articleProductos.appendChild(imgProducto);
        articleProductos.appendChild(tituloProducto);
        articleProductos.appendChild(precioProducto);
        articleProductos.appendChild(botonEliminar);

        //agrego todo al div del HTML que tengo preparado
    contenedor.appendChild(articleProductos);
    });

    const btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn","btn-vaciar")
    btnVaciar.textContent = "Vaciar carrito";

    btnVaciar.addEventListener("click", async () => {
        // Opción de cancelar el vaciado .. funcion confirm.
        const respuesta = await mostrarMensaje('vaciar');

        // Si hay respuesta, vacía y renderiza.
        if (respuesta) {
            vaciarCarrito();
            renderizarCarrito();
        }
        // Si elije "Cancelar", respuesta será false, el if se ignora y no pasa nada
    });

    divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});