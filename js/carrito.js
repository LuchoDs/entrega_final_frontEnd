import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");
    // 🌟 Capturamos la sección del resumen
    const resumenContainer = document.getElementById("resumen-carrito");

    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";
    resumenContainer.innerHTML = ""; // 🌟 Limpiamos el resumen siempre al empezar

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "Tu carrito está vacío 😶";

        contenedor.appendChild(mensaje);
        return; // Al cortar acá, el resumen queda vacío porque lo limpiamos arriba
    }

    // --- RENDERIZADO DE TARJETAS (Tu código tal cual) ---
    carrito.forEach((producto, index) => {
        const articleProductos = document.createElement("article");
        articleProductos.classList.add("card", "text-dark");

        const imgProducto = document.createElement("img");
        imgProducto.src = `../${producto.imagen}`;
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
            renderizarCarrito();
        });

        articleProductos.appendChild(imgProducto);
        articleProductos.appendChild(tituloProducto);
        articleProductos.appendChild(precioProducto);
        articleProductos.appendChild(botonEliminar);

        contenedor.appendChild(articleProductos);
    });

    // --- 🌟 LÓGICA DEL RESUMEN DE COMPRA 🌟 ---
    
    // 1. Agrupamos los productos repetidos para saber cuántos van de cada uno
    const productosAgrupados = carrito.reduce((acc, prod) => {
        if (!acc[prod.nombre]) {
            acc[prod.nombre] = { cantidad: 0, precio: prod.precio };
        }
        acc[prod.nombre].cantidad += 1;
        return acc;
    }, {});

    // 2. Creamos la caja del resumen
    const divResumen = document.createElement("div");
    divResumen.classList.add("resumen-box");

    const tituloResumen = document.createElement("h3");
    tituloResumen.textContent = "Resumen de Compra";
    divResumen.appendChild(tituloResumen);

    // 3. Iteramos los productos agrupados para armar los "p" de cantidades
    let precioTotal = 0;
    Object.entries(productosAgrupados).forEach(([nombre, detalle]) => {
        const subtotalProducto = detalle.precio * detalle.cantidad;
        precioTotal += subtotalProducto;

        const pProducto = document.createElement("p");
        // Te arma algo como: "2 x Johnnie Walker Double Black ($ 107.800)"
        pProducto.textContent = `${detalle.cantidad} x ${nombre} ($ ${(subtotalProducto).toLocaleString('es-AR')})`;
        divResumen.appendChild(pProducto);
    });

    // 4. Agregamos la línea divisoria y el total general
    const hr = document.createElement("hr");
    divResumen.appendChild(hr);

    const pTotal = document.createElement("p");
    pTotal.classList.add("total-resumen");
    pTotal.innerHTML = `Total: <strong>$ ${precioTotal.toLocaleString('es-AR')}</strong>`;
    divResumen.appendChild(pTotal);

    // 5. Inyectamos todo el bloque armado en el HTML
    resumenContainer.appendChild(divResumen);


    // --- BOTÓN VACIAR (Tu código tal cual) ---
    const btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn","btn-vaciar")
    btnVaciar.textContent = "Vaciar carrito";

    btnVaciar.addEventListener("click", async () => {
        const respuesta = await mostrarMensaje('vaciar');
        if (respuesta) {
            vaciarCarrito();
            renderizarCarrito();
        }
    });

    divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});