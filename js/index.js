//funciones oara enviar objetos al array
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

//función poara renderizar las tarjetas de productos
//fetch: consulta a traves de http -> dummyjson.com -> trae un objeto, no array
//lo tengo que convertir a array si quiero usar forEach.
//(en este proyecto lo trabajo local de carpeta data que es un array)

const renderizarProductos = () => {
    //accedo al DOM, donde quiero empezar a agregar las cosas
    const divisor = document.getElementById("contenedor-tarjetas");

        fetch("./data/productos.json")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((producto)=> {//*producto* es mi variable iteradora
                    
                    const articleProductos = document.createElement("article");
                    articleProductos.classList.add("card", "text-dark");

                    const imgProducto = document.createElement("img");
                    imgProducto.src = `./${producto.imagen}`;
                    //template string para construir la ruta de imagen
                    imgProducto.alt = producto.nombre;
                    
                    const tituloProducto = document.createElement("h3");
                    tituloProducto.textContent = producto.nombre;

                    const medidaProducto = document.createElement("p");
                    medidaProducto.textContent = producto.medida;

                    const precioProducto = document.createElement("p");
                    precioProducto.textContent = `Precio: $ ${producto.precio.toLocaleString('es-AR')}.-`;

                    const boton = document.createElement("button");
                    boton.classList.add("btn", "bg-secondary", "text-dark");
                    boton.textContent = "Agregar al carrito 🛒";
                    
                    boton.addEventListener("click", () => {
                        agregarAlCarrito(producto);
                    });

                    articleProductos.appendChild(imgProducto);
                    articleProductos.appendChild(tituloProducto);
                    articleProductos.appendChild(medidaProducto);
                    articleProductos.appendChild(precioProducto);
                    articleProductos.appendChild(boton);

                    //agrego todo al div del HTML que tengo preparado
                divisor.appendChild(articleProductos);
                });
            })
            .catch((error) => console.log(error));
};
    
document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});