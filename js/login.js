let sesion =(localStorage.getItem(`sesion`));

if (sesion === null) {
    sesion = "cerrado";
}

let datosUsuariosLog = JSON.parse(localStorage.getItem(`userDatos`));

const inputEmail = document.getElementById("loginUsuario");
const inputContrasena = document.getElementById("loginContrasena");
const botonEnviar = document.getElementById("btnIniciarSesion");
const cerrarSesion = document.getElementById("cerrarSesion");

const administracion = document.getElementById("administracion");

document.getElementById("formularioLog").addEventListener("submit", function (event) {
    verificarUsuario(event);
});

// botonEnviar.addEventListener("submit",function (e) {
//     e.preventDefault();
//     verificarUsuario();
// });

function verificarUsuario(event) {
    let existencia = 0;

    for (const usuario of datosUsuariosLog) {
        if (usuario.email === inputEmail.value) {
            if (usuario.contrasena === inputContrasena.value) { // aqui ingresa el usuario

                comprobacionAdministrador(usuario.administrador);
            } else {
                alert("La contraseña del usuario no es correcta")
                event.preventDefault();
            }
            existencia = 1;
        }

    }
    if (existencia === 0 ) {
        alert("El usuario no existe")
        event.preventDefault();
    }
}

function mostrarLink () {
    administracion.innerHTML = `<a class="nav-link" href="/html/administracion.html">Administracion</a>`
}

function comprobacionAdministrador(valor) {
    if (valor === 0) {
        mostrarLink();
        alert("bienvenido administrador");
        sesion = "abierto administrador"
    }
    else{
        alert("ingreso exitoso");
        sesion = "abierto usuario"
    }
    localStorage.setItem("sesion",sesion)
};

document.addEventListener("DOMContentLoaded", () => {
    if (sesion !== "cerrado") {
        if (sesion === "abierto administrador") {
            administracion.innerHTML = `<a class="nav-link" href="/html/administracion.html">Administracion</a>`
        }
        cerrarSesion.innerHTML = `<a class="nav-link" href="/html/index.html">Cerrar sesion</a>`
    }
})

cerrarSesion.addEventListener("click",()=>{
    sesion = "cerrado"
    localStorage.setItem("sesion",sesion)
})


// evento recarga de pagina controlar si hay inicio de sesion
// si hay inicio de sesion crear link cerrar sesion
// comprobacion si es admin o no




