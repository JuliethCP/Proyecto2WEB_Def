<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
if (isset($_GET['id'])) {
    $productId = $_GET['id'];
    // Cargar los detalles del producto según el $productId desde tu fuente de datos (por ejemplo, un array de productos)
    $productDetails = obtenerDetallesDelProducto($productId);

    // Convertir los detalles del producto a JSON para que puedan ser pasados como parámetros en la URL
    echo json_encode($productDetails);
} else {
    echo 'Producto no encontrado';
}

function obtenerDetallesDelProducto($productId) {
    // Lógica para obtener los detalles del producto según el ID del producto
    // Esto puede venir de una base de datos u otra fuente de datos
    // Por ahora, estamos simulando algunos datos
    $productos = [
        // ... productos ...
    ];

    foreach ($productos as $producto) {
        if ($producto['id'] == $productId) {
            return $producto;
        }
    }

    return null;
}
?>
</body>
</html>