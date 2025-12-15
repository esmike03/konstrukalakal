-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2025 at 05:10 PM
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
-- Table structure for table `archives`
--

CREATE TABLE `archives` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `users` varchar(255) DEFAULT NULL,
  `owner` varchar(255) NOT NULL,
  `material_id` varchar(255) NOT NULL,
  `status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL DEFAULT 'pending',
  `item_title` varchar(255) DEFAULT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `archives`
--

INSERT INTO `archives` (`id`, `user_id`, `users`, `owner`, `material_id`, `status`, `item_title`, `item_image`, `quantity`, `created_at`, `updated_at`) VALUES
(33, 3, '2', '2', '12', 'completed', NULL, NULL, '1', '2025-10-27 05:36:48', '2025-10-27 05:36:48'),
(37, 3, '2', '2', '12', 'completed', NULL, NULL, '1', '2025-10-27 05:47:49', '2025-10-27 05:47:49'),
(38, 3, '3', '2', '11', 'rejected', 'Wood', 'trades/CT12jNfxwj0bknzlxLo3GlBHYbCV90B5HGiMsUJA.jpg', '1', '2025-11-02 21:24:19', '2025-11-02 21:24:19'),
(39, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-11-03 02:22:05', '2025-11-03 02:22:05'),
(40, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-11-03 02:23:46', '2025-11-03 02:23:46'),
(41, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-23 05:54:50', '2025-11-23 05:54:50'),
(42, 3, '2', '2', '13', 'completed', NULL, NULL, '1', '2025-11-23 06:35:51', '2025-11-23 06:35:51'),
(43, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-23 07:25:06', '2025-11-23 07:25:06'),
(44, 3, '2', '2', '13', 'completed', NULL, NULL, '1', '2025-11-23 07:29:41', '2025-11-23 07:29:41'),
(45, 3, '2', '2', '13', 'completed', NULL, NULL, '9', '2025-11-23 07:30:18', '2025-11-23 07:30:18'),
(46, 3, '2', '2', '13', 'rejected', NULL, NULL, '1', '2025-11-24 01:31:49', '2025-11-24 01:31:49'),
(47, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 01:56:39', '2025-11-24 01:56:39'),
(48, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:03:42', '2025-11-24 02:03:42'),
(49, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:07:37', '2025-11-24 02:07:37'),
(50, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:07:39', '2025-11-24 02:07:39'),
(51, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:12:34', '2025-11-24 02:12:34'),
(52, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:12:36', '2025-11-24 02:12:36'),
(53, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:15:39', '2025-11-24 02:15:39'),
(54, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:15:40', '2025-11-24 02:15:40'),
(55, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:19:24', '2025-11-24 02:19:24'),
(56, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:19:26', '2025-11-24 02:19:26'),
(57, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:19:52', '2025-11-24 02:19:52'),
(58, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:19:54', '2025-11-24 02:19:54'),
(59, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:20:30', '2025-11-24 02:20:30'),
(60, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:20:32', '2025-11-24 02:20:32'),
(61, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:21:25', '2025-11-24 02:21:25'),
(62, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:21:27', '2025-11-24 02:21:27'),
(63, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 02:21:53', '2025-11-24 02:21:53'),
(64, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 02:21:57', '2025-11-24 02:21:57'),
(65, 3, '2', '2', '14', 'completed', NULL, NULL, '1', '2025-11-24 02:34:36', '2025-11-24 02:34:36'),
(66, 3, '2', '2', '14', 'rejected', NULL, NULL, '1', '2025-11-24 02:40:45', '2025-11-24 02:40:45'),
(67, 3, '2', '2', '11', 'completed', NULL, NULL, '1', '2025-11-24 02:55:17', '2025-11-24 02:55:17'),
(68, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 03:54:42', '2025-11-24 03:54:42'),
(69, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 03:54:44', '2025-11-24 03:54:44'),
(70, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 05:15:38', '2025-11-24 05:15:38'),
(71, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 05:16:34', '2025-11-24 05:16:34'),
(72, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 05:20:32', '2025-11-24 05:20:32'),
(73, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 05:20:34', '2025-11-24 05:20:34'),
(74, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 05:22:41', '2025-11-24 05:22:41'),
(75, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 05:22:43', '2025-11-24 05:22:43'),
(76, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 05:24:57', '2025-11-24 05:24:57'),
(77, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 05:24:59', '2025-11-24 05:24:59'),
(78, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 05:26:14', '2025-11-24 05:26:14'),
(79, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 05:26:16', '2025-11-24 05:26:16'),
(80, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 15:51:17', '2025-11-24 15:51:17'),
(81, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 15:51:19', '2025-11-24 15:51:19'),
(82, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 16:10:00', '2025-11-24 16:10:00'),
(83, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 16:23:18', '2025-11-24 16:23:18'),
(84, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 16:23:20', '2025-11-24 16:23:20'),
(85, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-11-24 16:31:06', '2025-11-24 16:31:06'),
(86, 3, '2', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 16:31:34', '2025-11-24 16:31:34'),
(87, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-24 16:33:49', '2025-11-24 16:33:49'),
(88, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-11-24 16:34:19', '2025-11-24 16:34:19'),
(89, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-11-24 22:27:46', '2025-11-24 22:27:46'),
(90, 3, '2', '2', '13', 'completed', NULL, NULL, '1', '2025-11-24 22:48:53', '2025-11-24 22:48:53'),
(91, 3, '2', '2', '14', 'rejected', NULL, NULL, '1', '2025-11-24 23:08:57', '2025-11-24 23:08:57'),
(92, 3, '2', '2', '11', 'completed', 'sssss', 'trades/6kCImX3PK3jtc3rRCmuISkNrYkeWNLFiE7PzhNcU.jpg', '1', '2025-11-25 05:06:04', '2025-11-25 05:06:04'),
(93, 3, '3', '2', '12', 'cancelled', NULL, NULL, '1', '2025-12-14 20:33:27', '2025-12-14 20:33:27'),
(94, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:35:25', '2025-12-14 20:35:25'),
(95, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:37:31', '2025-12-14 20:37:31'),
(96, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:43:27', '2025-12-14 20:43:27'),
(97, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:44:43', '2025-12-14 20:44:43'),
(98, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:46:44', '2025-12-14 20:46:44'),
(99, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:48:33', '2025-12-14 20:48:33'),
(100, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-12-14 20:50:02', '2025-12-14 20:50:02'),
(101, 3, '3', '2', '11', 'rejected', 'awdasd', 'trades/GC9bP8xZYEqXqnvQzCZC7SnutwvvQ8eE8T2RHii9.png', '1', '2025-12-14 20:51:13', '2025-12-14 20:51:13');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `material_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `owner` varchar(255) DEFAULT NULL,
  `status` enum('pending','accepted','rejected','cancelled') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `material_id`, `quantity`, `owner`, `status`, `created_at`, `updated_at`) VALUES
