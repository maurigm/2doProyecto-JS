// imagen de carga de pagina

let container = document.getElementById('container');
setTimeout(function(){
    container.classList.add('cerrar')
}, 2000);

// ----------------------------------------elementos DOM------------------------------------------- 
const contenedorCards = document.getElementById("contenedorCards");
const selectorCategoria = document.getElementById("selectorCategoria");
const ordenarPrecio = document.getElementById("ordenarPrecio");
const busqueda = document.getElementById("busqueda");
const modalBusqueda = document.getElementById("modalBusqueda");
const inputBusqueda = document.getElementById("inputBusqueda");


//--------------------------------------elementos LocalStorage-------------------------------------- 

let listaProductos = JSON.parse(localStorage.getItem("productos"));
let listaCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
let sesion =  localStorage.getItem(`sesion`);


if (listaCarrito === null) {
    listaCarrito = [];
}

if (listaProductos === null) {
    listaProductos = [];
}

if (sesion === null) {
    sesion = "cerrado";
}

// ------------------------------------------Funciones---------------------------------------------- 

// ------------ Crear Cards ------------

const crearCards = (lista) => {
    for (const producto of lista) {
    contenedorCards.innerHTML += `
                <div class="card col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3 my-3 mx-2 p-0 bg-black bg-opacity-75">
                    <div class="card-body text-center text-light movimientoCard">
                        <h4 class="card-title fw-bold">${producto.nombre}</h4>
                        <p class="card-text m-0">$${producto.precio}</p>
                        <p class="card-text fw-bold  m-0">3 cuotas sin interes</p>
                        <p class="card-text   m-0">${(producto.precio)/3}</p>
                    </div>
                    <img src="${producto.imagen}" class="card-img" alt="imagen de ${producto.nombre}">
                    <div class="my-3 mt-5 d-flex justify-content-center">
                        <a class="btn btn-outline-light rounded-pill mx-2" onclick="aniadirAlCarrito(this)" >+ Carrito</a>
                        <a href="/html/detalleProducto.html" class="btn btn-outline-light rounded-pill mx-2" onclick="infoProducto(this)">+ Info</a>
                    </div>
                </div>
    `;  
    }
};




//----------------lista de MAYOR a menor------------

const ListaMayorAMenor = () => {
    let listaNueva = listaProductos;
    listaNueva.sort(function(a,b) {
        return b.precio - a.precio;
      });
    return listaNueva;
}

//----------------lista de menor a MAYOR------------


const ListaMenorAMayor = () => {
    let listaNueva = listaProductos;
    listaNueva.sort(function(a,b) {
        return a.precio - b.precio;
      });
    return listaNueva;
}

//------------ Ordenar precio de MAYOR a menor------------

const ordenarPorPrecio = () => {
    contenedorCards.innerHTML = ``;
    let lista;
    if (ordenarPrecio.value === "mayoramenor") {
        lista = ListaMayorAMenor();
        crearCards(lista);
    } else if (ordenarPrecio.value === "menoramayor") {
        lista = ListaMenorAMayor();
        crearCards(lista);
    }
};

//------------ Mostrar categoria------------

const filtrarCategorias = () => {
    const productosFiltrados = listaProductos.filter(function(producto) {
        return producto.categoria === selectorCategoria.value ;
    });
    return productosFiltrados;
}

const mostrarCategoria = () => {
    let listaNueva = listaProductos;

    contenedorCards.innerHTML = ``;
    if (selectorCategoria.value !== "Ver todos los productos" ) {
        listaNueva = filtrarCategorias();
    }
    crearCards(listaNueva);
}




//------------ Añadir al carrito: cada vez que se aprieta el boton se suma uno en la cantidad;

const almacenarDatos = (nombreP , precioP) => {
    let existe = 0;
    
    for (const producto of listaCarrito) {
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
        listaCarrito.push(elemento);
    }
    let listaCarritoString = JSON.stringify(listaCarrito);
    localStorage.setItem("productosCarrito", listaCarritoString);
}

const aniadirAlCarrito = (e) => {
    
   if (sesion === "cerrado" ) {
       alert(`Para añadir productos al carrito debe iniciar sesion`)
   } else {
        let nombreAAgregar = e.parentElement.previousElementSibling.previousElementSibling.children[0].innerHTML;
        let precioAAgregarString = e.parentElement.previousElementSibling.previousElementSibling.children[1].innerHTML;
        let precioAAgregar = parseInt(precioAAgregarString.replace("$", "")) 
        
        almacenarDatos (nombreAAgregar , precioAAgregar);
   }
};



// --------------- Crear cards modal busqueda ---------------------


const crearCardsModal = (lista) => {
    modalBusqueda.innerHTML = ``;

    
        
        for (const producto of lista) {
            modalBusqueda.innerHTML += `
                            <div class=" bg-dark bg-opacity-50 card mb-3">
                                <div class="row g-0 d-flex align-items-center justify-content-around">
                                    <div class="col-md-6">
                                        <img src="${producto.imagen}" class="img-fluid rounded-start" alt="...">
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




// --------------- Almacenar datos del prod en el LS para el detalle producto------------



const infoProducto = (e) => {
    let infoProductoNombre = e.parentElement.previousElementSibling.previousElementSibling.children[0].innerHTML;

    let infoProductoNombreString = JSON.stringify(infoProductoNombre);
    localStorage.setItem("infoProducto", infoProductoNombreString);
}

const infoProductoBuscado = (e) => {
    let infoProductoNombre = e.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    
    let infoProductoNombreString = JSON.stringify(infoProductoNombre);
    localStorage.setItem("infoProducto", infoProductoNombreString);    
}


// -------------------------------------------Eventos----------------------------------------------- 


document.addEventListener("DOMContentLoaded", () => {
    if (listaProductos.length == 0) {
        contenedorCards.innerHTML += `<h2 class="text-center text-white fw-bold">No hay productos para mostrar aun, estamos trabajando en eso!
                        </h2>`
    } else {
        crearCards(listaProductos);
    }
});

selectorCategoria.addEventListener('change', mostrarCategoria );

ordenarPrecio.addEventListener('change', ordenarPorPrecio );

busqueda.addEventListener("click", (e) => {
    e.preventDefault();
    buscarProductos();
})