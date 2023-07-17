

const botonAgregar = document.getElementById('add-product-btn');
const modal = document.getElementById('add-product-modal');
const botonCerrar = document.getElementsByClassName('close')[0];
const aniadir = document.getElementById('add-product-form');
const tablaProductos = document.getElementById('product-list');
const inputCodigo = document.getElementById('product-code');
const inputNombre = document.getElementById('product-name');
const inputPrecio =   document.getElementById('product-price');
const inputImagen = document.getElementById('insert-image');
const inputStock = document.getElementById('product-stock');
const inputCategoria = document.getElementById("selectorCategoria");


// Variable para almacenar los productos
let productos  = JSON.parse(localStorage.getItem("productos"));

if (productos == null){
  productos = []
}

// Variable para mantener el modo de edición
let editar = false;
let filaEditar = null;

// Función para generar un código único
function generarCodigo() {
    let codigo = '';
    do {
      codigo = 'PROD-' + Math.random().toString(36).substr(2, 9);
    } while (productos.find(obj => obj.id === codigo));
    return codigo;
}

// Función para mostrar el modal de añadir producto
function mostrarModal() {
    inputCodigo.value = generarCodigo();
    inputCodigo.setAttribute('readonly', true);
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    modal.style.display = 'none';
    limpiarFormulario();
    resetearEditar();
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    inputNombre.value = '';
    inputPrecio.value = '';
    inputImagen.value = '';
    inputStock.value = '';
    inputCategoria.value = 'Seleccionar categoria';
}

// Función para activar el modo edición
function activarModoEditar(row) {
    editar = true;
    filaEditar = row;
  
    inputCodigo.value = row.cells[0].innerHTML;
    inputNombre.value = row.cells[1].innerHTML;
    inputPrecio.value = row.cells[2].innerHTML;
    inputImagen.value = row.cells[3].innerHTML;
    inputStock.value = row.cells[4].innerHTML;
    inputCategoria.value = row.cells[5].innerHTML

    modal.style.display = 'block';
}

// Función para desactivar el modo edición
function resetearEditar() {
    editar = false;
    filaEditar = null;
}

// Función para agregar o editar un producto
function agregarOEditar(event) {
    event.preventDefault();
  
    const productoCodigo = inputCodigo.value;
    const productoNombre = inputNombre.value;
    const productoPrecio = inputPrecio.value;
    const productoImagen = inputImagen.value;
    const productoStock = inputStock.value;
    const productoCategoria = inputCategoria.value;
  
    if (productoCategoria == "Seleccionar categoria") {
      alert(`No te olvides de seleccionar la categoria del producto!`)
    } else {
      if (editar) {
  
          filaEditar.cells[0].innerHTML = productoCodigo; 
          filaEditar.cells[1].innerHTML = productoNombre; 
          filaEditar.cells[2].innerHTML = productoPrecio; 
          filaEditar.cells[3].innerHTML = productoImagen; 
          filaEditar.cells[4].innerHTML = productoStock;
          filaEditar.cells[5].innerHTML = productoCategoria; 
    
          almacenarProductoEditado(productoCodigo, productoNombre , productoPrecio, productoImagen, productoStock,productoCategoria)
  
          resetearEditar();
    
          alert('El producto ha sido editado correctamente.');
  
      } else {
        
        crearFila(productoCodigo, productoNombre, productoPrecio, productoImagen, productoStock, productoCategoria);
    
        nuevoProducto(productoCodigo, productoNombre, productoPrecio, productoImagen, productoStock , productoCategoria);
    
        alert('El producto ha sido agregado correctamente.');
      }
    
      limpiarFormulario();
      cerrarModal();
    }
}


