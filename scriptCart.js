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

    // Actualizar el carrito en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar el mensaje de confirmación usando un alert
    alert('Producto agregado al carrito correctamente!');

    // Ocultar el alert después de 2 segundos (2000 milisegundos)
    setTimeout(function() {
        // Cerrar el alert (no hay una forma directa de cerrar un alert, por lo que no se puede eliminar, solo esperar el tiempo deseado)
    }, 2000);
}


// Función para limpiar el carrito
//function limpiarCarrito() {
    // Remover el carrito del sessionStorage
  //  sessionStorage.removeItem('carrito');
//}
