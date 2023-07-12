let datosUser = [];

let formulario = document.getElementById("registroForm");

const almacenar = ()=>{
  localStorage.setItem('userDatos', JSON.stringify(datosUser));
}


formulario.addEventListener("submit", function(e) {
  e.preventDefault(); // Evitar el envío del formulario por defecto

  // Guardar en variables los values de los input
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("contrasena").value;
  let confirmarContrasena = document.getElementById("confirmarContrasena").value;


  if (contrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden");
    return; // Detener la ejecución del código
  }

  // Crear un objeto con los datos ingresados
  let registro = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    contrasena: contrasena
  };

  // Agregar el objeto al array de registros
  datosUser.push(registro);
  validarFormulario()
  almacenar();
  // Limpiar el formulario
  formulario.reset();

  // Mostrar los registros en la consola
  console.log(datosUser);
});
