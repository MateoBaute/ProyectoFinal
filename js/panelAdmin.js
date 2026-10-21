document.addEventListener("DOMContentLoaded", fetchRutinas);

function setActiveSection(section) {
    document.querySelectorAll(".sidebar-nav button").forEach(button => {
        button.classList.toggle("active", button.dataset.section === section);
    });
}

function fetchRutinas() {
    setActiveSection("rutinas");
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=obtener_rutinas`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            rutinas = data;
            console.log(rutinas);
            mostrarRutinas(rutinas);
        });
}


function mostrarRutinas(rutinas) {

    const contenedor = document.getElementById("contenidoPanelAdmin");
    contenedor.innerHTML = "";

    rutinas.forEach(rutina => {
        const card = document.createElement("div");

        let listaEjercicios = "";

        for (let i = 1; i <= 5; i++) {
            const nombreEjercicio = rutina[`ejercicio${i}`];
            const series = rutina[`series${i}`];
            const reps = rutina[`reps${i}`];

            if (nombreEjercicio) {
                listaEjercicios += `<li>${nombreEjercicio}: ${series} series de ${reps} repeticiones</li>`;
            }
        }

        card.innerHTML = `
            <h2>${rutina.nombre}</h2>
            <p>${rutina.nivel}</p>
            <ul>
                ${listaEjercicios}
            </ul>
            <button onclick="eliminarRutina(${rutina.id})">Eliminar</button>
        `;
        contenedor.appendChild(card);
    });
}

function eliminarRutina(id) {
    //lógica de eliminar Rutina
    alert(`Se eliminará la rutina con ID: ${id}`);
}


function fetchProductos() {
    setActiveSection("productos");
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=obtener_productos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data;
            console.log(productos);
            mostrarProductos(productos);
        });
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenidoPanelAdmin");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");

        let listaProductos = "";

        for (let i = 1; i <= 5; i++) {
            const nombreProducto = producto[`producto${i}`];
            const cantidad = producto[`cantidad${i}`];

            if (nombreProducto) {
                listaProductos += `<li>${nombreProducto}: ${cantidad}</li>`;
            }
        }

        card.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <ul>
                ${listaProductos}
            </ul>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedor.appendChild(card);
    });
}

function eliminarProducto(id) {
    //Lógica de eliminar producto
    alert(`Se eliminará el producto con ID: ${id}`);
}

function fetchUsuarios() {
    setActiveSection("usuarios");
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=obtener_usuarios`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            usuarios = data;
            mostrarUsuarios(usuarios);
        });
}

function mostrarUsuarios(usuarios) {
    const contenedor = document.getElementById("contenidoPanelAdmin");
    contenedor.innerHTML = "";
    
    if(usuarios.length === 0) {
        contenedor.innerHTML = "<p>No hay usuarios disponibles.</p>";
        return;
    }
    
    usuarios.forEach(usuario => {
        if (usuario.cv  && !usuario.admin) { 
            const card = document.createElement("div");
            card.innerHTML = `
                <h2>${usuario.nombre}</h2>
                <p>${usuario.email}</p>
                <p>Descripción: ${usuario.description || "No disponible"}</p>
                <p>CV Link: ${usuario.cv}</p>
                <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
            `;
            contenedor.appendChild(card);
        }
    });
}


function eliminarUsuario(id) {
    //Lógica de eliminar usuario
    alert(`Se eliminará el usuario con ID: ${id}`);
}