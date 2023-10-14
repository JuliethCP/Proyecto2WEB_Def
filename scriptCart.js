// Event listener para agregar productos al carrito
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

// Event listener para limpiar el carrito al recargar la página
//window.addEventListener('beforeunload', limpiarCarrito);

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    console.log('Agregando producto al carrito');
    const productId = event.target.getAttribute('data-id');
    console.log('ID del producto: ' + productId);
    const product = {
        id: productId,
        // Otros datos del producto (nombre, precio, etc.)
    };

    // Obtener el carrito de compras actual desde el sessionStorage (si existe)
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    carrito.push(product);
    console.log('Carrito de compras: ' + sessionStorage.getItem('carrito'));
    // Actualizar el carrito en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}


// Función para limpiar el carrito
//function limpiarCarrito() {
    // Remover el carrito del sessionStorage
  //  sessionStorage.removeItem('carrito');
//}
