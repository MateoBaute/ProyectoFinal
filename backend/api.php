<?php
require_once __DIR__ . '/config/db.php';
function agregarRutina($nombre, $nivel, $ejercicios, $series, $reps)
{
    $conn = conectar();
    $conn->begin_transaction();

    try {
        $stmt = $conn->prepare("INSERT INTO rutinas(nombre, nivel) VALUES (?, ?)");
        $stmt->bind_param("ss", $nombre, $nivel);
        $stmt->execute();

        $id_rutina = $conn->insert_id;

        $stmtDetalle = $conn->prepare(
            "INSERT INTO rutina_detalle(id_rutina, id_ejercicio, series, reps) VALUES (?, ?, ?, ?)"
        );

        foreach ($ejercicios as $i => $id_ejercicio) {
            $s = $series[$i];
            $r = $reps[$i];
            $stmtDetalle->bind_param("iiii", $id_rutina, $id_ejercicio, $s, $r);
            $stmtDetalle->execute();
        }

        $conn->commit();
        return true;
    } catch (Exception $e) {
        $conn->rollback();
        return false;
    }
}

function obtenerRutinas()
{
    $conn = conectar();

    $sql = "SELECT 
                r.id AS id_rutina,
                r.nombre AS nombre_rutina,
                r.nivel,
                rd.id AS id_detalle,
                rd.series,
                rd.reps,
                e.id AS id_ejercicio,
                e.nombre AS nombre_ejercicio,
                e.musculo,
                e.description
            FROM rutinas r
            LEFT JOIN rutina_detalle rd ON rd.id_rutina = r.id
            LEFT JOIN ejercicios e ON e.id = rd.id_ejercicio
            ORDER BY r.id";

    $res = $conn->query($sql);
    $filas = $res->fetch_all(MYSQLI_ASSOC);

    $rutinas = [];

    foreach ($filas as $fila) {
        $idRutina = $fila['id_rutina'];

        // Si la rutina todavía no está en el array, la creamos
        if (!isset($rutinas[$idRutina])) {
            $rutinas[$idRutina] = [
                'id' => $fila['id_rutina'],
                'nombre' => $fila['nombre_rutina'],
                'nivel' => $fila['nivel'],
                'ejercicios' => []
            ];
        }

        // Si la rutina tiene ejercicios asociados, los agregamos
        if ($fila['id_ejercicio'] !== null) {
            $rutinas[$idRutina]['ejercicios'][] = [
                'id_ejercicio' => $fila['id_ejercicio'],
                'nombre' => $fila['nombre_ejercicio'],
                'musculo' => $fila['musculo'],
                'description' => $fila['description'],
                'series' => $fila['series'],
                'reps' => $fila['reps']
            ];
        }
    }

    // Reindexa el array para que sea un array plano (no asociativo por id)
    return array_values($rutinas);
}

?>
