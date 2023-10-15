// Obtener el carrito de compras desde el sessionStorage
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Obtener el elemento tbody de la tabla para mostrar los productos en el carrito
const carritoTabla = document.getElementById('carrito-tabla');

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



// Función para agregar una fila de producto al carrito
function agregarFilaAlCarrito(product, slNo) {
    const row = carritoTabla.insertRow(carritoTabla.rows.length);
    console.log('Agregando fila al carrito:', product.id);
    row.className = `rem${slNo}`;
    row.setAttribute('data-id', product.id); // Asignar el ID del producto a la fila
    row.innerHTML = `
        <td>${slNo}</td>
        <td><img src="${product.imagenes[0]}" alt="${product.nombre}" width="50"></td>
        <td>${product.cantidad}</td>
        <td>${product.nombre}</td>
        <td>$${product.precio.toFixed(2)}</td>
        <td><button class="btn btn-danger btnDelete" data-id="${product.id}">Eliminar</button></td>

    `;
}

// Agregar filas al carrito
carrito.forEach(async function(productoIdObj, index) {
    // Convierte el ID almacenado como objeto a número antes de buscar el producto
    const producto = await buscarProductoPorId(productoIdObj);

    if (producto) {
        agregarFilaAlCarrito(producto, index + 1);
    }
});
// Obtener todos los botones "Eliminar" en el carrito
const deleteButtons = document.querySelectorAll(".btnDelete");

// Agregar un manejador de eventos a cada botón "Eliminar"
deleteButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productId = parseInt(button.getAttribute('data-id'));

        // Eliminar el producto del carrito almacenado en el sessionStorage
        carrito = carrito.filter(productoIdObj => productoIdObj.id !== productId);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        // Eliminar la fila de la tabla en el DOM
        const row = button.closest('tr');
        if (row) {
            row.remove();
        }

        // Actualizar los números de las filas
        actualizarNumerosDeFilas();
    });
});

// Función para actualizar los números de las filas en la tabla
function actualizarNumerosDeFilas() {
    const filas = carritoTabla.querySelectorAll('tr');
    filas.forEach((fila, index) => {
        fila.querySelector('td:first-child').textContent = (index + 1).toString();
        fila.classList.remove('rem' + (index + 1));
        fila.classList.add('rem' + (index + 1));
    });
}
