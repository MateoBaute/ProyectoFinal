-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2026 a las 22:53:33
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
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `usuario_id`, `producto_id`, `fecha`) VALUES
(2, 2, 5, '2026-10-07'),
(3, 0, 2, '2026-10-13'),
(4, 0, 2, '2026-10-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` decimal(11,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`) VALUES
(1, 'Teclado Mecánico', 'Teclado RGB con switches mecánicos', 4500.00, 20),
(2, 'Mouse Óptico', 'Mouse ergonómico para oficina', 1200.00, 35),
(3, 'Monitor 24 pulgadas', 'Monitor Full HD con tasa de refresco de 75Hz', 18900.00, 12),
(4, 'Auriculares Gamer', 'Auriculares con sonido envolvente y micrófono', 3200.00, 15),
(5, 'mateo', 'soy un crack', 500.00, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

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

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `nombre`, `nivel`, `ejercicio1`, `series1`, `reps1`, `ejercicio2`, `series2`, `reps2`, `ejercicio3`, `series3`, `reps3`, `ejercicio4`, `series4`, `reps4`, `ejercicio5`, `series5`, `reps5`) VALUES
(4, 'Full Body', 'Principiante', 'Sentadilla', 4, 12, 'Press de banca', 3, 10, 'Peso muerto', 3, 8, 'Press militar', 3, 10, 'Remo con barra', 3, 10),
(5, 'Rutina Piernas', 'Intermedio', 'Sentadilla', 5, 10, 'Peso muerto', 4, 8, 'Zancadas', 3, 12, 'Prensa', 4, 10, 'Curl femoral', 3, 12),
(6, 'Full Body', 'Principiante', 'Sentadilla', 4, 12, 'Press de banca', 3, 10, 'Peso muerto', 3, 8, 'Press militar', 3, 10, 'Remo con barra', 3, 10);

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
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
