//este archivo unifica las funciones de persistencia del carrito
// en el localStorage (en formato JSON)
//TODO LO QUE GUARDO EN LOCALSTORGAE ES EN JSON -TEXTO PLANO -
 
const KEY = "carrito";

//lleva parametro para recibir información y cargarlo al localStorge
export const guardarCarrito = (carrito) => {
    //Convertimos a json antes de guardar con stringify
    localStorage.setItem(KEY,JSON.stringify(carrito));
};

export const obtenerCarrito = () => {
    //convertimos a js para obtener los datos con parse
    return JSON.parse(localStorage.getItem(KEY)) || [];
    //ESTA FUNCION ME RETORNA LA INFO QUE TIENE CARGADA EN EL LOCAL STORAGE
    //SI NO HAY NADA, ME DARA 'UNDEFINED' Y ENTONCES LO GUARDO COMO ARRAY VACIO USANDO EL OR []
};

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY);
    //PARA ELIMINAR LO QUE HAYA EN CARRITO DEL LOCALSTORAGE
};