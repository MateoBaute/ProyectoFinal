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
            <p>Stock: ${producto.stock}</p>
            <button onclick="comprarProducto(${producto.id})">Comprar</button>
        `;
        if (producto.img) {
            const imagen = document.createElement("img");
            imagen.src = `./${producto.img}`;
            imagen.alt = `Imagen de ${producto.nombre}`;
            imagen.classList.add("product-image");
            productoDiv.prepend(imagen);
        }
        contenedorProductos.appendChild(productoDiv);
    });
}

function comprarProducto(idProducto) {
    const userString = sessionStorage.getItem("user");

    if (!userString) {
        alert("Debes iniciar sesión para comprar un producto.");
        return;
    }

    const user = JSON.parse(userString);
    
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
                    const url = `http://localhost/ProyectoFinal/backend/index.php?action=comprar_producto&usuario_id=${user.id}&producto_id=${idProducto}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(resultado => {
                            if (!resultado.success) {
                                alert(resultado.error || "No se pudo completar la compra.");
                                return;
                            }

                            alert(`Muchas Gracias ${user.nombre}! Has comprado: ${prodFinal.nombre} por $${prodFinal.precio}`);
                            fetchProductos();
                        })
                        .catch(() => alert("No se pudo completar la compra. Inténtalo nuevamente."));
                } else {
                    alert("El producto no existe en la lista.");
                }
            }
        })
        .catch(() => alert("No se pudieron cargar los productos. Inténtalo nuevamente."));
}