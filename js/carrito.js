

let productosCarritoAlmacenados = [];

class Productos {
    constructor(nombre, precio, cantidad=1,){
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}


let remera = new Productos("Remera",200);
productosCarritoAlmacenados.push(remera);
let ambo = new Productos("Ambo",800);
productosCarritoAlmacenados.push(ambo);
let pantalon = new Productos("Pantalon",400);
productosCarritoAlmacenados.push(pantalon);
let campera = new Productos("Campera",600);
productosCarritoAlmacenados.push(campera);


const productosAlmacenarString = JSON.stringify(productosCarritoAlmacenados);

localStorage.setItem("productosCarrito", productosAlmacenarString);


// AQUI COMIENZA EL CODIGO DEL CARRITO

let listaCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
console.log(listaCarrito);

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
    }
}

const borrar = (e) => {

    let coincidencia = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let productoABorrar = listaCarrito.findIndex(obj => obj.nombre === coincidencia);
    listaCarrito.splice(productoABorrar, 1);

    e.parentElement.parentElement.remove();
    tabla.deleteRow((tabla.rows).length-1);
    crearPieDeTabla();
    console.log(listaCarrito);
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

const almacenar = (e) => {
    let listaCarritoString = JSON.stringify(listaCarrito)
    console.log(listaCarritoString);
    localStorage.setItem("productosCarrito", listaCarritoString);
}

console.log(listaCarrito);
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






