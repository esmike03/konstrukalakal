-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2025 at 04:00 PM
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
(34, 4, '2', '2', '11', 'rejected', 'asddasd', 'trades/8sLsQIapl7I3Z23Zr95T8oknAGNLwbNE469nNXza.jpg', '1', '2025-10-27 05:43:46', '2025-10-27 05:43:46'),
(35, 4, '2', '2', '11', 'rejected', 'asddasd', 'trades/8sLsQIapl7I3Z23Zr95T8oknAGNLwbNE469nNXza.jpg', '1', '2025-10-27 05:45:07', '2025-10-27 05:45:07'),
(36, 4, '2', '2', '11', 'rejected', 'asddasd', 'trades/8sLsQIapl7I3Z23Zr95T8oknAGNLwbNE469nNXza.jpg', '1', '2025-10-27 05:45:32', '2025-10-27 05:45:32'),
(37, 3, '2', '2', '12', 'completed', NULL, NULL, '1', '2025-10-27 05:47:49', '2025-10-27 05:47:49'),
(38, 3, '3', '2', '11', 'rejected', 'Wood', 'trades/CT12jNfxwj0bknzlxLo3GlBHYbCV90B5HGiMsUJA.jpg', '1', '2025-11-02 21:24:19', '2025-11-02 21:24:19'),
(39, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-11-03 02:22:05', '2025-11-03 02:22:05'),
(40, 3, '3', '2', '14', 'cancelled', NULL, NULL, '1', '2025-11-03 02:23:46', '2025-11-03 02:23:46'),
(41, 3, '3', '2', '13', 'cancelled', NULL, NULL, '1', '2025-11-23 05:54:50', '2025-11-23 05:54:50'),
(42, 3, '2', '2', '13', 'completed', NULL, NULL, '1', '2025-11-23 06:35:51', '2025-11-23 06:35:51');

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
(18, 2, 3, 11, '8eae228a-b11c-4d25-bc0d-de7172be7916', 'Open too see conversations.', 'on', 'on', '2025-10-27 05:42:13', '2025-10-27 05:42:13'),
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
(45, 3, '2', '14', 'pending', 1, '2025-11-23 05:43:53', '2025-11-23 06:21:01');

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
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'on',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `user_id`, `material_name`, `location`, `category`, `condition`, `forbdt`, `availability`, `price`, `quantity`, `description`, `image`, `status`, `created_at`, `updated_at`) VALUES
(11, 2, 'Roof', 'Banban,Bogo City', 'Metal', 'Good', 'Trade', 'Few', NULL, 12, 'Metal Colored Roof.', 'materials/cyct11oY14VHXUrIakww461tXzPFTAodcNr90yLo.jpg', 'on', '2025-10-27 05:30:22', '2025-11-21 06:33:04'),
(12, 2, 'Recycled Roofings', 'Banban,Bogo City', 'Roofing', 'Fair', 'Sale', 'Few', 1500.00, 2, 'Good Roofing for your home', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'off', '2025-10-27 05:35:16', '2025-11-21 07:11:08'),
(13, 2, 'Reclaimed Woods', 'Banban,Bogo City', 'Wood', 'Good', 'Sale', 'Few', 1500.00, 11, 'asdasd', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'on', '2025-10-28 05:33:28', '2025-11-23 06:35:51'),
(14, 2, 'Recycled Roofings', 'Cebu City', 'Wood', 'Good', 'Donation', 'Few', 1500.00, 1, '213adasd', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'on', '2025-10-28 05:35:41', '2025-11-21 06:33:04'),
(15, 5, 'Direct Message', 'Konstrukalakal.com', 'Encrypted', 'Convo', 'Secure', 'Few', 0.00, 1, 'Fast and Secure.', 'materials/X4CF5Sfjz1vsoumivtxmrlghu73SZTSQNSfgfy4r.jpg', 'off', '2025-11-21 03:44:10', '2025-11-21 03:46:22');

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
(264, 2, 3, 13, '0b05934e-a1af-41b8-b382-56df9392d82e', 'Order completed successfully!', '2025-11-23 06:35:51', '2025-11-23 06:35:51');

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
  `image` varchar(255) DEFAULT NULL,
  `ownername` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `owner`, `material_id`, `status`, `quantity`, `message`, `image`, `ownername`, `username`, `created_at`, `updated_at`) VALUES
