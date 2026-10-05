document.addEventListener("DOMContentLoaded", fetchRutinas);

function fetchRutinas(){
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
    const contenedorRutinas = document.getElementById("contenedor-rutinas");
    contenedorRutinas.innerHTML = "";

    rutinas.forEach(rutina => {
        const card = document.createElement("div");

        // Armamos manualmente los 5 posibles slots de ejercicio
        let listaEjercicios = "";

        for (let i = 1; i <= 5; i++) {
            const nombreEjercicio = rutina[`ejercicio${i}`];
            const series = rutina[`series${i}`];
            const reps = rutina[`reps${i}`];

            // Solo lo mostramos si el slot tiene un ejercicio cargado
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
        `;
        contenedorRutinas.appendChild(card);
    });
}