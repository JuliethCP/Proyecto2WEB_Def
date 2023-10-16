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
                 <input type="number" class="form-control input-cantidad" value="1" min="1" data-id="${product.id}" style="width: 20px; text-align: center;">
            </div>
        </td>
        <td class="align-middle text-center">${product.nombre}</td>
        <td class="align-middle text-center">$${product.precio.toFixed(2)}</td>
        <td class="align-middle text-center"><button class="btn btn-danger btnDelete" data-id="${product.id}">Delete</button></td>
    `;

    mostrarTotal();

    // Actualizar el total cuando cambia la cantidad
    const inputCantidad = row.querySelector('.input-cantidad');
    inputCantidad.addEventListener('input', function () {
        const nuevaCantidad = parseInt(inputCantidad.value);
        const subtotal = product.precio * nuevaCantidad;

        // Actualizar el total basado en todos los subtotales
        total -= product.precio * cantidad;
        total += subtotal;
        cantidad = nuevaCantidad;

        mostrarTotal();
    });

    // Después de agregar el botón "Eliminar", selecciona los botones y agrega manejadores de eventos
    const deleteButtons = row.querySelectorAll(".btnDelete");

    // Dentro de la función para agregar filas al carrito
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute('data-id'); // Obtener el ID como cadena
            console.log('Carrito antes de eliminar:', carrito);

            // Buscar el producto en el carrito
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id === productId) {
                    // Eliminar el producto del carrito
                    const productoEliminado = carrito.splice(i, 1)[0]; // Obtener el producto eliminado
                    break; // Salir del bucle una vez que se encuentra y elimina el producto
                } else {
                    console.log('No se encontró el producto en el carrito:', productId);
                }
            }

            // Actualizar el carrito en el sessionStorage
            sessionStorage.setItem('carrito', JSON.stringify(carrito));

            console.log('Carrito después de eliminar:', carrito);
            row.remove();

            actualizarNumerosDeFilas();
            total -= product.precio * cantidad;

            // Actualizar el total mostrado en la página
            mostrarTotal();
        });
    });
}

function mostrarTotal() {
    const totalElement = document.getElementById('total'); // Utiliza el ID real de tu elemento.
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}


function actualizarSubtotal(input, precio, slNo) {
    input.addEventListener('input', function () {
        const cantidad = parseInt(input.value);
        const subtotal = precio * cantidad;
        const subtotalElement = document.querySelector(`.rem${slNo} .subtotal`);
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        
        // Actualizar el total basado en todos los subtotales
        total = 0;
        const subtotals = carritoTabla.querySelectorAll('.subtotal');
        subtotals.forEach(subtotalElem => {
            total += parseFloat(subtotalElem.textContent.replace('$', ''));
        });

        // Actualizar el total mostrado en la página
        mostrarTotal();
    });
}

// Agregar filas al carrito
carrito.forEach(async function(productoIdObj, index) {
    const producto = await buscarProductoPorId(productoIdObj);

    if (producto) {
        agregarFilaAlCarrito(producto, index + 1);
    }
});


async function actualizarBotonBuy() {
    // Obtener el botón "Buy"
    const buyButton = document.querySelector('.buttonA');
    buyButton.addEventListener('click', async function () {
        // Recorrer el carrito y actualizar el inventario
        console.log('Actualizando inventario...');
        for (const item of carrito) {
            const productoId = item.id;

            // Buscar el producto en el inventario por su ID
            const productoEnInventario = await buscarProductoPorId({ id: productoId });

            if (productoEnInventario) {
                // Obtener la cantidad a comprar desde el campo de input correspondiente
                const inputCantidad = document.querySelector(`.input-cantidad[data-id="${productoId}"]`);
                
                if (inputCantidad) {
                    const cantidadComprada = parseInt(inputCantidad.value);
                    console.log('Cantidad comprada:', cantidadComprada);
                    if (!isNaN(cantidadComprada)) {
                        // Restar la cantidad comprada del inventario
                        productoEnInventario.cantidad -= cantidadComprada;

                        // Actualizar el inventario en el archivo JSON local mediante una solicitud POST
                        const formData = new FormData();
                        formData.append('id', productoId);
                        formData.append('cantidadComprada', cantidadComprada);

                        try {
                            const response = await fetch('actualizar_inventario.php', {
                                method: 'POST',
                                body: formData,
                            });

                            if (response.ok) {
                                console.log('Inventario actualizado con éxito.');
                            } else {
                                console.error('Error al actualizar el inventario.');
                            }
                        } catch (error) {
                            console.error('Error al realizar la solicitud:', error);
                        }
                    } else {
                        console.error('La cantidad a comprar no es un número válido:', inputCantidad.value);
                    }
                } else {
                    console.error('No se encontró el campo de cantidad correspondiente para el producto:', productoId);
                }
            }
        }

        // Limpiar el carrito
        carrito = [];
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar la tabla del carrito y el total
        carritoTabla.innerHTML = '';
        mostrarTotal();
    });
}


actualizarBotonBuy();
