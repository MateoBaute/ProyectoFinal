document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || !user.admin) { 
        alert("Acceso denegado. Debes ser un administrador para acceder a esta página.");
        setTimeout(() => {
            window.location.href = "index.html";
        },100);
    }else{
        fetchRutinas();
    }
});


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
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = "";

    const contenedorBoton = document.getElementById("btns");
    contenedorBoton.innerHTML = "";
    const btnAgregarRutina = document.createElement("button");
    btnAgregarRutina.textContent = "Agregar Rutina";
    btnAgregarRutina.classList.add("btn-admin");
    contenedorBoton.appendChild(btnAgregarRutina);

    btnAgregarRutina.addEventListener("click", agregarRutina);


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

function agregarRutina() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("routine-dialog");

    const ejercicios = Array.from({ length: 5 }, (_, index) => {
        const numero = index + 1;
        return `
            <fieldset>
                <legend>Ejercicio ${numero}</legend>
                <label>
                    Nombre
                    <input name="ejercicio${numero}" type="text" maxlength="45" required>
                </label>
                <label>
                    Series
                    <input name="series${numero}" type="number" min="1" required>
                </label>
                <label>
                    Repeticiones
                    <input name="reps${numero}" type="number" min="1" required>
                </label>
            </fieldset>
        `;
    }).join("");

    dialog.innerHTML = `
        <form class="routine-form">
            <h2>Nueva rutina</h2>
            <label>
                Nombre de la rutina
                <input name="nombre" type="text" maxlength="45" required>
            </label>
            <label>
                Nivel
                <input name="nivel" type="text" maxlength="45" required>
            </label>
            ${ejercicios}
            <p class="form-message" role="alert" aria-live="polite"></p>
            <div class="form-actions">
                <button class="btn-cancel" type="button">Cancelar</button>
                <button class="btn-admin" type="submit">Guardar rutina</button>
            </div>
        </form>
    `;

    const form = dialog.querySelector("form");
    const mensaje = dialog.querySelector(".form-message");
    const botonCancelar = dialog.querySelector(".btn-cancel");
    const botonGuardar = form.querySelector('button[type="submit"]');

    botonCancelar.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => dialog.remove(), { once: true });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        mensaje.textContent = "";
        botonGuardar.disabled = true;
        botonCancelar.disabled = true;

        const parametros = new URLSearchParams(new FormData(form));
        parametros.set("action", "agregar_rutina");

        try {
            const response = await fetch(`http://localhost/ProyectoFinal/backend/index.php?${parametros}`);
            const data = await response.json();

            if (!response.ok || data !== true) {
                throw new Error(data.error || "No se pudo guardar la rutina.");
            }

            dialog.close();
            fetchRutinas();
        } catch (error) {
            mensaje.textContent = error.message || "Ocurrió un error al guardar la rutina.";
            botonGuardar.disabled = false;
            botonCancelar.disabled = false;
        }
    });

    document.body.appendChild(dialog);
    dialog.showModal();
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
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = "";

    
    const contenedorBoton = document.getElementById("btns");
    contenedorBoton.innerHTML = "";
    const btnAgregarProducto = document.createElement("button");
    btnAgregarProducto.textContent = "Agregar Producto";
    btnAgregarProducto.classList.add("btn-admin");
    contenedorBoton.appendChild(btnAgregarProducto);

    btnAgregarProducto.addEventListener("click", agregarProducto);

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

function agregarProducto() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("routine-dialog");
    dialog.innerHTML = `
        <form class="routine-form">
            <h2>Nuevo producto</h2>
            <label>
                Nombre
                <input name="nombre" type="text" maxlength="45" required>
            </label>
            <label>
                Descripción
                <input name="descripcion" type="text" required>
            </label>
            <label>
                Precio
                <input name="precio" type="number" min="0.01" step="0.01" required>
            </label>
            <label>
                Stock
                <input name="stock" type="number" min="0" step="1" required>
            </label>
            <p class="form-message" role="alert" aria-live="polite"></p>
            <div class="form-actions">
                <button class="btn-cancel" type="button">Cancelar</button>
                <button class="btn-admin" type="submit">Guardar producto</button>
            </div>
        </form>
    `;

    const form = dialog.querySelector("form");
    const mensaje = dialog.querySelector(".form-message");
    const botonCancelar = dialog.querySelector(".btn-cancel");
    const botonGuardar = form.querySelector('button[type="submit"]');

    botonCancelar.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => dialog.remove(), { once: true });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        mensaje.textContent = "";
        botonGuardar.disabled = true;
        botonCancelar.disabled = true;

        const parametros = new URLSearchParams(new FormData(form));
        parametros.set("action", "nuevo_producto");

        try {
            const response = await fetch(`http://localhost/ProyectoFinal/backend/index.php?${parametros}`);
            const data = await response.json();

            if (!response.ok || data !== true) {
                throw new Error(data.error || "No se pudo guardar el producto.");
            }

            dialog.close();
            fetchProductos();
        } catch (error) {
            mensaje.textContent = error.message || "Ocurrió un error al guardar el producto.";
            botonGuardar.disabled = false;
            botonCancelar.disabled = false;
        }
    });

    document.body.appendChild(dialog);
    dialog.showModal();
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
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = "";

    const contenedorBoton = document.getElementById("btns");
    contenedorBoton.innerHTML = "";

    
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
            `;
            contenedor.appendChild(card);
        }
    });
}