(78, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:35:26', '2025-10-27 05:35:26'),
(79, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:35:38', '2025-10-27 05:35:38'),
(80, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:36:31', '2025-10-27 05:36:31'),
(81, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:36:48', '2025-10-27 05:36:48'),
(82, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:37:02', '2025-10-27 05:37:02'),
(83, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:37:13', '2025-10-27 05:37:13'),
(84, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:37:47', '2025-10-27 05:37:47'),
(85, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:38:21', '2025-10-27 05:38:21'),
(86, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:39:21', '2025-10-27 05:39:21'),
(87, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:39:40', '2025-10-27 05:39:40'),
(88, 2, '3', '11', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/cyct11oY14VHXUrIakww461tXzPFTAodcNr90yLo.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:42:13', '2025-10-27 05:42:13'),
(89, 2, '2', '11', 'pending', '1', 'Michael Jordan your trade has been rejected.', 'materials/cyct11oY14VHXUrIakww461tXzPFTAodcNr90yLo.jpg', 'Michael Jordan', 'Michael Jordan', '2025-10-27 05:45:32', '2025-10-27 05:45:32'),
(90, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:46:32', '2025-10-27 05:46:32'),
(91, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:47:31', '2025-10-27 05:47:31'),
(92, 2, '3', '12', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-27 05:47:49', '2025-10-27 05:47:49'),
(93, 3, '2', '12', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/i0Sv8CL3c8x8FmZ6GAoEwmsdSRIRWAWr5ekqDr38.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-28 04:52:30', '2025-10-28 04:52:30'),
(94, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Selena Gomez', '2025-10-28 05:33:38', '2025-10-28 05:33:38'),
(95, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Michael Jordan', 'Selena Gomez', '2025-10-28 05:35:52', '2025-10-28 05:35:52'),
(96, 2, '2', '11', 'pending', '1', 'Michael Jordan your trade has been cancelled.', 'materials/cyct11oY14VHXUrIakww461tXzPFTAodcNr90yLo.jpg', 'Michael Jordan', 'Michael Jordan', '2025-11-02 21:24:19', '2025-11-02 21:24:19'),
(97, 3, '2', '14', 'pending', '1', 'Michael Jordan message you. Please check your inbox.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Michael Jordan', 'Michael Jordan', '2025-11-03 00:02:07', '2025-11-03 00:02:07'),
(98, 3, '2', '14', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Selena Gomez', 'Selena Gomez', '2025-11-03 00:05:42', '2025-11-03 00:05:42'),
(99, 3, '2', '14', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', NULL, 'Selena Gomez', 'Selena Gomez', '2025-11-03 00:07:07', '2025-11-03 00:07:07'),
(100, 3, '2', '14', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'profile_images/oiLEVnL373128DoqrHWGhWUiiW9SVDBgogr5KrTj.jpg', 'Selena Gomez', 'Selena Gomez', '2025-11-03 00:08:30', '2025-11-03 00:08:30'),
(101, 5, '2', '11', 'pending', '1', 'Admin message you. Please check your inbox.', 'profile_images/pwNxzMbdfPlIdVpjGQ3UZFsB4OxmqPwYh2E4XT5J.webp', 'Admin', 'Admin', '2025-11-03 01:22:15', '2025-11-03 01:22:15'),
(102, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Michael Jordan', 'Michael Jordan', '2025-11-03 02:22:05', '2025-11-03 02:22:05'),
(103, 3, '2', '14', 'pending', '5', 'Selena Gomez has inquired about your products.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Michael Jordan', 'Selena Gomez', '2025-11-03 02:22:12', '2025-11-03 02:22:12'),
(104, 2, '2', '14', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Michael Jordan', 'Michael Jordan', '2025-11-03 02:23:46', '2025-11-03 02:23:46'),
(105, 3, '2', '15', 'pending', '1', 'Selena Gomez message you. Please check your inbox.', 'profile_images/oiLEVnL373128DoqrHWGhWUiiW9SVDBgogr5KrTj.jpg', 'Selena Gomez', 'Selena Gomez', '2025-11-21 03:48:13', '2025-11-21 03:48:13'),
(106, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Selena Gomez', '2025-11-23 05:37:04', '2025-11-23 05:37:04'),
(107, 3, '2', '14', 'pending', '1', 'Selena Gomez has inquired about your products.', 'materials/k7ZjpMs8750JIFJHg0Ei4pom5MFLr7eCfmcrcBw3.jpg', 'Michael Jordan', 'Selena Gomez', '2025-11-23 05:43:53', '2025-11-23 05:43:53'),
(108, 2, '2', '13', 'pending', '1', 'Michael Jordan your order has been cancelled.', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Michael Jordan', '2025-11-23 05:54:50', '2025-11-23 05:54:50'),
(109, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Selena Gomez', '2025-11-23 05:54:56', '2025-11-23 05:54:56'),
(110, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been accepted.', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Selena Gomez', '2025-11-23 06:35:42', '2025-11-23 06:35:42'),
(111, 2, '3', '13', 'pending', '1', 'Selena Gomez your order has been completed. Thank you!!', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Selena Gomez', '2025-11-23 06:35:51', '2025-11-23 06:35:51'),
(112, 3, '2', '13', 'pending', '1', 'Selena Gomez added an item to their cart.', 'materials/LPF3bUOfC6QMxbp23MviBDr71xS7bHsIGMFvcFNF.png', 'Michael Jordan', 'Selena Gomez', '2025-11-23 06:48:47', '2025-11-23 06:48:47');

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

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `material_id`, `owner`, `status`, `quantity`, `created_at`, `updated_at`) VALUES
(23, 3, '12', 2, 'pending', 1, '2025-10-28 06:09:24', '2025-10-28 06:09:24'),
(26, 3, '13', 2, 'pending', 1, '2025-11-23 06:59:01', '2025-11-23 06:59:01');

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
(4, '5', '3', 'Spam or misleading', '2025-11-21 05:41:38', '2025-11-21 05:41:38');

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
('b0YaPNocakfWOMSIuE6vsoWCjicL9LqzrpeQd7uD', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZE56WVM3TlYzMm1TalpWZDd0ZXJxTzJ4N2V6OE5YSE8zdmdPNkNNUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9rb25zdHJ1a2FsYWthbC50ZXN0L09yZGVyc0NvbXBsZXRlZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjM7fQ==', 1763909991),
('dZnio2Mnzdy5JGnoxrz0czw33xBAghN6jvIxP2IG', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiT3NwMTN3cGJwak5GNWdHSU1Wejg4QzVKQW9iQUI4aGhsSlVIR2dPYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9rb25zdHJ1a2FsYWthbC50ZXN0L09yZGVyc0NvbXBsZXRlZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==', 1763908686);

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

--
-- Dumping data for table `trades`
--

INSERT INTO `trades` (`id`, `user_id`, `owner`, `trade_for`, `item_title`, `item_image`, `status`, `quantity`, `description`, `trade_quantity`, `created_at`, `updated_at`) VALUES
(23, 3, 2, 11, 'Hammer', 'trades/DgQiKAlna1K6MldQI1pTusUDUK78sMugU16WgYqA.jpg', 'pending', 12, 'This is strong hammer like hammer of thor.', 6, '2025-11-02 21:32:15', '2025-11-02 21:32:15');

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
(4, 'Peter Dafo', 'peter@gmail.com', '09812348981', 'Tiptip Tagbilaran City', NULL, NULL, '$2y$12$NZwGJ834nVl5QF8WPkBajOSd1hdVxY1d2Fc9bBYD.d3lbnnikhsFC', 'enabled', NULL, NULL, '2025-04-25 22:59:15', '2025-04-25 22:59:15'),
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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trades`
--
ALTER TABLE `trades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
