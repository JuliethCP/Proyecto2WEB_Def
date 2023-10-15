// Obtener el carrito de compras desde el sessionStorage
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Obtener el elemento UL para mostrar los productos en el carrito
const carritoLista = document.getElementById('carrito-lista');


// Función para buscar un producto por ID en el inventario
async function buscarProductoPorId(idObj) {
    try {
        const response = await fetch('inventario.json'); // Cargar el archivo inventario.json
        const inventario = await response.json();
        
        // Accede al valor 'id' dentro del objeto y conviértelo a número
        const numeroId = parseInt(idObj.id, 10);

        // Comprueba si el númeroId es un número válido
        if (!isNaN(numeroId)) {
            // Buscar el producto por número de ID
            const producto = inventario.find(producto => producto.id === numeroId);
            return producto;
        } else {
            console.error('El ID del producto no es un número válido:', idObj);
        }
    } catch (error) {
        console.error('Error al cargar el inventario:', error);
    }
}

// Iterar sobre los productos en el carrito y mostrarlos
carrito.forEach(async function(productoIdObj) {
    // Convierte el ID almacenado como objeto a número antes de buscar el producto
    const producto = await buscarProductoPorId(productoIdObj);

    if (producto) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${producto.imagenes[0]}" alt="${producto.nombre}" width="50">
            <span>${producto.nombre} - Precio: $${producto.precio}</span>
        `;
        carritoLista.appendChild(li);
    }
});


