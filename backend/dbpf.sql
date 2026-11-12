SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `img` varchar(45) NOT NULL,
  `precio` decimal(11,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `img`, `precio`, `stock`) VALUES
(1, 'Camiseta Deportiva', 'Camiseta transpirable para entrenamiento', 'camiseta.jpg', 19.99, 50),
(2, 'Pantalones de Yoga', 'Pantalones cómodos y elásticos para yoga', 'pantalones_yoga.jpg', 29.99, 30),
(3, 'Zapatillas de Running', 'Zapatillas ligeras y resistentes para correr', 'zapatillas_running.jpg', 79.99, 20),
(4, 'Botella de Agua', 'Botella reutilizable de acero inoxidable', 'botella_agua.jpg', 14.99, 100),
(5, 'Mancuernas Ajustables', 'Mancuernas con peso ajustable para entrenamiento en casa', 'mancuernas_ajustables.jpg', 49.99, 15);

CREATE TABLE `rutinas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `nivel` varchar(45) NOT NULL,
  `ejercicio1` varchar(45) NOT NULL,
  `series1` int(11) NOT NULL,
  `reps1` int(11) NOT NULL,
  `ejercicio2` varchar(45) NOT NULL,
  `series2` int(11) NOT NULL,
  `reps2` int(11) NOT NULL,
  `ejercicio3` varchar(45) NOT NULL,
  `series3` int(11) NOT NULL,
  `reps3` int(11) NOT NULL,
  `ejercicio4` varchar(45) NOT NULL,
  `series4` int(11) NOT NULL,
  `reps4` int(11) NOT NULL,
  `ejercicio5` varchar(45) NOT NULL,
  `series5` int(11) NOT NULL,
  `reps5` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `rutinas` (`id`, `nombre`, `nivel`, `ejercicio1`, `series1`, `reps1`, `ejercicio2`, `series2`, `reps2`, `ejercicio3`, `series3`, `reps3`, `ejercicio4`, `series4`, `reps4`, `ejercicio5`, `series5`, `reps5`) VALUES
(1, 'Full Body', 'Principiante', 'Sentadilla', 4, 12, 'Press de banca', 3, 10, 'Peso muerto', 3, 8, 'Press militar', 3, 10, 'Remo con barra', 3, 10),
(2, 'Rutina Piernas', 'Intermedio', 'Sentadilla', 5, 10, 'Peso muerto', 4, 8, 'Zancadas', 3, 12, 'Prensa', 4, 10, 'Curl femoral', 3, 12);

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(60) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `cv` text DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `description`, `cv`, `admin`) VALUES
(1, 'mateo baute', 'mateobaute10@gmail.com', '$2y$10$lTGKkBPoZrYUNzdHc4wSQefMDO202vg534vZPcCQCrnS3B09whoFq', 'YO', 'pamba', NULL),
(2, 'admin', 'admin@gmail.com', '$2y$10$FsCZk3le0E2zpmyaRII6m.WRkXHZUeZbJM3vtiE.5ipQ.OANwlaGi', '', '', 1);

ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

COMMIT;
