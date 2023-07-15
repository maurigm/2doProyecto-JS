let datosUser = JSON.parse (localStorage.getItem("userDatos"));

// let datosAdmin = {nombre:"admin", apellido:"istrador", email: "ninjaAdmin@gmail.com", contrasena: "Ninja1234", administrador:0 };

// datosUser.push(datosAdmin);
// localStorage.setItem('userDatos', JSON.stringify(datosUser));

if (datosUser === null ) {
  datosUser = [];
}


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
    camposError.innerHTML = `<p class="p-3 mb-2 bg-danger text-white rounded-start mt-3 ml-5 mr-5">Porfavor completar todos los campos</p>`;
    return
  }
  else camposError.innerHTML = ""

  if (contrasena !== confirmarContrasena) {
    passError.innerHTML = `<p class="p-3 mb-2 bg-danger text-white rounded-start mt-3 ml-5 mr-5">Las contraseñas no coinciden</p>`;
    return; // Detener la ejecución del código
  }
  else passError.innerHTML = ""

  // verificar si la contraseña cumple con los requisitos
  if (contrasena.length > 5 && contrasena.length < 16 &&
    confirmarContrasena.length > 5 && confirmarContrasena.length < 16) {
  } else {
    passError.innerHTML = `<p class="p-3 mb-2 bg-danger text-white rounded-start mt-3 ml-5 mr-5">Las contraseñas no cumplen con los requisitos</p>`;
    return
  }
  if (Mayuscula.test(contrasena) && Mayuscula.test(confirmarContrasena)) {
    console.log("las contraseñas son validas");
  }
  else return passError.innerHTML = `<p class="p-3 mb-2 bg-danger text-white rounded-start mt-3 ml-5 mr-5">Las contraseñas no cumplen con los requisitos</p>`


  // Crear un objeto con los datos ingresados
  let registro = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    contrasena: contrasena,
    administrador : 1,
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


