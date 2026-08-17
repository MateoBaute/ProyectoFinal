<?php 

require_once __DIR__ . './api.php';

$action = $_POST['action'] ?? '';

switch ($action){
    case 'agregar_rutina':

    $nombre = $_GET['nombre'] ?? '';
    $nivel = $_GET['nivel'] ?? '';
    $ejercicios = $_GET['id_ejercicio'] ?? [];
    $series = $_GET['series'] ?? [];
    $reps = $_GET['reps'] ?? [];

    if ($nombre && $nivel && count($ejercicios) > 0) {
        $ok = agregarRutina($nombre, $nivel, $ejercicios, $series, $reps);
        echo json_encode($ok);
    } else {
        echo json_encode(false);
    }

    break;
    default:
        echo json_encode(['success' => false, 'error' => 'Acción no válida']);
        break;
}

?>