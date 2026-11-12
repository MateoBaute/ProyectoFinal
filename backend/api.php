<?php
require_once __DIR__ . '/config/db.php';
function agregarRutina($nombre, $nivel, $ejercicio1, $series1, $reps1, $ejercicio2, $series2, $reps2, $ejercicio3, $series3, $reps3, $ejercicio4, $series4, $reps4, $ejercicio5, $series5, $reps5){
    $conn = conectar();

    $stmt = $conn->prepare(
        "INSERT INTO rutinas(nombre, nivel, ejercicio1, series1, reps1, ejercicio2, series2, reps2, ejercicio3, series3, reps3, ejercicio4, series4, reps4, ejercicio5, series5, reps5) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "sssiisiisiisiisii",
        $nombre, $nivel,
        $ejercicio1, $series1, $reps1,
        $ejercicio2, $series2, $reps2,
        $ejercicio3, $series3, $reps3,
        $ejercicio4, $series4, $reps4,
        $ejercicio5, $series5, $reps5
    );

    return $stmt->execute();
}

function obtenerRutinas(){
    $conn = conectar();
    $sql = "SELECT * from rutinas";

    $res = $conn->query($sql);

    return $res->fetch_all(MYSQLI_ASSOC);
}

function eliminarRutina($id){
    $conn = conectar();
    $sql = "DELETE FROM rutinas WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    return $stmt->execute();
}

function registrar($nombre, $email, $password){
    $conn = conectar();

    $stmtCheck = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    $stmtCheck->store_result();

    if ($stmtCheck->num_rows > 0) {
        return ['success' => false, 'error' => 'El correo ya está registrado'];
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmtInsert = $conn->prepare("INSERT INTO usuarios(nombre, email, contraseña) VALUES (?, ?, ?)");
    $stmtInsert->bind_param("sss", $nombre, $email, $hashedPassword);

    if ($stmtInsert->execute()) {
        $nuevo_id = $stmtInsert->insert_id; 
        
        return [
            'success' => true,
            'usuario' => [
                'id' => $nuevo_id,
                'nombre' => $nombre,
                'email' => $email
            ]
        ];
    } else {
        return ['success' => false, 'error' => 'Error al registrar el usuario'];
    }
}


function login($email, $password){
    $conn = conectar();

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $usuario = $stmt->get_result()->fetch_assoc();

    $stmt->close();
    $conn->close();

    if (!$usuario) {
        return ['success' => false, 'error' => 'Correo o contraseña incorrectos'];
    }

    $hashedPassword = $usuario['contraseña'];

    if ($hashedPassword && password_verify($password, $hashedPassword)) {

        unset($usuario['contraseña'], $usuario['reset_token'], $usuario['reset_expira']);

        return ['success' => true, 'usuario' => $usuario];
    }

    return ['success' => false, 'error' => 'Correo o contraseña incorrectos'];
}

function guardarImagenProducto($archivo){
    if (!$archivo || !isset($archivo['error'])) {
        return ['success' => false, 'error' => 'Debes seleccionar una imagen para el producto.'];
    }

    if ($archivo['error'] !== UPLOAD_ERR_OK) {
        $errores = [
            UPLOAD_ERR_INI_SIZE => 'La imagen supera el tamaño máximo permitido por el servidor.',
            UPLOAD_ERR_FORM_SIZE => 'La imagen supera el tamaño máximo permitido.',
            UPLOAD_ERR_PARTIAL => 'La imagen no se recibió completa.',
            UPLOAD_ERR_NO_FILE => 'Debes seleccionar una imagen para el producto.',
            UPLOAD_ERR_NO_TMP_DIR => 'No está disponible la carpeta temporal para subir imágenes.',
            UPLOAD_ERR_CANT_WRITE => 'No se pudo guardar temporalmente la imagen.',
            UPLOAD_ERR_EXTENSION => 'El servidor rechazó la carga de la imagen.'
        ];
        return ['success' => false, 'error' => $errores[$archivo['error']] ?? 'Error al subir la imagen.'];
    }

    $maximoBytes = 5 * 1024 * 1024;
    if ($archivo['size'] > $maximoBytes) {
        return ['success' => false, 'error' => 'La imagen no puede superar los 5 MB.'];
    }

    if (!is_uploaded_file($archivo['tmp_name'])) {
        return ['success' => false, 'error' => 'El archivo recibido no es una carga válida.'];
    }

    $extensionesPorMime = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/webp' => 'webp'
    ];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    if (!$finfo) {
        return ['success' => false, 'error' => 'No se pudo validar el formato de la imagen.'];
    }

    $mime = finfo_file($finfo, $archivo['tmp_name']);
    finfo_close($finfo);
    $datosImagen = getimagesize($archivo['tmp_name']);
    if (!isset($extensionesPorMime[$mime]) || !$datosImagen || $datosImagen['mime'] !== $mime) {
        return ['success' => false, 'error' => 'El archivo debe ser una imagen JPG, PNG, GIF o WEBP válida.'];
    }

    $directorio = __DIR__ . DIRECTORY_SEPARATOR . 'imgProds';
    if (!is_dir($directorio) && !mkdir($directorio, 0755, true) && !is_dir($directorio)) {
        return ['success' => false, 'error' => 'No se pudo crear la carpeta de imágenes de productos.'];
    }

    $nombreArchivo = bin2hex(random_bytes(10)) . '.' . $extensionesPorMime[$mime];
    $destino = $directorio . DIRECTORY_SEPARATOR . $nombreArchivo;
    if (!move_uploaded_file($archivo['tmp_name'], $destino)) {
        return ['success' => false, 'error' => 'No se pudo guardar la imagen del producto.'];
    }

    return ['success' => true, 'path' => 'backend/imgProds/' . $nombreArchivo];
}

