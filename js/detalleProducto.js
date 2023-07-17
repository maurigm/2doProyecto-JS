


// ----------------------------------------elementos DOM------------------------------------------- 

const contenedorImagen = document.getElementById("contenedorImagen");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const aniadirAlCarrito = document.getElementById("aniadirAlCarrito");
const busqueda = document.getElementById("busqueda");
const modalBusqueda = document.getElementById("modalBusqueda");


//--------------------------------------elementos LocalStorage-------------------------------------- 

let listaProductos = JSON.parse(localStorage.getItem("productos"));
let nombreDeProducto = JSON.parse(localStorage.getItem("infoProducto"));
let iniciarSesion =  localStorage.getItem(`sesion`);
let productoCarrito = JSON.parse(localStorage.getItem("productosCarrito"));

if (productoCarrito === null) {
    productoCarrito = [];
}

if (listaProductos === null) {
    listaProductos = [];
}

if (iniciarSesion === null) {
    iniciarSesion = "cerrado";
}


let objetoProducto ={};

for (const producto of listaProductos) {
    if (producto.nombre == nombreDeProducto) {
        objetoProducto = producto;
    }        
};


//--------------------------------------Carga de pagina-------------------------------------- 

document.addEventListener("DOMContentLoaded", () => {

    nombre.textContent = objetoProducto.nombre;
    precio.textContent = objetoProducto.precio;
    contenedorImagen.innerHTML= `<img src="${objetoProducto.imagen}" class="d-block w-100 rounded-3" alt="imagen de ${objetoProducto.nombre}">`;

});

//------------ Añadir al carrito: cada vez que se aprieta el boton se suma uno en la cantidad;


const almacenarDatos = (nombreP , precioP) => {
    let existe = 0;
    
    for (const producto of productoCarrito) {
        if (producto.nombre === nombreP) {
            producto.cantidad ++;
            existe = 1;
        }
    }
    if (existe == 0) {
        const elemento = {
            nombre : nombreP ,
            precio : precioP,
            cantidad : 1
        }
        productoCarrito.push(elemento);
    }
    let productoCarritoString = JSON.stringify(productoCarrito);
    localStorage.setItem("productosCarrito", productoCarritoString);
};



aniadirAlCarrito.addEventListener("click", () => {
    if (iniciarSesion === "cerrado" ) {
            alert(`Para añadir productos al carrito debe iniciar sesion`)
        } else {
            let nombreAAgregar = objetoProducto.nombre;
            let precioAAgregar = objetoProducto.precio; 
            
            almacenarDatos (nombreAAgregar , precioAAgregar);
        }
} );




// --------------- Crear cards modal busqueda ---------------------


const crearCardsModal = (lista) => {
    modalBusqueda.innerHTML = ``;

    
        
        for (const producto of lista) {
            modalBusqueda.innerHTML += `
                            <div class=" bg-dark bg-opacity-50 card mb-3">
                                <div class="row g-0 d-flex align-items-center justify-content-around">
                                    <div class="col-md-6">
                                        <img src="${producto.imagen}"  class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-5">
                                        <div class="card-body p-0 text-center">
                                            <h5 class="card-title m-0 mt-2 ">${producto.nombre}</h5>
                                            <p class="card-text m-0">Precio</p>
                                            <p class="card-text m-0 fw-bold"> $${producto.precio}</p>
                                            <a href="/html/detalleProducto.html" class="btn btn-outline-light btn-sm rounded-pill mx-2" onclick="infoProductoBuscado(this)">+ Info</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;  
        }
    
};


const buscarProductos = () => {
    let arrayNuevo = [];
    if (inputBusqueda.value.trim() == "") {
        modalBusqueda.innerHTML = `<h3 class="text-center text-black fw-bold">No hay informacion para buscar productos!</h3>`;
    } else {
        for (const prod of listaProductos){
            if(prod.nombre.includes(inputBusqueda.value)){
                arrayNuevo.push(prod)
            }; 
        }
        if (arrayNuevo.length == 0) {
            modalBusqueda.innerHTML = `<h3 class="text-center text-black fw-bold">No se encontro ningun producto, lo sentimos mucho!</h3>`;
        } else {
            crearCardsModal(arrayNuevo);
        }
    }
}

busqueda.addEventListener("click", (e) => {
    e.preventDefault();
    buscarProductos();
})