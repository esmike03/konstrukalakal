-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 03:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konstrukalakal`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `recipient_id`, `material_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 4, 'Hi', '2025-04-25 17:52:37', '2025-04-25 17:52:37'),
(2, 3, 2, 4, 'asd', '2025-04-25 22:33:36', '2025-04-25 22:33:36'),
(3, 3, 2, 4, 'asdasds', '2025-04-25 22:37:59', '2025-04-25 22:37:59'),
(4, 3, 2, 4, 'asdasdasd', '2025-04-25 22:38:03', '2025-04-25 22:38:03'),
(5, 3, 2, 4, 'asdasdasd', '2025-04-25 22:38:09', '2025-04-25 22:38:09'),
(6, 2, 2, 4, 'hello', '2025-04-25 22:40:24', '2025-04-25 22:40:24'),
(7, 4, 2, 3, 'hello', '2025-04-25 22:59:46', '2025-04-25 22:59:46'),
(8, 4, 2, 3, 'l', '2025-04-25 22:59:58', '2025-04-25 22:59:58'),
(9, 4, 2, 3, 'sss', '2025-04-25 23:02:39', '2025-04-25 23:02:39'),
(10, 4, 2, 3, 'sup', '2025-04-25 23:03:28', '2025-04-25 23:03:28'),
(11, 4, 2, 4, 'sup', '2025-04-25 23:06:02', '2025-04-25 23:06:02'),
(12, 2, 2, 3, 'yow', '2025-04-25 23:15:31', '2025-04-25 23:15:31'),
(13, 2, 3, 6, 'test1', '2025-04-25 23:22:24', '2025-04-25 23:22:24'),
(14, 2, 3, 6, 'Test2', '2025-04-25 23:24:38', '2025-04-25 23:24:38'),
(15, 4, 2, 4, 'yo', '2025-04-25 23:43:02', '2025-04-25 23:43:02'),
(16, 3, 3, 6, 'hello', '2025-04-25 23:44:06', '2025-04-25 23:44:06'),
(17, 3, 2, 3, 'hello', '2025-04-25 23:44:34', '2025-04-25 23:44:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
