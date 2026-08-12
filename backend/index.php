<?php 

require_once __DIR__ . '/rutinas/crearRutinas.php';

$action = $_POST['action'] ?? '';

switch ($action){
    case 'crearRutina':
        $nombre = $_POST['nombre'];
        $ejercicios = $_POST['ejercicios'];
        $nivel = $_POST['nivel'];

        if($nombre && $ejercicios && $nivel){
        // $result = crearRutina();
        echo json_encode(crearRutina($nombre, $ejercicios, $nivel));
        }else{
            echo 'Faltan campos';
        }

        break;
    default:
        echo json_encode(['success' => false, 'error' => 'Acción no válida']);
        break;
}

?>