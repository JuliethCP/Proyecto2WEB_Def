<?php
// Verifica si se proporcionó el parámetro "imagen"
if (isset($_GET['imagen'])) {
    // Obtiene la ruta de la imagen a redimensionar desde el parámetro
    $imagenOriginal = $_GET['imagen'];

    // Tamaño deseado para la nueva imagen (ancho x alto)
    $nuevoAncho = 1960;
    $nuevoAlto = 820;

    // Crea una imagen a partir de la imagen original
    $imagen = imagecreatefromjpeg($imagenOriginal);

    // Crea una nueva imagen con el tamaño deseado
    $nuevaImagen = imagecreatetruecolor($nuevoAncho, $nuevoAlto);

    // Copia la imagen original en la nueva imagen con el tamaño deseado
    imagecopyresampled($nuevaImagen, $imagen, 0, 0, 0, 0, $nuevoAncho, $nuevoAlto, imagesx($imagenOriginal), imagesy($imagenOriginal));

    // Envía los encabezados adecuados para indicar que la respuesta es una imagen JPEG
    header('Content-Type: image/jpeg');

    // Imprime la nueva imagen en el flujo de salida (se mostrará como una imagen)
    imagejpeg($nuevaImagen);

    // Libera la memoria de las imágenes
    imagedestroy($imagen);
    imagedestroy($nuevaImagen);
} else {
    // Si no se proporcionó el parámetro "imagen", muestra un mensaje de error o redirección.
    echo "Error: No se proporcionó una imagen válida.";
}
?>
