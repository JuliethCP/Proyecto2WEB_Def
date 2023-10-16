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


// Función para actualizar los números de las filas en la tabla
function actualizarNumerosDeFilas() {
    const filas = carritoTabla.querySelectorAll('tr');
    filas.forEach((fila, index) => {
        fila.querySelector('td:first-child').textContent = (index + 1).toString();
        fila.classList.remove('rem' + (index + 1));
        fila.classList.add('rem' + (index + 1));
    });
}

let total = 0; 
// Función para agregar una fila de producto al carrito
function agregarFilaAlCarrito(product, slNo) {
    const row = carritoTabla.insertRow(carritoTabla.rows.length);
    console.log('Agregando fila al carrito:', product.id);
    row.className = `rem${slNo}`;
    row.setAttribute('data-id', product.id); // Asignar el ID del producto a la fila

    let cantidad = 1;

    // Actualizar el total basado en la cantidad inicial
    total += product.precio * cantidad;

    row.innerHTML = `
        <td class="align-middle text-center">${slNo}</td>
        <td class="align-middle text-center"><img src="${product.imagenes[0]}" alt="${product.nombre}" width="100"></td>
        <td class="align-middle text-center">
            <div class="input-group" >
                 <input type="number" class="form-control" value="1" min="1" style="width: 20px; text-align: center;">
            </div>
        </td>
        <td class="align-middle text-center">${product.nombre}</td>
        <td class="align-middle text-center">$${product.precio.toFixed(2)}</td>
        <td class="align-middle text-center"><button class="btn btn-danger btnDelete" data-id="${product.id}">Delete</button></td>
    `;

    mostrarTotal();

    // Después de agregar el botón "Eliminar", selecciona los botones y agrega manejadores de eventos
    const deleteButtons = row.querySelectorAll(".btnDelete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute('data-id'); // Obtener el ID como cadena
            console.log('Carrito antes de eliminar:', carrito);

            // Buscar el producto en el carrito
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id === productId) {
                    // Eliminar el producto del carrito
                    carrito.splice(i, 1);
                    break; // Salir del bucle una vez que se encuentra y elimina el producto
                } else {
                    console.log('No se encontró el producto en el carrito:', productId);
                }
            }

            // Actualizar el carrito en el sessionStorage
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            console.log('Carrito después de eliminar:', carrito);

            // Eliminar la fila de la tabla en el DOM
            row.remove();

            // Actualizar los números de las filas
            actualizarNumerosDeFilas();
        });
    });
}


function mostrarTotal() {
    const totalElement = document.getElementById('total'); // Utiliza el ID real de tu elemento.
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}


// Función para actualizar el subtotal cuando cambia la cantidad en el input
function actualizarSubtotal(input, precio, slNo) {
    const cantidad = parseInt(input.value);
    const subtotal = precio * cantidad;
    total -= precio * cantidad; // Restar el total anterior
    total += subtotal; // Sumar el nuevo subtotal
    const subtotalElement = document.querySelector(`.rem${slNo} .subtotal`);
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    mostrarTotal();
}

// Agregar filas al carrito
carrito.forEach(async function(productoIdObj, index) {
    // Convierte el ID almacenado como objeto a número antes de buscar el producto
    const producto = await buscarProductoPorId(productoIdObj);

    if (producto) {
        agregarFilaAlCarrito(producto, index + 1);
    }
});



