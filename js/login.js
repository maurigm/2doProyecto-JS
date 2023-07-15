let adminUser = { email: "ninjaAdmin@gmail.com", contrasena: "Ninja1234" };



let datosUsuariosLog = JSON.parse(localStorage.getItem(`userDatos`));

const inputEmail = document.getElementById("loginUsuario");
const inputContrasena = document.getElementById("loginContrasena");
const botonEnviar = document.getElementById("btnIniciarSesion");


document.getElementById("formularioLog").addEventListener("submit", function (event) {
    event.preventDefault();
    verificarUsuario();
});

// botonEnviar.addEventListener("submit",function (e) {
//     e.preventDefault();
//     verificarUsuario();
// });

function verificarUsuario() {
    let existencia = 0;

    for (const usuario of datosUsuariosLog) {
        if (usuario.email === inputEmail.value) {
            if (usuario.contrasena === inputContrasena.value) { // aqui ingresa el usuario
                alert("ingreso exitoso");


            } else {
                alert("La contraseña del usuario no es correcta")

            }
            existencia = 1;
        }

    }
    if (existencia === 0 ) {
        alert("El usuario no existe")
    }
}




// verificar que los campos esten completados de forma correcta (email,contraseña)

// verificar si las credenciales coinciden

