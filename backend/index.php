<?php 

require_once __DIR__ . '/rutinas/crearRutinas.php';

$action = $_GET['action'] ?? '';

switch ($action){
    case 'crearRutina':
        $result = crearRutina();
        echo json_encode(['success' => true, 'data' => $result]);
        break;
    default:
        echo json_encode(['success' => false, 'error' => 'Acción no válida']);
        break;
}

?>