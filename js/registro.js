let datosUser = [];

let formulario = document.getElementById("registroForm");

const almacenar = () => {
  localStorage.setItem('userDatos', JSON.stringify(datosUser));
}


formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar el envío del formulario por defecto

  // Guardar en variables los values de los input
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("contrasena").value;
  let confirmarContrasena = document.getElementById("confirmarContrasena").value;
  let passError = document.getElementById("passError")
  let camposError = document.getElementById("camposError")
  var Mayuscula = /[A-Z]/;

  if (nombre === "" || apellido === "" || email === "" || contrasena === "" || confirmarContrasena === "") {
    camposError.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Favor de completar todo los campos"}</h6>`;
    return
  }

  if (contrasena !== confirmarContrasena) {
    passError.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Las contraseñas no coinciden"}</h6>`;
    return; // Detener la ejecución del código
  }
  else passError.innerHTML = ""

  // verificar si la contraseña cumple con los requisitos
  if (contrasena.length > 5 && contrasena.length < 16 &&
    confirmarContrasena.length > 5 && confirmarContrasena.length < 16) {
  } else {
    passError.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Las contraseñas no cumplen con los requisitos"}</h6>`;
    return
  }
  if (Mayuscula.test(contrasena) && Mayuscula.test(confirmarContrasena)) {
    console.log("las contraseñas son validas");
  }
  else return passError.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Las contraseñas no cumplen con los requisitos"}</h6>`


  // Crear un objeto con los datos ingresados
  let registro = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    contrasena: contrasena
  };

  // Agregar el objeto al array de registros
  datosUser.push(registro);
  almacenar();
  camposError.innerHTML = `<p class="p-3 mb-2 bg-success text-white rounded-start mt-3 ml-5 mr-5">Usted se ha registrado correctamente</p>`
  // Limpiar el formulario
  formulario.reset();

  // Mostrar los registros en la consola
  console.log(datosUser);
});