(112, 2, 16, 1, '3', 'pending', '2025-12-14 20:08:44', '2025-12-14 20:08:44'),
(113, 3, 12, 1, '2', 'pending', '2025-12-14 20:33:33', '2025-12-14 20:33:33');

-- --------------------------------------------------------

--
-- Table structure for table `convos`
--

CREATE TABLE `convos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `recipient_id` bigint(20) UNSIGNED NOT NULL,
  `material_id` bigint(20) UNSIGNED DEFAULT NULL,
  `start` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user1` varchar(255) DEFAULT 'on',
  `user2` varchar(255) DEFAULT 'on',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `convos`
--

INSERT INTO `convos` (`id`, `sender_id`, `recipient_id`, `material_id`, `start`, `content`, `user1`, `user2`, `created_at`, `updated_at`) VALUES
(17, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Open too see conversations.', 'on', 'on', '2025-10-27 05:35:38', '2025-10-27 05:35:38'),
(18, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Open too see conversations.', 'off', 'on', '2025-10-27 05:42:13', '2025-11-24 01:16:28'),
(19, 3, 2, 13, '87b4e21b-bd19-4f95-a9a2-07d35e9aa03b', 'Open to see conversations.', 'off', 'on', '2025-11-02 23:11:54', '2025-11-21 04:23:15'),
(35, 3, 2, 14, '550516a2-5678-43e2-9292-958722189df5', 'Open to see conversations.', 'off', 'on', '2025-11-03 00:08:30', '2025-11-21 04:22:47'),
(36, 5, 2, 11, '85eda817-cd87-4bae-9cf9-3c556f46c3eb', 'Open to see conversations.', 'on', 'on', '2025-11-03 01:22:15', '2025-11-03 01:22:15'),
(37, 3, 2, 15, 'e63b2752-52c1-4650-93c1-4f5212f6c912', 'Open to see conversations.', 'on', 'on', '2025-11-21 03:48:13', '2025-11-21 03:48:13'),
(38, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Open too see conversations.', 'on', 'on', '2025-11-23 06:35:42', '2025-11-23 06:35:42');

-- --------------------------------------------------------

--
-- Table structure for table `convo_lists`
--

CREATE TABLE `convo_lists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` varchar(255) NOT NULL,
  `recipient_id` varchar(255) NOT NULL,
  `material_id` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donates`
--

CREATE TABLE `donates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `owner` varchar(255) NOT NULL,
  `material_id` varchar(255) NOT NULL,
  `status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL DEFAULT 'pending',
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donates`
--

INSERT INTO `donates` (`id`, `user_id`, `owner`, `material_id`, `status`, `quantity`, `created_at`, `updated_at`) VALUES
(57, 3, '2', '14', 'pending', 1, '2025-12-14 20:50:08', '2025-12-14 20:50:08');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `material_name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `forbdt` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'on',
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `user_id`, `material_name`, `location`, `category`, `condition`, `forbdt`, `availability`, `price`, `quantity`, `description`, `status`, `image`, `created_at`, `updated_at`) VALUES
(11, 2, 'Roof', 'Banban,Bogo City', 'Metal', 'Good', 'Trade', 'Few', NULL, 1, 'Metal Colored Roof.', 'on', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-10-27 05:30:22', '2025-11-25 05:06:04'),
(12, 2, 'Recycled Roofingsssssaa11aaaaaa1212', 'Banban,Bogo City', 'Roofing', 'Fair', 'Sale', 'Few', 1500.00, 2, 'Good Roofing for your home', 'on', '[\"materials\\/qv9AUTc6Kr5jpmBAOk3f9Guv9s0CES8SsXltXWvy.jpg\",\"materials\\/1jc71Cxttr77LJZ6U9sUu9JYBj5gMmM2k1z8piEx.png\",\"materials\\/1zTKxzigbhrWM6v8Lqrs3LpxNyIouSYm7tVpAimN.png\",\"materials\\/GJhL5NbNz2ofJx8sR5J0wFg4XLPaT3x6MWucUJwz.png\"]', '2025-10-27 05:35:16', '2025-12-15 07:06:40'),
(13, 2, 'Reclaimed Woods', 'Banban,Bogo City', 'Wood', 'Good', 'Sale', 'Few', 1500.00, 0, 'asdasd', 'off', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-10-28 05:33:28', '2025-11-24 22:48:53'),
(14, 2, 'Recycled Roofings', 'Cebu City', 'Wood', 'Good', 'Donation', 'Few', 1500.00, 3, '213adasd', 'on', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-10-28 05:35:41', '2025-11-24 23:07:43'),
(15, 5, 'Direct Message', 'Konstrukalakal.com', 'Encrypted', 'Convo', 'Secure', 'Few', 0.00, 1, 'Fast and Secure.', 'off', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-11-21 03:44:10', '2025-11-21 03:46:22'),
(16, 3, 'Recycled Roofings', 'Banban,Bogo City', 'Wood', 'Good', 'Sale', 'Few', 1500.00, 1, 'sadasdas', 'on', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-12-14 20:02:20', '2025-12-14 20:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `start` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `recipient_id`, `material_id`, `start`, `content`, `created_at`, `updated_at`) VALUES
(211, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:35:38', '2025-10-27 05:35:38'),
(212, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:36:31', '2025-10-27 05:36:31'),
(213, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order completed successfully!', '2025-10-27 05:36:48', '2025-10-27 05:36:48'),
(214, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:37:13', '2025-10-27 05:37:13'),
(215, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:37:47', '2025-10-27 05:37:47'),
(216, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:38:21', '2025-10-27 05:38:21'),
(217, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:39:21', '2025-10-27 05:39:21'),
(218, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:39:40', '2025-10-27 05:39:40'),
(219, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Trade accepted successfully!', '2025-10-27 05:42:13', '2025-10-27 05:42:13'),
(220, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:46:32', '2025-10-27 05:46:32'),
(221, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-10-27 05:47:31', '2025-10-27 05:47:31'),
(222, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order completed successfully!', '2025-10-27 05:47:48', '2025-10-27 05:47:48'),
(223, 2, 2, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'hi', '2025-11-02 21:34:02', '2025-11-02 21:34:02'),
(224, 3, 2, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'low', '2025-11-02 21:34:06', '2025-11-02 21:34:06'),
(225, 3, 2, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Hi', '2025-11-02 21:34:22', '2025-11-02 21:34:22'),
(226, 2, 2, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'yo', '2025-11-02 21:34:27', '2025-11-02 21:34:27'),
(255, 2, 2, 14, '550516a2-5678-43e2-9292-958722189df5', 'Hi, Selena Gomez. Your message has been received. Michael Jordan will reply as soon as they read your message!', '2025-11-03 00:09:30', '2025-11-03 00:09:30'),
(256, 3, 2, 14, '550516a2-5678-43e2-9292-958722189df5', 'Hi', '2025-11-03 00:08:30', '2025-11-03 00:08:30'),
(257, 2, 2, 14, '550516a2-5678-43e2-9292-958722189df5', 'thank you', '2025-11-03 00:09:27', '2025-11-03 00:09:27'),
(258, 2, 2, 11, '85eda817-cd87-4bae-9cf9-3c556f46c3eb', 'Hi, Admin. Your message has been received. Michael Jordan will reply as soon as they read your message!', '2025-11-03 01:23:15', '2025-11-03 01:23:15'),
(259, 5, 2, 11, '85eda817-cd87-4bae-9cf9-3c556f46c3eb', 'hello, this is admin. Can you askdnklansdknkasd', '2025-11-03 01:22:15', '2025-11-03 01:22:15'),
(260, 2, 2, 15, 'e63b2752-52c1-4650-93c1-4f5212f6c912', 'Hi, Selena Gomez. Your message has been received. Michael Jordan will reply as soon as they read your message!', '2025-11-21 03:49:13', '2025-11-21 03:49:13'),
(261, 3, 2, 15, 'e63b2752-52c1-4650-93c1-4f5212f6c912', 'hi', '2025-11-21 03:48:13', '2025-11-21 03:48:13'),
(262, 3, 2, 15, 'e63b2752-52c1-4650-93c1-4f5212f6c912', 'yo', '2025-11-21 04:51:45', '2025-11-21 04:51:45'),
(263, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order accepted successfully!', '2025-11-23 06:35:42', '2025-11-23 06:35:42'),
(264, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order completed successfully!', '2025-11-23 06:35:51', '2025-11-23 06:35:51'),
(265, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order accepted successfully!', '2025-11-23 07:29:39', '2025-11-23 07:29:39'),
(266, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order completed successfully!', '2025-11-23 07:29:41', '2025-11-23 07:29:41'),
(267, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order accepted successfully!', '2025-11-23 07:30:15', '2025-11-23 07:30:15'),
(268, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order completed successfully!', '2025-11-23 07:30:18', '2025-11-23 07:30:18'),
(269, 2, 3, 14, '550516a2-5678-43e2-9292-958722189df5', 'Inquiry accepted successfully!', '2025-11-24 02:32:40', '2025-11-24 02:32:40'),
(270, 2, 3, 14, '550516a2-5678-43e2-9292-958722189df5', 'Order completed successfully!', '2025-11-24 02:34:36', '2025-11-24 02:34:36'),
(271, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Trade accepted successfully!', '2025-11-24 02:55:13', '2025-11-24 02:55:13'),
(272, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Trade completed successfully!', '2025-11-24 02:55:17', '2025-11-24 02:55:17'),
(273, 2, 3, 12, 'd47615b3-ce69-4e59-a5b0-6833cedf2a6a', 'Order accepted successfully!', '2025-11-24 16:30:16', '2025-11-24 16:30:16'),
(274, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order accepted successfully!', '2025-11-24 16:30:28', '2025-11-24 16:30:28'),
(275, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order accepted successfully!', '2025-11-24 22:48:50', '2025-11-24 22:48:50'),
(276, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order completed successfully!', '2025-11-24 22:48:53', '2025-11-24 22:48:53'),
(277, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Trade accepted successfully!', '2025-11-25 04:58:54', '2025-11-25 04:58:54'),
(278, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Trade completed successfully!', '2025-11-25 05:06:04', '2025-11-25 05:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(6, '0001_01_01_000000_create_users_table', 1),
(7, '0001_01_01_000001_create_cache_table', 1),
(8, '0001_01_01_000002_create_jobs_table', 1),
(9, '2025_03_28_051832_create_posts_table', 1),
(10, '2025_03_31_022830_create_materials_table', 1),
(11, '2025_04_02_014254_create_carts_table', 2),
(12, '2025_04_26_014249_create_messages_table', 3),
(13, '2025_04_26_014626_add_sender_id_to_messages_table', 4),
(14, '2025_05_03_013954_create_donates_table', 5),
(15, '2025_05_03_031317_create_trades_table', 5),
(16, '2025_08_24_133114_create_donates_table', 6),
(17, '2025_08_24_154257_create_orders_table', 7),
(18, '2025_09_30_053409_create_notifications_table', 8),
(19, '2025_09_30_063134_create_archives_table', 8),
(20, '2025_10_06_144958_create_convo_lists_table', 9),
(21, '2025_10_06_163403_create_convos_table', 10),
(22, '2025_11_21_125243_create_reporteds_table', 11),
(23, '2025_11_21_144556_create_reporteditems_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `material_id` varchar(255) NOT NULL,
  `status` enum('pending','accepted','rejected','cancelled') NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `ownername` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `owner`, `material_id`, `status`, `quantity`, `message`, `ownername`, `username`, `image`, `created_at`, `updated_at`) VALUES
(78, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:35:26', '2025-10-27 05:35:26'),
(79, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:35:38', '2025-10-27 05:35:38'),
(80, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:36:31', '2025-10-27 05:36:31'),
(81, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:36:48', '2025-10-27 05:36:48'),
(82, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:37:02', '2025-10-27 05:37:02'),
(83, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:37:13', '2025-10-27 05:37:13'),
(84, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:37:47', '2025-10-27 05:37:47'),
(85, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:38:21', '2025-10-27 05:38:21'),
(86, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:39:21', '2025-10-27 05:39:21'),
(87, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:39:40', '2025-10-27 05:39:40'),
(88, 2, '3', '11', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:42:13', '2025-10-27 05:42:13'),
(89, 2, '2', '11', 'pending', '1', 'Michael Jordan your trade has been rejected.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-10-27 05:45:32', '2025-10-27 05:45:32'),
(90, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:46:32', '2025-10-27 05:46:32'),
(91, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:47:31', '2025-10-27 05:47:31'),
(92, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-27 05:47:49', '2025-10-27 05:47:49'),
(93, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-28 04:52:30', '2025-10-28 04:52:30'),
(94, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-28 05:33:38', '2025-10-28 05:33:38'),
(95, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-10-28 05:35:52', '2025-10-28 05:35:52'),
(96, 2, '2', '11', 'pending', '1', 'Michael Jordan your trade has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-02 21:24:19', '2025-11-02 21:24:19'),
(97, 3, '2', '14', 'pending', '1', 'Michael Jordan message you. Please check your inbox.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-03 00:02:07', '2025-11-03 00:02:07'),
(98, 3, '2', '14', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'Selena Gomez', 'Selena Gomez', NULL, '2025-11-03 00:05:42', '2025-11-03 00:05:42'),
(99, 3, '2', '14', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'Selena Gomez', 'Selena Gomez', NULL, '2025-11-03 00:07:07', '2025-11-03 00:07:07'),
(100, 3, '2', '14', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'Selena Gomez', 'Selena Gomez', NULL, '2025-11-03 00:08:30', '2025-11-03 00:08:30'),
(101, 5, '2', '11', 'pending', '1', 'Admin message you. Please check your inbox.', 'Admin', 'Admin', NULL, '2025-11-03 01:22:15', '2025-11-03 01:22:15'),
(102, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-03 02:22:05', '2025-11-03 02:22:05'),
(103, 3, '2', '14', 'pending', '5', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-03 02:22:12', '2025-11-03 02:22:12'),
(104, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-03 02:23:46', '2025-11-03 02:23:46'),
(105, 3, '2', '15', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'Selena Gomez', 'Selena Gomez', NULL, '2025-11-21 03:48:13', '2025-11-21 03:48:13'),
(106, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 05:37:04', '2025-11-23 05:37:04'),
(107, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 05:43:53', '2025-11-23 05:43:53'),
(108, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-23 05:54:50', '2025-11-23 05:54:50'),
(109, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 05:54:56', '2025-11-23 05:54:56'),
(110, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 06:35:42', '2025-11-23 06:35:42'),
(111, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 06:35:51', '2025-11-23 06:35:51'),
(112, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 06:48:47', '2025-11-23 06:48:47'),
(113, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-23 07:25:06', '2025-11-23 07:25:06'),
(114, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 07:25:11', '2025-11-23 07:25:11'),
(115, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 07:29:39', '2025-11-23 07:29:39'),
(116, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 07:29:41', '2025-11-23 07:29:41'),
(117, 3, '2', '13', 'pending', '10', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 07:30:00', '2025-11-23 07:30:00'),
(118, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 07:30:15', '2025-11-23 07:30:15'),
(119, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-23 07:30:18', '2025-11-23 07:30:18'),
(120, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 01:31:04', '2025-11-24 01:31:04'),
(121, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 01:43:40', '2025-11-24 01:43:40'),
(122, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 01:56:39', '2025-11-24 01:56:39'),
(123, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 01:56:44', '2025-11-24 01:56:44'),
(124, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:03:42', '2025-11-24 02:03:42'),
(125, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:03:46', '2025-11-24 02:03:46'),
(126, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:07:37', '2025-11-24 02:07:37'),
(127, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:07:39', '2025-11-24 02:07:39'),
(128, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:07:45', '2025-11-24 02:07:45'),
(129, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:07:49', '2025-11-24 02:07:49'),
(130, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:12:34', '2025-11-24 02:12:34'),
(131, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:12:36', '2025-11-24 02:12:36'),
(132, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:12:41', '2025-11-24 02:12:41'),
(133, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:12:44', '2025-11-24 02:12:44'),
(134, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:15:39', '2025-11-24 02:15:39'),
(135, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:15:40', '2025-11-24 02:15:40'),
(136, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:15:45', '2025-11-24 02:15:45'),
(137, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:15:49', '2025-11-24 02:15:49'),
(138, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:19:24', '2025-11-24 02:19:24'),
(139, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:19:26', '2025-11-24 02:19:26'),
(140, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:19:31', '2025-11-24 02:19:31'),
(141, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:19:35', '2025-11-24 02:19:35'),
(142, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:19:52', '2025-11-24 02:19:52'),
(143, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:19:54', '2025-11-24 02:19:54'),
(144, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:20:05', '2025-11-24 02:20:05'),
(145, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:20:08', '2025-11-24 02:20:08'),
(146, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:20:30', '2025-11-24 02:20:30'),
(147, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:20:32', '2025-11-24 02:20:32'),
(148, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:20:37', '2025-11-24 02:20:37'),
(149, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:20:40', '2025-11-24 02:20:40'),
(150, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:21:25', '2025-11-24 02:21:25'),
(151, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:21:27', '2025-11-24 02:21:27'),
(152, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:21:33', '2025-11-24 02:21:33'),
(153, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:21:36', '2025-11-24 02:21:36'),
(154, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:21:53', '2025-11-24 02:21:53'),
(155, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 02:21:57', '2025-11-24 02:21:57'),
(156, 2, '3', '14', 'pending', '1', 'Selena Gomez your inquiries has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:32:40', '2025-11-24 02:32:40'),
(157, 2, '3', '14', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:34:36', '2025-11-24 02:34:36'),
(158, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:40:34', '2025-11-24 02:40:34'),
(159, 2, '3', '11', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:55:13', '2025-11-24 02:55:13'),
(160, 2, '3', '11', 'pending', '1', 'Selena Gomez your trade has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:55:17', '2025-11-24 02:55:17'),
(161, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:56:30', '2025-11-24 02:56:30'),
(162, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 02:56:33', '2025-11-24 02:56:33'),
(163, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 03:54:42', '2025-11-24 03:54:42'),
(164, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 03:54:44', '2025-11-24 03:54:44'),
(165, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 03:54:50', '2025-11-24 03:54:50'),
(166, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 03:54:53', '2025-11-24 03:54:53'),
(167, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:15:38', '2025-11-24 05:15:38'),
(168, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:16:34', '2025-11-24 05:16:34'),
(169, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:16:41', '2025-11-24 05:16:41'),
(170, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:16:44', '2025-11-24 05:16:44'),
(171, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:20:32', '2025-11-24 05:20:32'),
(172, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:20:34', '2025-11-24 05:20:34'),
(173, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:20:39', '2025-11-24 05:20:39'),
(174, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:20:43', '2025-11-24 05:20:43'),
(175, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:22:41', '2025-11-24 05:22:41'),
(176, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:22:43', '2025-11-24 05:22:43'),
(177, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:22:48', '2025-11-24 05:22:48'),
(178, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:22:52', '2025-11-24 05:22:52'),
(179, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:24:57', '2025-11-24 05:24:57'),
(180, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:24:59', '2025-11-24 05:24:59'),
(181, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:25:05', '2025-11-24 05:25:05'),
(182, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:25:08', '2025-11-24 05:25:08'),
(183, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:26:14', '2025-11-24 05:26:14'),
(184, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 05:26:16', '2025-11-24 05:26:16'),
(185, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:26:25', '2025-11-24 05:26:25'),
(186, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 05:26:29', '2025-11-24 05:26:29'),
(187, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 15:51:17', '2025-11-24 15:51:17'),
(188, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 15:51:19', '2025-11-24 15:51:19'),
(189, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 15:51:27', '2025-11-24 15:51:27'),
(190, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 15:51:31', '2025-11-24 15:51:31'),
(191, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:04:11', '2025-11-24 16:04:11'),
(192, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:10:00', '2025-11-24 16:10:00'),
(193, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:10:10', '2025-11-24 16:10:10'),
(194, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:17:52', '2025-11-24 16:17:52'),
(195, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:23:18', '2025-11-24 16:23:18'),
(196, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:23:20', '2025-11-24 16:23:20'),
(197, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:23:25', '2025-11-24 16:23:25'),
(198, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:23:29', '2025-11-24 16:23:29'),
(199, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:30:16', '2025-11-24 16:30:16'),
(200, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:30:28', '2025-11-24 16:30:28'),
(201, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:31:06', '2025-11-24 16:31:06'),
(202, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:31:34', '2025-11-24 16:31:34'),
(203, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:33:04', '2025-11-24 16:33:04'),
(204, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:33:49', '2025-11-24 16:33:49'),
(205, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 16:34:09', '2025-11-24 16:34:09'),
(206, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 16:34:19', '2025-11-24 16:34:19'),
(207, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-11-24 22:27:46', '2025-11-24 22:27:46'),
(208, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 22:27:53', '2025-11-24 22:27:53'),
(209, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 22:27:56', '2025-11-24 22:27:56'),
(210, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 22:48:50', '2025-11-24 22:48:50'),
(211, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 22:48:53', '2025-11-24 22:48:53'),
(212, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-24 23:07:26', '2025-11-24 23:07:26'),
(213, 2, '3', '11', 'pending', '1', 'Selena Gomez your order has been accepted.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-25 04:58:54', '2025-11-25 04:58:54'),
(214, 2, '3', '11', 'pending', '1', 'Selena Gomez your trade has been completed. Thank you!!', 'Michael Jordan', 'Selena Gomez', NULL, '2025-11-25 05:06:04', '2025-11-25 05:06:04'),
(215, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 19:49:03', '2025-12-14 19:49:03'),
(216, 2, '3', '16', 'pending', '1', 'Michael Jordan added an item to their cart.', 'Selena Gomez', 'Michael Jordan', NULL, '2025-12-14 20:08:44', '2025-12-14 20:08:44'),
(217, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:10:59', '2025-12-14 20:10:59'),
(218, 2, '2', '12', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:33:27', '2025-12-14 20:33:27'),
(219, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:33:33', '2025-12-14 20:33:33'),
(220, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:35:25', '2025-12-14 20:35:25'),
(221, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:35:35', '2025-12-14 20:35:35'),
(222, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:37:31', '2025-12-14 20:37:31'),
(223, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:37:40', '2025-12-14 20:37:40'),
(224, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:43:27', '2025-12-14 20:43:27'),
(225, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:43:47', '2025-12-14 20:43:47'),
(226, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:44:43', '2025-12-14 20:44:43'),
(227, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:44:50', '2025-12-14 20:44:50'),
(228, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:46:44', '2025-12-14 20:46:44'),
(229, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', NULL, '2025-12-14 20:46:48', '2025-12-14 20:46:48'),
(230, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', NULL, '2025-12-14 20:48:33', '2025-12-14 20:48:33'),
(231, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'Michael Jordan', 'Michael Jordan', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-12-14 20:50:02', '2025-12-14 20:50:02'),
(232, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'Michael Jordan', 'Selena Gomez', 'materials/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg', '2025-12-14 20:50:08', '2025-12-14 20:50:08'),
(233, 2, '2', '11', 'pending', '1', 'Michael Jordan your trade has been cancelled.', 'Michael Jordan', 'Michael Jordan', '[\"materials\\/UVmwLKdkoViHBWC7dAIZ9KLRYLhgUrEFCoefwJAG.jpg\",\"materials\\/cxn93uPXnKIri4nsp1uWDZZ82emUNCImC4WsoPgq.jpg\",\"materials\\/AitxLH4VDSwXOPvqO7t0wX1uxy3DA2EDX3SddYnE.jpg\",\"materials\\/ni6Pr5b6ixvG0PcMwK4JpCtxiBGUSwE0jT6VhsUQ.jpg\"]', '2025-12-14 20:51:13', '2025-12-14 20:51:13'),
(234, 3, '3', '18', 'pending', '1', 'Someone have reported you for Hate speech.', '3', 'Confidential', '', '2025-12-15 07:13:15', '2025-12-15 07:13:15'),
(235, 3, '3', '18', 'pending', '1', 'Someone have reported you for Spam or misleading.', '3', 'Confidential', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFjZWhrimd975f_0Y66f0qySHGOodLt_3BxQ&s', '2025-12-15 07:15:42', '2025-12-15 07:15:42');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `material_id` varchar(255) NOT NULL,
  `owner` bigint(255) UNSIGNED NOT NULL,
  `status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL DEFAULT 'pending',
  `quantity` int(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reporteditems`
--

CREATE TABLE `reporteditems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_req` varchar(255) NOT NULL,
  `rep_user` varchar(255) NOT NULL,
  `rep_item` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reporteditems`
--

INSERT INTO `reporteditems` (`id`, `user_req`, `rep_user`, `rep_item`, `reason`, `created_at`, `updated_at`) VALUES
(1, '3', '2', '12', 'Incorrect Product Name', '2025-11-21 06:59:05', '2025-11-21 06:59:05');

-- --------------------------------------------------------

--
-- Table structure for table `reporteds`
--

CREATE TABLE `reporteds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_req` varchar(255) NOT NULL,
  `rep_user` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reporteds`
--

INSERT INTO `reporteds` (`id`, `user_req`, `rep_user`, `reason`, `created_at`, `updated_at`) VALUES
(3, '3', '2', 'Harassment or bullying', '2025-11-21 05:24:32', '2025-11-21 05:24:32'),
(4, '5', '3', 'Spam or misleading', '2025-11-21 05:41:38', '2025-11-21 05:41:38'),
(5, '2', '3', 'Hate speech', '2025-12-15 07:13:15', '2025-12-15 07:13:15'),
(6, '2', '3', 'Spam or misleading', '2025-12-15 07:15:42', '2025-12-15 07:15:42');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('K5d8SC2i4WKk1hTV1hnHSYqtaElOlDVQ0yAqS801', 5, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTk1SaWRud0d1b3RNTTR0MXhlWmlrTkVTM0QweHhTS2JHdklONVBIQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9rb25zdHJ1a2FsYWthbC50ZXN0L2FkbWluL3N0YXRpc3RpY3MiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo1O30=', 1765815023),
('mAWpIEeiltbipO1GeqfzCeLVY0TYCzou841relFt', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiY1VBWmp5bEFtdnVYOE5sTFJIeUtiV1Vpc3I1M3V4UEtvbkNMOUVaQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9rb25zdHJ1a2FsYWthbC50ZXN0L21lc3NhZ2VzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mzt9', 1765814379);

-- --------------------------------------------------------

--
-- Table structure for table `trades`
--

CREATE TABLE `trades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `trade_for` bigint(20) UNSIGNED NOT NULL,
  `item_title` varchar(255) NOT NULL,
  `item_image` varchar(255) NOT NULL,
  `status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL DEFAULT 'pending',
  `quantity` int(255) DEFAULT 1,
  `description` varchar(255) DEFAULT 'Trading for your item.',
  `trade_quantity` int(255) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'enabled',
  `blocked` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `contact`, `address`, `profile_image`, `email_verified_at`, `password`, `status`, `blocked`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Michael Jordan', 'michael@gmail.com', '09925318606', 'Dampas Tagbilaran City, Bohol', 'profile_images/RIjfgRCLLr99SmR53LmpPb70FVylVoKtYrF62ukP.jpg', NULL, '$2y$12$u52ar64MRhfsep0yqdOMvuC/NZaESFWQ7CnaoHlhDvChWIAyu0yY6', 'enabled', NULL, NULL, '2025-03-31 00:51:05', '2025-11-21 06:33:04'),
(3, 'Selena Gomez', 'selena@gmail.com', '09364355837', 'Antequera, Bohol', 'profile_images/oiLEVnL373128DoqrHWGhWUiiW9SVDBgogr5KrTj.jpg', NULL, '$2y$12$u52ar64MRhfsep0yqdOMvuC/NZaESFWQ7CnaoHlhDvChWIAyu0yY6', 'enabled', NULL, NULL, '2025-04-24 18:08:11', '2025-10-27 05:33:24'),
(5, 'Admin', 'admin@konstrukalakal.com', '09123456789', 'Konstrukalakal', 'profile_images/pwNxzMbdfPlIdVpjGQ3UZFsB4OxmqPwYh2E4XT5J.webp', NULL, '$2y$12$jMJzqG0Ox3Af0WmDVWYO7OJIyMOYKMtU1eAasxYVj25YZJoXlq5nS', 'enabled', NULL, NULL, '2025-11-03 00:11:49', '2025-11-03 00:16:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `archives`
--
ALTER TABLE `archives`
  ADD PRIMARY KEY (`id`),
  ADD KEY `archives_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_material_id_foreign` (`material_id`);

--
-- Indexes for table `convos`
--
ALTER TABLE `convos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `convos_sender_id_foreign` (`sender_id`),
  ADD KEY `convos_recipient_id_foreign` (`recipient_id`),
  ADD KEY `convos_material_id_foreign` (`material_id`);

--
-- Indexes for table `convo_lists`
--
ALTER TABLE `convo_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donates`
--
ALTER TABLE `donates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donates_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materials_user_id_foreign` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reporteditems`
--
ALTER TABLE `reporteditems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reporteds`
--
ALTER TABLE `reporteds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `trades`
--
ALTER TABLE `trades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trades_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `contact` (`contact`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `archives`
--
ALTER TABLE `archives`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `convos`
--
ALTER TABLE `convos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `convo_lists`
--
ALTER TABLE `convo_lists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `donates`
--
ALTER TABLE `donates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reporteditems`
--
ALTER TABLE `reporteditems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reporteds`
--
ALTER TABLE `reporteds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `trades`
--
ALTER TABLE `trades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `archives`
--
ALTER TABLE `archives`
  ADD CONSTRAINT `archives_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_material_id_foreign` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `convos`
--
ALTER TABLE `convos`
  ADD CONSTRAINT `convos_material_id_foreign` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `convos_recipient_id_foreign` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `convos_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `donates`
--
ALTER TABLE `donates`
  ADD CONSTRAINT `donates_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `trades`
--
ALTER TABLE `trades`
  ADD CONSTRAINT `trades_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
