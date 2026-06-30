import {guardarCarrito, obtenerCarrito, vaciarCarritoStorage} from "./storage.js";

import {actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();//del localStorage
    carrito.push(producto);

    guardarCarrito(carrito);//en el localStorage
    actualizarContador(carrito);//del localStorage 
    mostrarMensaje("Producto agregado al carrito")  
}

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito();//del localStorage
    carrito.splice(indice , 1);//splice encuentra el valor de indice en el array y eliminará lo que le doy como segundo argumento.
    
    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("Producto eliminado del carrito")
}

export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);//le paso como argumento un array vacío,porque la F(x) la arme con parametro y trabaja con length;
    mostrarMensaje("Has vaciado tu carrito 🥲..");
}