

// let productosCarritoAlmacenados = [];

// class Productos {
//     constructor(nombre, precio, cantidad=1,){
//         this.nombre = nombre
//         this.precio = precio
//         this.cantidad = cantidad
//     }
// }


// let remera = new Productos("Remera",200);
// productosCarritoAlmacenados.push(remera);
// let ambo = new Productos("Ambo",800);
// productosCarritoAlmacenados.push(ambo);
// let pantalon = new Productos("Pantalon",400);
// productosCarritoAlmacenados.push(pantalon);
// let campera = new Productos("Campera",600);
// productosCarritoAlmacenados.push(campera);


// const productosAlmacenarString = JSON.stringify(productosCarritoAlmacenados);

// localStorage.setItem("productosCarrito", productosAlmacenarString);


// AQUI COMIENZA EL CODIGO DEL CARRITO
let listaProductos = JSON.parse(localStorage.getItem("productos"));
let listaCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
const busqueda = document.getElementById("busqueda");
const modalBusqueda = document.getElementById("modalBusqueda");



if (listaCarrito === null) {
    listaCarrito = [];
}


const tabla = document.getElementById("cuerpoTabla");
const seguirComprando = document.getElementById("seguirComprando")
const vaciarCarrito = document.getElementById("vaciarCarrito")
const pagar = document.getElementById("pagar")

const tablaInicio = () => {
    for (const producto of listaCarrito) {
        tabla.innerHTML += `<tr>
                                <td>${producto.nombre}</td>
                                <td>$${producto.precio}</td>
                                <td class="d-flex justify-content-evenly align-items-center">
                                    <button class="btn btn-danger" onclick = "decremento(this)" type="button">-</button>
                                    <p class="px-2">${producto.cantidad}</p>
                                    <button class="btn btn-success" onclick = "incremento(this)" type="button">+</button>
                                </td>
                                <td>$${(producto.precio*producto.cantidad)}</td>
                                <td>
                                    <button class="btn btn-danger" onclick = "borrar(this)" type="button">Borrar</button>
                                </td>
                            </tr>`;
    }
    crearPieDeTabla();
}

document.addEventListener("DOMContentLoaded", () => {
    if (listaCarrito.length == 0) {
        tabla.innerHTML += `<tr>
                            <td colspan="5">EL CARRITO ESTA VACIO</td>
                        </tr>`
    } else {
        tablaInicio();
    }
})



const crearPieDeTabla = () => {
    tabla.innerHTML += `
                        <tr>
                            <td colspan="3">Total</td>
                            <td>$ ${montoTotal()}</td>
                            <td>-</td>
                        </tr>`
}

const incremento = (e) => {
    let coincidencia = e.parentElement.previousElementSibling.previousElementSibling.textContent;

    let productoAModificar = listaCarrito.find(obj => obj.nombre === coincidencia);
    productoAModificar.cantidad = productoAModificar.cantidad + 1;  

    e.previousElementSibling.textContent = productoAModificar.cantidad;
    e.parentElement.nextElementSibling.textContent = `$ ${productoAModificar.cantidad * productoAModificar.precio}`;
    tabla.deleteRow((tabla.rows).length-1)
    crearPieDeTabla();
    almacenar();
}



const decremento = (e) => {

    let coincidencia = e.parentElement.previousElementSibling.previousElementSibling.textContent;
    let productoAModificar = listaCarrito.find(obj => obj.nombre === coincidencia);

    if (productoAModificar.cantidad > 1) {
        
        productoAModificar.cantidad = productoAModificar.cantidad - 1;
        
        e.nextElementSibling.textContent = productoAModificar.cantidad;
        e.parentElement.nextElementSibling.textContent =`$ ${productoAModificar.cantidad * productoAModificar.precio}`;
        tabla.deleteRow((tabla.rows).length-1)
        crearPieDeTabla();
        almacenar();
    }
}

const borrar = (e) => {

    let coincidencia = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let productoABorrar = listaCarrito.findIndex(obj => obj.nombre === coincidencia);
    listaCarrito.splice(productoABorrar, 1);

    e.parentElement.parentElement.remove();
    tabla.deleteRow((tabla.rows).length-1);
    crearPieDeTabla();
    almacenar();
}


// // recorrer tabla
const montoTotal = () => {
    let total = 0;    
    let rows = tabla.rows;
 
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.cells;
        let cell = cells[3].textContent;
        let valor = "";
        for (const i in cell) {
                if(i != 0)
                valor += cell[i]
            }
        valor = parseInt(valor);
        total += valor; 
    }
    return total;
}

const almacenar = () => {
    let listaCarritoString = JSON.stringify(listaCarrito);
    localStorage.setItem("productosCarrito", listaCarritoString);
}

seguirComprando.addEventListener("click", almacenar);

vaciarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    tabla.innerHTML = `<tr>
                            <td colspan="5">EL CARRITO ESTA VACIO</td>
                        </tr>`;
    listaCarrito = [];
    almacenar();
});

pagar.addEventListener("click", almacenar);





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

busqueda.addEventListener("click", (e) => {
    e.preventDefault();
    buscarProductos();
})
