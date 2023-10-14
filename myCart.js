//myCart.js
// Obtener el carrito de compras desde el sessionStorage
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Obtener el elemento UL para mostrar los productos en el carrito
const carritoLista = document.getElementById('carrito-lista');

// Iterar sobre los productos en el carrito y mostrarlos
carrito.forEach(function(producto) {
    const li = document.createElement('li');
    li.textContent = producto.nombre + ' - Precio: $' + producto.precio;
    carritoLista.appendChild(li);
});
