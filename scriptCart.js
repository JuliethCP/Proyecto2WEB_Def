document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(event) {
    const productId = event.target.getAttribute('data-id');
    const product = {
        id: productId,
        // Otros datos del producto (nombre, precio, etc.)
    };

    // Supongamos que hay una función llamada puedeAgregarAlCarrito(productId)
    // que verifica si el producto puede ser agregado al carrito o no.
    // Esta función debería devolver true si el producto puede ser agregado y false en caso contrario.
    const puedeAgregar = puedeAgregarAlCarrito(productId);

    if (puedeAgregar) {
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        carrito.push(product);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        Swal.fire({
            icon: 'success',
            title: 'Product added to cart successfully!',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        // Si no se puede agregar, mostrar un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Could not add product to cart. Please try again later.',
        });
    }
}

function puedeAgregarAlCarrito(productId) {
    // Lógica para verificar si el producto puede ser agregado al carrito
    // Devuelve true si se puede agregar, false si no se puede agregar
    // Puedes implementar tu propia lógica aquí
    // Por ejemplo, verificar si el producto está en stock, etc.
    return true; // Devuelve true por defecto en este ejemplo
}