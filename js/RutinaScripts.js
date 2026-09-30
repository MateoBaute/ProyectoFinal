document.addEventListener("DOMContentLoaded", mostrarRutinas);


const rutinas = [
    {
        id: 1,
        nombre: "Rutina de fuerza",
        descripcion: "Rutina enfocada en el desarrollo de la fuerza muscular.",
        ejercicios: [
            { nombre: "Sentadillas", series: 4, repeticiones: 8 },
            { nombre: "Press de banca", series: 4, repeticiones: 8 },
            { nombre: "Peso muerto", series: 4, repeticiones: 8 },
            { nombre: "Dominadas", series: 4, repeticiones: 8 },
            { nombre: "Fondos en paralelas", series: 4, repeticiones: 8 },
        ]
    },
    {
        id: 2,
        nombre: "Rutina de resistencia",
        descripcion: "Rutina enfocada en mejorar la resistencia cardiovascular.",
        ejercicios: [
            { nombre: "Correr en cinta", series: 1, repeticiones: 30 },
            { nombre: "Saltos de cuerda", series: 3, repeticiones: 100 },
            { nombre: "Burpees", series: 3, repeticiones: 15 },
            { nombre: "Plancha", series: 3, repeticiones: 60 },
            { nombre: "Mountain climbers", series: 3, repeticiones: 20 },
        ]
    },
    {
        id: 3,
        nombre: "Rutina de hipertrofia",
        descripcion: "Rutina enfocada en el aumento de masa muscular.",
        ejercicios: [
            { nombre: "Press militar", series: 4, repeticiones: 10 },
            { nombre: "Remo con barra", series: 4, repeticiones: 10 },
            { nombre: "Curl de bíceps", series: 4, repeticiones: 12 },
            { nombre: "Extensiones de tríceps", series: 4, repeticiones: 12 },
            { nombre: "Elevaciones laterales", series: 4, repeticiones: 15 },
        ]
    },
    {
        id: 4,
        nombre: "Rutina de movilidad",
        descripcion: "Rutina enfocada en mejorar la flexibilidad y movilidad articular.",
        ejercicios: [
            { nombre: "Estiramiento de isquiotibiales", series: 3, repeticiones: 30 },
            { nombre: "Estiramiento de cuádriceps", series: 3, repeticiones: 30 },
            { nombre: "Estiramiento de hombros", series: 3, repeticiones: 30 },
            { nombre: "Estiramiento de espalda", series: 3, repeticiones: 30 },
            { nombre: "Estiramiento de cadera", series: 3, repeticiones: 30 },
        ]
    },
    {
    id: 5,
    nombre: "Rutina de tren superior",
    descripcion: "Rutina enfocada en desarrollar la fuerza y masa muscular del tren superior.",
    ejercicios: [
        { nombre: "Press de banca", series: 4, repeticiones: 10 },
        { nombre: "Remo con barra", series: 4, repeticiones: 10 },
        { nombre: "Press militar", series: 3, repeticiones: 12 },
        { nombre: "Curl de bíceps", series: 3, repeticiones: 12 },
        { nombre: "Extensión de tríceps", series: 3, repeticiones: 12 }
    ]
},

{
    id: 6,
    nombre: "Rutina de tren inferior",
    descripcion: "Rutina diseñada para fortalecer y desarrollar piernas y glúteos.",
    ejercicios: [
        { nombre: "Sentadillas", series: 4, repeticiones: 10 },
        { nombre: "Prensa de piernas", series: 4, repeticiones: 12 },
        { nombre: "Peso muerto rumano", series: 3, repeticiones: 10 },
        { nombre: "Extensión de cuádriceps", series: 3, repeticiones: 12 },
        { nombre: "Elevación de talones", series: 4, repeticiones: 15 }
    ]
},

{
    id: 7,
    nombre: "Rutina de abdominales",
    descripcion: "Rutina enfocada en fortalecer el abdomen y mejorar la estabilidad del core.",
    ejercicios: [
        { nombre: "Crunch abdominal", series: 4, repeticiones: 20 },
        { nombre: "Elevación de piernas", series: 3, repeticiones: 15 },
        { nombre: "Plancha", series: 3, repeticiones: 60 },
        { nombre: "Russian twists", series: 3, repeticiones: 20 },
        { nombre: "Mountain climbers", series: 3, repeticiones: 20 }
    ]
},

{
    id: 8,
    nombre: "Rutina de glúteos",
    descripcion: "Rutina enfocada en fortalecer y desarrollar los músculos de los glúteos y las piernas.",
    ejercicios: [
        { nombre: "Hip thrust", series: 4, repeticiones: 12 },
        { nombre: "Sentadilla sumo", series: 4, repeticiones: 10 },
        { nombre: "Patada de glúteo", series: 3, repeticiones: 15 },
        { nombre: "Abducción de cadera", series: 3, repeticiones: 15 },
        { nombre: "Peso muerto rumano", series: 3, repeticiones: 12 }
    ]
},

{
    id: 9,
    nombre: "Rutina de espalda",
    descripcion: "Rutina enfocada en desarrollar la fuerza y musculatura de la espalda.",
    ejercicios: [
        { nombre: "Dominadas", series: 4, repeticiones: 8 },
        { nombre: "Remo con barra", series: 4, repeticiones: 10 },
        { nombre: "Jalón al pecho", series: 3, repeticiones: 12 },
        { nombre: "Remo en polea", series: 3, repeticiones: 12 },
        { nombre: "Face pulls", series: 3, repeticiones: 15 }
    ]
},

{
    id: 10,
    nombre: "Rutina de pecho y tríceps",
    descripcion: "Rutina enfocada en desarrollar la musculatura del pecho y los tríceps.",
    ejercicios: [
        { nombre: "Press de banca", series: 4, repeticiones: 8 },
        { nombre: "Press inclinado", series: 4, repeticiones: 10 },
        { nombre: "Aperturas con mancuernas", series: 3, repeticiones: 12 },
        { nombre: "Fondos", series: 3, repeticiones: 10 },
        { nombre: "Extensión de tríceps", series: 3, repeticiones: 12 }
    ]
},

{
    id: 11,
    nombre: "Rutina de hombros y brazos",
    descripcion: "Rutina enfocada en desarrollar hombros, bíceps y tríceps.",
    ejercicios: [
        { nombre: "Press militar", series: 4, repeticiones: 10 },
        { nombre: "Elevaciones laterales", series: 4, repeticiones: 12 },
        { nombre: "Elevaciones frontales", series: 3, repeticiones: 12 },
        { nombre: "Curl de bíceps", series: 4, repeticiones: 10 },
        { nombre: "Extensión de tríceps", series: 4, repeticiones: 12 }
    ]
},

{
    id: 12,
    nombre: "Rutina de acondicionamiento",
    descripcion: "Rutina enfocada en mejorar la resistencia, coordinación y condición física general.",
    ejercicios: [
        { nombre: "Burpees", series: 4, repeticiones: 15 },
        { nombre: "Saltos de cuerda", series: 4, repeticiones: 100 },
        { nombre: "Mountain climbers", series: 4, repeticiones: 20 },
        { nombre: "Sentadillas con salto", series: 3, repeticiones: 15 },
        { nombre: "Correr en cinta", series: 1, repeticiones: 20 }
    ]
}
   

]


function mostrarRutinas() {
    const contenedorRutinas = document.getElementById("contenedor-rutinas");
    contenedorRutinas.innerHTML = "";

    rutinas.forEach(rutina => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h2>${rutina.nombre}</h2>
            <p>${rutina.descripcion}</p>
            <ul>
                ${rutina.ejercicios.map(ejercicio => `<li>${ejercicio.nombre}: ${ejercicio.series} series de ${ejercicio.repeticiones} repeticiones</li>`).join('')}
            </ul>
        `;
        contenedorRutinas.appendChild(card);
    });
}
