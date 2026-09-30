addEventListener("DOMContentLoaded", mostrarProductos);

const productos = [
    {
        id: 1,
        nombre: "Producto 1",
        descripcion: "Descripción del producto 1",
        precio: 19.99,
    },
    {
        id: 2,
        nombre: "Producto 2",
        descripcion: "Descripción del producto 2",
        precio: 29.99,
    },
    {
        id:3,
        nombre: "Producto 3",
        descripcion: "Descripción del producto 3",
        precio: 39.99,
    },
    {
        id: 4,
        nombre: "Producto 4",
        descripcion: "Descripción del producto 4",
        precio: 49.99,
    }
]

function mostrarProductos() {
    const contenedorProductos = document.getElementById("contenedor-productos");
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="comprarProducto(${producto.id})">Comprar</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
}

function comprarProducto(idProducto) {
    if(!confirm("¿Estás seguro de que deseas comprar este producto?")) {
        return;
    }
    const producto = productos.find(prod => prod.id === idProducto);
    if(producto) {
        alert(`Has comprado: ${producto.nombre} por $${producto.precio.toFixed(2)}`);
    }
}

function fetchProductos() {
    fetch('http://localhost/ProyectoFinal/backend/index.php?action=productos')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const productos = data.productos;
                const contenedorProductos = document.getElementById("contenedor-productos");
                productos.forEach(producto => {
                    const productoDiv = document.createElement("div");
                    productoDiv.innerHTML = `
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                        <button onclick="comprarProducto(${producto.id})">Comprar</button>
                    `;
                    contenedorProductos.appendChild(productoDiv);
                });
            }
        });
}