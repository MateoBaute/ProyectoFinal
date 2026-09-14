function cargarPagina(ruta) {
  contenido.innerHTML = `Cargando...`;

  fetch(ruta)
    .then((respuesta) => respuesta.text())
    .then((html) => {
      contenido.innerHTML = html;
    })
    .catch((error) => {
      // si el archivo no existe o falla la red
      contenido.innerHTML = `Error: ${error.message}`;
    });
}
enlace.addEventListener("click", (evento) => {
  evento.preventDefault();             // no navegar
  cargarPagina(enlace.dataset.pagina); // pedir y pintar
}); 