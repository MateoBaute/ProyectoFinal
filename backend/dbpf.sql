-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2026 a las 22:45:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbpf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `musculo` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `musculo`, `description`) VALUES
(1, 'Sentadilla', 'Piernas', 'Ejercicio compuesto de tren inferior'),
(2, 'Press de banca', 'Pecho', 'Ejercicio compuesto de empuje'),
(3, 'Peso muerto', 'Espalda', 'Ejercicio compuesto de cadena posterior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `nivel` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `nombre`, `nivel`) VALUES
(1, 'Rutina Full Body', 'Principiante'),
(2, 'Rutina Piernas', 'Intermedio'),
(3, 'Full Body', 'Principiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina_detalle`
--

CREATE TABLE `rutina_detalle` (
  `id` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL,
  `series` int(11) NOT NULL,
  `reps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutina_detalle`
--

INSERT INTO `rutina_detalle` (`id`, `id_rutina`, `id_ejercicio`, `series`, `reps`) VALUES
(1, 1, 1, 4, 12),
(2, 1, 2, 3, 10),
(3, 2, 1, 3, 15),
(4, 2, 3, 4, 8),
(5, 3, 1, 4, 12),
(6, 3, 2, 3, 10),
(7, 3, 3, 4, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(60) NOT NULL,
  `descripción` varchar(300) DEFAULT NULL,
  `cv` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `descripción`, `cv`) VALUES
(2, 'Mateo', 'mateobaute10@gmail.com', '$2y$10$lTGKkBPoZrYUNzdHc4wSQefMDO202vg534vZPcCQCrnS3B09whoFq', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutina_detalle`
--
ALTER TABLE `rutina_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rutina_detalle_rutina` (`id_rutina`),
  ADD KEY `fk_rutina_detalle_ejercicio` (`id_ejercicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rutina_detalle`
--
ALTER TABLE `rutina_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `rutina_detalle`
--
ALTER TABLE `rutina_detalle`
  ADD CONSTRAINT `fk_rutina_detalle_ejercicio` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `fk_rutina_detalle_rutina` FOREIGN KEY (`id_rutina`) REFERENCES `rutinas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
