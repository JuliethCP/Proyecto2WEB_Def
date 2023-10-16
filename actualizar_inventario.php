<?php
$archivo = 'inventario.json'; // Nombre del archivo JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $cantidadComprada = $_POST['cantidadComprada']; // Nueva variable para la cantidad a comprar

    // Abre el archivo en modo lectura y escritura ('r+')
    $manejador = fopen($archivo, 'r+');

    if ($manejador) {
        // Lee el contenido del archivo JSON en una variable
        $json_data = fread($manejador, filesize($archivo));

        // Decodifica la cadena JSON en un array de PHP
        $datos = json_decode($json_data, true);

        $cont = 0;
        while ($cont < count($datos)) {
            if ($datos[$cont]['id'] == $id) {
                // Restar la cantidad comprada del inventario
                $datos[$cont]['cantidad'] -= $cantidadComprada;
            }
            $cont++;
        }

        // Rebobina el archivo y escribe los datos actualizados
        fseek($manejador, 0);
        fwrite($manejador, json_encode($datos, JSON_PRETTY_PRINT));
        fclose($manejador);

        // Respondemos con éxito
        echo "Inventario actualizado con éxito.";
    } else {
        // Error al abrir el archivo
        echo "Error al abrir el archivo.";
    }
} else {
    // La solicitud no es de tipo POST
    echo "Solicitud no válida.";
}
?>
