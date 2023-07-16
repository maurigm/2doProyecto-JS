const addProductBtn = document.getElementById('add-product-btn');
const modal = document.getElementById('add-product-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const addProductForm = document.getElementById('add-product-form');
const productList = document.getElementById('product-list').getElementsByTagName('tbody')[0];

// Variable para mantener el modo de edición
let editMode = false;
let editedRow = null;

// Array para almacenar los códigos de productos existentes
let productCodes = [];

// Función para generar un código único
function generateUniqueCode() {
  let code = '';
  do {
    code = 'PROD-' + Math.random().toString(36).substr(2, 9);
  } while (productCodes.includes(code));
  return code;
}

// Función para mostrar el modal de añadir producto
function showModal() {
  const productCodeInput = document.getElementById('product-code');
  const productCode = generateUniqueCode();
  productCodeInput.value = productCode;
  productCodeInput.setAttribute('readonly', true);
  modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
  modal.style.display = 'none';
  clearForm();
  resetEditMode();
}

// Función para limpiar los campos del formulario
function clearForm() {
  document.getElementById('product-name').value = '';
  document.getElementById('product-price').value = '';
}

// Función para activar el modo edición
function activateEditMode(row) {
  editMode = true;
  editedRow = row;

  const code = row.cells[0].innerHTML;
  const name = row.cells[1].innerHTML;
  const price = row.cells[2].innerHTML;


  document.getElementById('product-code').value = code;
  document.getElementById('product-name').value = name;
  document.getElementById('product-price').value = price;
  showModal();
}

// Función para desactivar el modo edición
function resetEditMode() {
  editMode = false;
  editedRow = null;
}

// Función para agregar o editar un producto
function addOrUpdateProduct(event) {
  event.preventDefault();

  const productCode = document.getElementById('product-code').value;
  const productName = document.getElementById('product-name').value;
  const productPrice = document.getElementById('product-price').value;

  if (editMode) {
    const codeCell = editedRow.cells[0];
    const nameCell = editedRow.cells[1];
    const priceCell = editedRow.cells[2];

    nameCell.innerHTML = productName;
    priceCell.innerHTML = productPrice;

    resetEditMode();

    alert('El producto ha sido editado correctamente.');
  } else {
    const newRow = productList.insertRow();

    const codeCell = newRow.insertCell(0);
    codeCell.innerHTML = productCode;

    const nameCell = newRow.insertCell(1);
    nameCell.innerHTML = productName;

    const priceCell = newRow.insertCell(2);
    priceCell.innerHTML = productPrice;

    const actionsCell = newRow.insertCell(3);
    actionsCell.innerHTML = `
    <button class="btn btn-outline-warning btn-sm" onclick="activateEditMode(this.parentNode.parentNode)">Editar</button>
    <button class="btn btn-outline-danger btn-sm" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button>
      <span class="favorite-btn" onclick="toggleFavorite(this)">&#9734;</span>
    `;

    productCodes.push(productCode);

    alert('El producto ha sido agregado correctamente.');
  }

  clearForm();
  closeModal();
}

// Función para eliminar un producto
function removeProduct(row) {
  const codeCell = row.cells[0];
  const code = codeCell.innerHTML;
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
  if (confirmDelete) {
    productList.removeChild(row);
    const index = productCodes.indexOf(code);
    if (index !== -1) {
      productCodes.splice(index, 1);
    }
    alert('El producto ha sido eliminado correctamente.');
  }
}

// Función para agregar o quitar un producto de favoritos
function toggleFavorite(span) {
  span.classList.toggle('active');
}

// Agregar el evento de clic al botón "Añadir Producto"
addProductBtn.addEventListener('click', showModal);

// Agregar el evento de clic al botón de cerrar del modal
closeBtn.addEventListener('click', closeModal);

// Agregar el evento de clic fuera del modal para cerrarlo
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    closeModal();
  }
});

// Agregar el evento submit al formulario de añadir producto
addProductForm.addEventListener('submit', addOrUpdateProduct);

// Agregar 6 productos de ejemplo
addProductRow(generateUniqueCode(), 'Producto 1', '10.00');
addProductRow(generateUniqueCode(), 'Producto 2', '15.00');
addProductRow(generateUniqueCode(), 'Producto 3', '20.00');
addProductRow(generateUniqueCode(), 'Producto 4', '25.00');
addProductRow(generateUniqueCode(), 'Producto 5', '30.00');
addProductRow(generateUniqueCode(), 'Producto 6', '35.00');

// Función para agregar una fila de producto a la tabla
function addProductRow(code, name, price) {
  const newRow = productList.insertRow();

  const codeCell = newRow.insertCell(0);
  codeCell.innerHTML = code;

  const nameCell = newRow.insertCell(1);
  nameCell.innerHTML = name;

  const priceCell = newRow.insertCell(2);
  priceCell.innerHTML = price;

  const actionsCell = newRow.insertCell(3);
  actionsCell.innerHTML = `
    <button class="btn btn-outline-warning btn-sm" onclick="activateEditMode(this.parentNode.parentNode)">Editar</button>
    <button class="btn btn-outline-danger btn-sm" onclick="removeProduct(this.parentNode.parentNode)">Eliminar</button>
    <span class="favorite-btn" onclick="toggleFavorite(this)">&#9734;</span>
  `;
}
