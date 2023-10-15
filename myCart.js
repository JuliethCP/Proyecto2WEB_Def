// Obtener el carrito de compras desde el sessionStorage
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Obtener el elemento UL para mostrar los productos en el carrito
const carritoLista = document.getElementById('carrito-lista');

// Función para buscar un producto por ID en el inventario
async function buscarProductoPorId(id) {
    try {
        const response = await fetch('inventario.json'); // Cargar el archivo inventario.json
        const inventario = await response.json();

        // Convertir el ID a número
        const numeroId = parseInt(id, 10);

        // Comprobar si el númeroId es un número válido
        if (!isNaN(numeroId)) {
            // Buscar el producto por número de ID
            const producto = inventario.find(producto => producto.id === numeroId);
            return producto;
        } else {
            console.error('El ID del producto no es un número válido.');
            return null; // Retorna null si el ID no es válido
        }
    } catch (error) {
        console.error('Error al cargar el inventario:', error);
        return null; // Retorna null en caso de error
    }
}

// Crear un array de promesas para buscar productos por ID
const promesas = carrito.map(async productoId => buscarProductoPorId(productoId));

// Esperar a que todas las promesas se completen
Promise.all(promesas)
    .then(resultados => {
        resultados.forEach(producto => {
            if (producto) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${producto.imagenes[0]}" alt="${producto.nombre}" width="50">
                    <span>${producto.nombre} - Precio: $${producto.precio}</span>
                `;
                carritoLista.appendChild(li);
            }
        });
    });