function crearFila(a,b,c,d,e,f) {
  const newRow = tablaProductos.insertRow();
  
  const celdaCodigo = newRow.insertCell(0);
  const celdaNombre = newRow.insertCell(1);
  const celdaPrecio = newRow.insertCell(2);
  const celdaImagen = newRow.insertCell(3);
  const celdaStock = newRow.insertCell(4);
  const celdaCategoria = newRow.insertCell(5);
  
  celdaCodigo.innerHTML = a;      
  celdaNombre.innerHTML = b;      
  celdaPrecio.innerHTML = c;
  celdaImagen.innerHTML = d;      
  celdaStock.innerHTML = e;
  celdaCategoria.innerHTML = f;

  const celdaBotones = newRow.insertCell(6);
  celdaBotones.innerHTML = `
  <button class="btn btn-outline-warning btn-sm" onclick="activarModoEditar(this.parentNode.parentNode)">Editar</button>
  <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(this.parentNode.parentNode)">Eliminar</button>
  <span class="favorite-btn" onclick="favorito(this)">&#9734;</span>
  `;
}

// Función para eliminar un producto
function eliminarProducto(row) {
  const coincidencia = row.cells[0].innerHTML;
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
  if (confirmacion) {
    row.remove();
    let index =-1;

      for (const i in productos) {
        if (productos[i].id == coincidencia){
          index = i;
        }
      }

      productos.splice(index, 1);
      let productosString = JSON.stringify(productos)
      localStorage.setItem("productos", productosString);

      alert('El producto ha sido eliminado correctamente.');
    }
}

// Función para agregar o quitar un producto de favoritos
function favorito(span) {
  span.classList.toggle('active');
}



// Agregar el evento de clic al botón "Añadir Producto"
botonAgregar.addEventListener('click', mostrarModal);

// Agregar el evento de clic al botón de cerrar del modal
botonCerrar.addEventListener('click', cerrarModal);

// Agregar el evento de clic fuera del modal para cerrarlo
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    cerrarModal();
  }
});

// Agregar el evento submit al formulario de añadir producto
aniadir.addEventListener('submit', agregarOEditar);

// tabla con los productos del local storage
document.addEventListener("DOMContentLoaded", () => {
  tablaInicio();
})

const tablaInicio = () => {
  for (const producto of productos) {
    const newRow = tablaProductos.insertRow();

    const celdaCodigo = newRow.insertCell(0);
    const celdaNombre = newRow.insertCell(1);
    const celdaPrecio = newRow.insertCell(2);
    const celdaImagen = newRow.insertCell(3);
    const celdaStock = newRow.insertCell(4);
    const celdaCategoria =  newRow.insertCell(5);

    celdaCodigo.innerHTML = producto.id;
    celdaNombre.innerHTML = producto.nombre;
    celdaPrecio.innerHTML = producto.precio;
    celdaImagen.innerHTML = producto.imagen;
    celdaStock.innerHTML = producto.stock;
    celdaCategoria.innerHTML = producto.categoria;


    const celdaBotones = newRow.insertCell(6);
    celdaBotones.innerHTML = `
    <button class="btn btn-outline-warning btn-sm my-1" onclick="activarModoEditar(this.parentNode.parentNode)">Editar</button>
    <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(this.parentNode.parentNode)">Eliminar</button>
    <span class="favorite-btn" onclick="favorito(this)">&#9734;</span>
    `;
  }
}




// Funcion para almacenar nuevos productos
const nuevoProducto = (idProducto, nombreProducto, precioProducto, imagenProducto, stockProducto, productoCategoria) =>{
  const nuevo = {
    id: idProducto,
    nombre: nombreProducto,
    precio: precioProducto,
    imagen: imagenProducto,
    stock: stockProducto,
    categoria : productoCategoria,
  };
  productos.push(nuevo);

  let productosString = JSON.stringify(productos)
  localStorage.setItem("productos", productosString);
}


// Funcion para almacenar productos editados
const almacenarProductoEditado = (idProducto, nombreProducto, precioProducto, imagenProducto, stockProducto, productoCategoria) =>{

  for (const producto of productos) {
    if (producto.id == idProducto){
      producto.nombre = nombreProducto;
      producto.precio = precioProducto;
      producto.imagen = imagenProducto;
      producto.stock = stockProducto;
      producto.categoria = productoCategoria;
    }
  }

  let productosString = JSON.stringify(productos)
  localStorage.setItem("productos", productosString);
}