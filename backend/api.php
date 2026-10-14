<?php
require_once __DIR__ . '/config/db.php';
function agregarRutina($nombre, $nivel, $ejercicio1, $series1, $reps1, $ejercicio2, $series2, $reps2, $ejercicio3, $series3, $reps3, $ejercicio4, $series4, $reps4, $ejercicio5, $series5, $reps5)
{
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

function obtenerRutinas()
{
    $conn = conectar();
    $sql = "SELECT * from rutinas";

    $res = $conn->query($sql);

    return $res->fetch_all(MYSQLI_ASSOC);
}

function registrar($nombre, $email, $password)
{
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
        return ['success' => true];
    } else {
        return ['success' => false, 'error' => 'Error al registrar el usuario'];
    }
}

function login($email, $password)
{
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

function nuevoProducto($nombre, $descripcion, $precio, $stock){

    $conn = conectar();

    $stmt = $conn->prepare(
        "INSERT INTO productos(nombre, descripción, precio, stock) 
         VALUES (?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "ssdi",
        $nombre, $descripcion, $precio, $stock
    );

    return $stmt->execute();
}

function obtenerProductos()
{
    $conn = conectar();
    $sql = "SELECT * from productos";

    $res = $conn->query($sql);

    return $res->fetch_all(MYSQLI_ASSOC);
}

function registrarCompra($usuario_id, $producto_id, $fecha){
    $conn = conectar();
    $sql = "INSERT INTO compras(usuario_id, producto_id, fecha) VALUES (?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt ->bind_param("iis", $usuario_id, $producto_id, $fecha);
    return $stmt->execute();
}

function actualizarPerfil($usuario_id, $nombre, $email, $descripcion, $curriculum){
    
    $conn = conectar();
    $sql = "UPDATE usuarios SET nombre = ?, email = ?, descripción  = ?, cv = ? WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $email, $descripcion, $curriculum, $usuario_id);
    return $stmt->execute();
}
?>