function nuevoProducto($nombre, $descripcion, $img, $precio, $stock){

    $conn = conectar();

    $stmt = $conn->prepare(
        "INSERT INTO productos(nombre, descripcion, img, precio, stock)
         VALUES (?, ?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "sssdi",
        $nombre, $descripcion, $img, $precio, $stock
    );

    $resultado = $stmt->execute();
    $stmt->close();
    $conn->close();
    return $resultado;
}

function obtenerProductos()
{
    $conn = conectar();
    $sql = "SELECT * from productos";

    $res = $conn->query($sql);

    return $res->fetch_all(MYSQLI_ASSOC);
}

function eliminarProducto($id){
    $conn = conectar();
    $sql = "DELETE FROM productos WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    return $stmt->execute();
}

function registrarCompra($usuario_id, $producto_id, $fecha){
    $conn = conectar();
    $conn->begin_transaction();

    try {
        $stmtStock = $conn->prepare("UPDATE productos SET stock = stock - 1 WHERE id = ? AND stock > 0");
        $stmtStock->bind_param("i", $producto_id);
        if (!$stmtStock->execute() || $stmtStock->affected_rows !== 1) {
            $stmtStock->close();
            $conn->rollback();
            $conn->close();
            return ['success' => false, 'error' => 'El producto no existe o no tiene stock disponible.'];
        }
        $stmtStock->close();

        $stmtCompra = $conn->prepare("INSERT INTO compras(usuario_id, producto_id, fecha) VALUES (?, ?, ?)");
        $stmtCompra->bind_param("iis", $usuario_id, $producto_id, $fecha);
        if (!$stmtCompra->execute()) {
            $stmtCompra->close();
            $conn->rollback();
            $conn->close();
            return ['success' => false, 'error' => 'No se pudo registrar la compra.'];
        }
        $stmtCompra->close();
        $conn->commit();
        $conn->close();
        return ['success' => true];
    } catch (mysqli_sql_exception $error) {
        $conn->rollback();
        $conn->close();
        return ['success' => false, 'error' => 'No se pudo registrar la compra.'];
    }
}

function actualizarPerfil($usuario_id, $nombre, $email, $descripcion, $curriculum) {
    $conn = conectar();
    $sql = "UPDATE usuarios SET nombre = ?, email = ?, description = ?, cv = ? WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $email, $descripcion, $curriculum, $usuario_id);
    
    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'error' => 'No se pudieron actualizar los datos en la base de datos.'];
    }
}

function obtenerUsuarios() {
    $conn = conectar();
    $sql = "SELECT  * FROM usuarios";

    $res = $conn->query($sql);

    return $res->fetch_all(MYSQLI_ASSOC);
}
?>