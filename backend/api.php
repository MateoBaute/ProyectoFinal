<?php

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
?>