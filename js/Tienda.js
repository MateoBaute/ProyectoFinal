addEventListener("DOMContentLoaded", fetchProductos);



function fetchProductos() {
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=obtener_productos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        });
}


function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="comprarProducto(${producto.id})">Comprar</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
}

function comprarProducto(idProducto) {
    if (!confirm("¿Estás seguro de que deseas comprar este producto?")) {
        return;
    }
    const url = 'http://localhost/ProyectoFinal/backend/index.php?action=obtener_productos';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                prods = data;
                let prodFinal = null;
                
                for (let i = 0; i < prods.length; i++) {
                    if (prods[i].id == idProducto) {
                        prodFinal = prods[i];
                        break; 
                    }
                }
                
                if (prodFinal) {
                    alert(`Has comprado: ${prodFinal.nombre} por $${prodFinal.precio}`);
                } else {
                    alert("El producto no existe en la lista.");
                }
            }
        });
}