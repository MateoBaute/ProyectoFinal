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
                    <input id="rutinaEjercicio${numero}" name="ejercicio${numero}" type="text" maxlength="45" required>
                </label>
                <label>
                    Series
                    <input id="rutinaSeries${numero}" name="series${numero}" type="number" min="1" required>
                </label>
                <label>
                    Repeticiones
                    <input id="rutinaReps${numero}" name="reps${numero}" type="number" min="1" required>
                </label>
            </fieldset>
        `;
    }).join("");

    dialog.innerHTML = `
        <form class="routine-form">
            <h2>Nueva rutina</h2>
            <label>
                Nombre de la rutina
                <input id="rutinaNombre" name="nombre" type="text" maxlength="45" required>
            </label>
            <label>
                Nivel
                <input id="rutinaNivel" name="nivel" type="text" maxlength="45" required>
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

    form.addEventListener("submit", event => {
        event.preventDefault();
        mensaje.textContent = "";
        botonGuardar.disabled = true;
        botonCancelar.disabled = true;

        const nombre = document.getElementById("rutinaNombre").value;
        const nivel = document.getElementById("rutinaNivel").value;
        const ejercicio1 = document.getElementById("rutinaEjercicio1").value;
        const series1 = document.getElementById("rutinaSeries1").value;
        const reps1 = document.getElementById("rutinaReps1").value;
        const ejercicio2 = document.getElementById("rutinaEjercicio2").value;
        const series2 = document.getElementById("rutinaSeries2").value;
        const reps2 = document.getElementById("rutinaReps2").value;
        const ejercicio3 = document.getElementById("rutinaEjercicio3").value;
        const series3 = document.getElementById("rutinaSeries3").value;
        const reps3 = document.getElementById("rutinaReps3").value;
        const ejercicio4 = document.getElementById("rutinaEjercicio4").value;
        const series4 = document.getElementById("rutinaSeries4").value;
        const reps4 = document.getElementById("rutinaReps4").value;
        const ejercicio5 = document.getElementById("rutinaEjercicio5").value;
        const series5 = document.getElementById("rutinaSeries5").value;
        const reps5 = document.getElementById("rutinaReps5").value;

        const url = `http://localhost/ProyectoFinal/backend/index.php?action=agregar_rutina`
            + `&nombre=${encodeURIComponent(nombre)}`
            + `&nivel=${encodeURIComponent(nivel)}`
            + `&ejercicio1=${encodeURIComponent(ejercicio1)}`
            + `&series1=${encodeURIComponent(series1)}`
            + `&reps1=${encodeURIComponent(reps1)}`
            + `&ejercicio2=${encodeURIComponent(ejercicio2)}`
            + `&series2=${encodeURIComponent(series2)}`
            + `&reps2=${encodeURIComponent(reps2)}`
            + `&ejercicio3=${encodeURIComponent(ejercicio3)}`
            + `&series3=${encodeURIComponent(series3)}`
            + `&reps3=${encodeURIComponent(reps3)}`
            + `&ejercicio4=${encodeURIComponent(ejercicio4)}`
            + `&series4=${encodeURIComponent(series4)}`
            + `&reps4=${encodeURIComponent(reps4)}`
            + `&ejercicio5=${encodeURIComponent(ejercicio5)}`
            + `&series5=${encodeURIComponent(series5)}`
            + `&reps5=${encodeURIComponent(reps5)}`;

        fetch(url)
            .then(response => response.json().then(data => {
                if (!response.ok || data !== true) {
                    throw new Error((data && data.error) || "No se pudo guardar la rutina.");
                }
                return data;
            }))
            .then(() => {
                dialog.close();
                alert("Rutina agregada correctamente.");
                fetchRutinas();
            })
            .catch(error => {
                mensaje.textContent = error.message || "Ocurrió un error al guardar la rutina.";
                botonGuardar.disabled = false;
                botonCancelar.disabled = false;
            });
    });

    document.body.appendChild(dialog);
    dialog.showModal();
}

function eliminarRutina(id) {
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=eliminar_rutina&id=${id}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo eliminar la rutina.");
            }
            return response.json();
        })
        .then(() => {
            alert("Rutina eliminada correctamente.");
            fetchRutinas();
        })
        .catch(error => {
            alert(error.message || "Ocurrió un error al eliminar la rutina.");
        });
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
                <input id="productoNombre" name="nombre" type="text" maxlength="45" required>
            </label>
            <label>
                Descripción
                <input id="productoDescripcion" name="descripcion" type="text" required>
            </label>
            <label>
                Precio
                <input id="productoPrecio" name="precio" type="number" min="0.01" step="0.01" required>
            </label>
            <label>
                Stock
                <input id="productoStock" name="stock" type="number" min="0" step="1" required>
            </label>
            <label>
                Imagen (JPG, PNG, GIF o WEBP; máximo 5 MB)
                <input id="productoImg" name="img" type="file" accept="image/jpeg,image/png,image/gif,image/webp" required>
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

    form.addEventListener("submit", event => {
        event.preventDefault();
        mensaje.textContent = "";
        const imagen = document.getElementById("productoImg").files[0];
        if (!imagen) {
            mensaje.textContent = "Selecciona una imagen para el producto.";
            return;
        }

        botonGuardar.disabled = true;
        botonCancelar.disabled = true;

        const nombre = document.getElementById("productoNombre").value;
        const descripcion = document.getElementById("productoDescripcion").value;
        const precio = document.getElementById("productoPrecio").value;
        const stock = document.getElementById("productoStock").value;
        const datos = new FormData();
        datos.append("nombre", nombre);
        datos.append("descripcion", descripcion);
        datos.append("precio", precio);
        datos.append("stock", stock);
        datos.append("img", imagen);

        fetch("http://localhost/ProyectoFinal/backend/index.php?action=nuevo_producto", {
            method: "POST",
            body: datos
        })
            .then(response => response.json().then(data => {
                if (!response.ok || data !== true) {
                    throw new Error((data && data.error) || "No se pudo guardar el producto.");
                }
                return data;
            }))
            .then(() => {
                dialog.close();
                alert("Producto agregado correctamente.");
                fetchProductos();
            })
            .catch(error => {
                mensaje.textContent = error.message || "Ocurrió un error al guardar el producto.";
                botonGuardar.disabled = false;
                botonCancelar.disabled = false;
            });
    });

    document.body.appendChild(dialog);
    dialog.showModal();
}

function eliminarProducto(id) {
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=eliminar_producto&id=${id}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo eliminar el producto.");
            }
            return response.json();
        })
        .then(() => {
            alert("Producto eliminado correctamente.");
            fetchProductos();
        })
        .catch(error => {
            alert(error.message || "Ocurrió un error al eliminar el producto.");
        });
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