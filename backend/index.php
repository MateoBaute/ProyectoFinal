<?php

require_once __DIR__ . '/api.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'agregar_rutina':   
         
        $nombre = $_GET['nombre'] ?? '';
        $nivel = $_GET['nivel'] ?? '';

        $ejercicio1 = $_GET['ejercicio1'] ?? '';
        $series1 = $_GET['series1'] ?? 0;
        $reps1 = $_GET['reps1'] ?? 0;

        $ejercicio2 = $_GET['ejercicio2'] ?? '';
        $series2 = $_GET['series2'] ?? 0;
        $reps2 = $_GET['reps2'] ?? 0;

        $ejercicio3 = $_GET['ejercicio3'] ?? '';
        $series3 = $_GET['series3'] ?? 0;
        $reps3 = $_GET['reps3'] ?? 0;
        
        $ejercicio4 = $_GET['ejercicio4'] ?? '';
        $series4 = $_GET['series4'] ?? 0;
        $reps4 = $_GET['reps4'] ?? 0;

        $ejercicio5 = $_GET['ejercicio5'] ?? '';
        $series5 = $_GET['series5'] ?? 0;
        $reps5 = $_GET['reps5'] ?? 0;

        if ($nombre && $nivel && $ejercicio1 && $series1 && $reps1 && $ejercicio2 && $series2 && $reps2 && $ejercicio3 && $series3 && $reps3 && $ejercicio4 && $series4 && $reps4 && $ejercicio5 && $series5 && $reps5) {
            $ok = agregarRutina($nombre, $nivel, $ejercicio1, $series1, $reps1, $ejercicio2, $series2, $reps2, $ejercicio3, $series3, $reps3, $ejercicio4, $series4, $reps4, $ejercicio5, $series5, $reps5);
            echo json_encode($ok);
        } else {
            echo json_encode(false);
        }

        break;

    case 'obtener_rutinas':
        echo json_encode(obtenerRutinas());
        break;

    case 'registrar':
        $nombre = $_GET['nombre'] ?? '';
        $email = $_GET['email'] ?? '';
        $password = $_GET['contraseña'] ?? '';

        if ($nombre && $email && $password) {
            echo json_encode(registrar($nombre, $email, $password));
        } else {
            echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
        }
        break;

    case 'login':
        $email = $_GET['email'] ?? '';
        $password = $_GET['contraseña'] ?? '';
        echo json_encode(login($email, $password));
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Acción no válida']);
        break;

    // case 'obtenerRutinas':
    //     echo json_encode(obtenerRutinas());
    //     break;  
}

?>