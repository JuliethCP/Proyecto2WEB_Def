document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const productId = event.target.getAttribute('data-id');
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

    // Mostrar mensaje de éxito con SweetAlert2
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito correctamente!',
        showConfirmButton: false,
        timer: 2000 // Cerrar automáticamente después de 2 segundos
    });
}