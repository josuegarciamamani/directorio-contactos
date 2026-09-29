let contactos = [];

const formulario = document.getElementById("formContacto");
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const buscador = document.getElementById("buscador");
const listaContactos = document.getElementById("listaContactos");
const totalContactos = document.getElementById("totalContactos");
const mensajeVacio = document.getElementById("mensajeVacio");

// Agregar contacto
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombreIngresado = nombre.value.trim();
    const telefonoIngresado = telefono.value.trim();

    if (nombreIngresado === "" || telefonoIngresado === "") {
        return;
    }

    const contacto = {
        nombre: nombreIngresado,
        telefono: telefonoIngresado
    };

    contactos.push(contacto);

    nombre.value = "";
    telefono.value = "";

    mostrarContactos();
    actualizarContador();
});

// Buscar contactos en tiempo real
buscador.addEventListener("input", function() {
    mostrarContactos();
});

// Mostrar contactos
function mostrarContactos() {
    listaContactos.innerHTML = "";

    const textoBusqueda = buscador.value.trim().toLowerCase();
    let contactosMostrados = [];

    for (let i = 0; i < contactos.length; i++) {
        const nombreContacto = contactos[i].nombre.toLowerCase();

        if (nombreContacto.includes(textoBusqueda)) {
            contactosMostrados.push(contactos[i]);
        }
    }

    if (contactosMostrados.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.id = "mensajeVacio";

        if (contactos.length === 0) {
            mensaje.textContent = "Todavía no agregaste contactos.";
        } else {
            mensaje.textContent = "No se encontraron contactos.";
        }

        listaContactos.appendChild(mensaje);
        return;
    }

    for (let i = 0; i < contactosMostrados.length; i++) {
        const contacto = contactosMostrados[i];

        const item = document.createElement("div");
        item.className = "contacto";

        const datos = document.createElement("div");
        datos.className = "datos";

        const nombreElemento = document.createElement("strong");
        nombreElemento.textContent = contacto.nombre;

        const telefonoElemento = document.createElement("span");
        telefonoElemento.textContent = contacto.telefono;

        datos.appendChild(nombreElemento);
        datos.appendChild(telefonoElemento);

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn-eliminar";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";

        // Un event listener para cada botón de eliminar
        botonEliminar.addEventListener("click", function() {
            const posicion = contactos.indexOf(contacto);

            if (posicion !== -1) {
                contactos.splice(posicion, 1);
            }

            mostrarContactos();
            actualizarContador();
        });

        item.appendChild(datos);
        item.appendChild(botonEliminar);
        listaContactos.appendChild(item);
    }
}

// Actualizar el total real de contactos
function actualizarContador() {
    totalContactos.textContent = contactos.length;
}
