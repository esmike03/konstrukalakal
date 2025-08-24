-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2025 at 05:24 PM
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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `material_id`, `quantity`, `created_at`, `updated_at`) VALUES
(9, 3, 3, 1, '2025-04-24 18:12:59', '2025-04-24 18:12:59'),
(10, 3, 4, 1, '2025-04-25 16:51:38', '2025-04-25 16:51:38'),
(13, 2, 6, 2, '2025-04-28 18:50:15', '2025-08-14 05:32:19'),
(17, 4, 3, 1, '2025-08-20 06:08:38', '2025-08-20 06:08:38'),
(18, 4, 6, 1, '2025-08-20 06:08:43', '2025-08-20 06:08:43'),
(19, 2, 7, 3, '2025-08-24 05:23:26', '2025-08-24 05:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `donates`
--

CREATE TABLE `donates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `owner` varchar(255) NOT NULL,
  `material_id` varchar(255) NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donates`
--

INSERT INTO `donates` (`id`, `user_id`, `owner`, `material_id`, `status`, `quantity`, `created_at`, `updated_at`) VALUES
(2, 2, '3', '7', 'accepted', 4, '2025-08-24 06:09:45', '2025-08-24 07:19:25'),
(3, 4, '3', '7', 'rejected', 1, '2025-08-24 07:06:39', '2025-08-24 07:19:25');

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
(3, 2, 'Recycled Roofings', 'Tagbilaran City', 'Metal', 'Fair', 'Sale', 'More', 1500.00, 40, 'This roof is made from recycled materials.', 'materials/CXxnjTHnb2t019vSHh0scFW7t00jSG8hcpveTkaL.jpg', 'on', '2025-03-31 00:58:38', '2025-03-31 00:58:38'),
(4, 2, 'Reclaimed Woods', 'Cebu City', 'Wood', 'Good', 'Trade', 'Few', 5000.00, 23, 'Woods made from woods in the forest.', 'materials/TWiPZsd4xkPh6M3vsTZeMuhS5LQNJSnY9aGsXRZm.jpg', 'on', '2025-03-31 00:59:17', '2025-03-31 00:59:17'),
(6, 3, 'Recycled Roofings', 'Antequera, Bohol', 'Metal', 'Good', 'Sale', 'Few', 501.00, 112, 'Good roofings for your house.', 'materials/8NH2MBtv701yvDbEGDgxhHbtZ2vbmqzGH8bmFBxW.jpg', 'on', '2025-04-24 19:17:41', '2025-04-24 19:34:37'),
(7, 3, 'Recycled Roofings2', 'Banban,Bogo City', 'Roofing', 'Good', 'Donation', 'Few', 1500.00, 213, 'asdasd', 'materials/siZFB77VNzJylB4m6VbUdSe59Ua2s80iUM9uajNQ.jpg', 'off', '2025-05-02 00:01:12', '2025-08-24 07:19:25');

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
(46, 2, 3, 6, '23ae47e8-1a69-47bb-8d72-a205e7dd9469', 'haloo', '2025-08-18 21:36:20', '2025-08-18 21:36:20'),
(48, 2, 3, 6, '23ae47e8-1a69-47bb-8d72-a205e7dd9469', 'sup', '2025-08-18 21:46:30', '2025-08-18 21:46:30'),
(50, 2, 3, 6, '23ae47e8-1a69-47bb-8d72-a205e7dd9469', 'heyoo', '2025-08-18 22:00:16', '2025-08-18 22:00:16'),
(51, 3, 3, 6, '23ae47e8-1a69-47bb-8d72-a205e7dd9469', 'nice', '2025-08-18 22:00:38', '2025-08-18 22:00:38'),
(52, 2, 3, 7, '0c7dc39a-0784-48c4-99e1-d560b31bcee2', 'new hello', '2025-08-18 22:01:02', '2025-08-18 22:01:02'),
(53, 3, 3, 7, '0c7dc39a-0784-48c4-99e1-d560b31bcee2', 'sup men', '2025-08-18 22:01:27', '2025-08-18 22:01:27'),
(55, 4, 3, 6, '97633ec3-0faa-451d-bc5d-bb2855fe5b55', 'yo', '2025-08-18 22:15:53', '2025-08-18 22:15:53'),
(56, 3, 2, 3, '56624356-aea9-45ea-825e-055af6ed5a6d', 'halooo', '2025-08-18 22:19:33', '2025-08-18 22:19:33'),
(57, 3, 3, 6, '97633ec3-0faa-451d-bc5d-bb2855fe5b55', 'look', '2025-08-18 22:21:44', '2025-08-18 22:21:44'),
(58, 3, 2, 4, 'db48c647-742c-4b01-bdb4-7449678feca3', 'haloooo', '2025-08-18 23:53:18', '2025-08-18 23:53:18'),
(59, 2, 2, 4, 'db48c647-742c-4b01-bdb4-7449678feca3', 'yooooo', '2025-08-18 23:55:36', '2025-08-18 23:55:36'),
(61, 2, 3, 4, 'db48c647-742c-4b01-bdb4-7449678feca3', 'Trade accepted successfully!', '2025-08-23 06:03:33', '2025-08-23 06:03:33'),
(62, 2, 3, 7, '0c7dc39a-0784-48c4-99e1-d560b31bcee2', 'sup', '2025-08-23 06:35:15', '2025-08-23 06:35:15'),
(63, 3, 2, 7, '0c7dc39a-0784-48c4-99e1-d560b31bcee2', 'Inquiry accepted successfully!', '2025-08-24 07:13:10', '2025-08-24 07:13:10'),
(64, 3, 2, 7, '0c7dc39a-0784-48c4-99e1-d560b31bcee2', 'Inquiry accepted successfully!', '2025-08-24 07:19:25', '2025-08-24 07:19:25');

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
(16, '2025_08_24_133114_create_donates_table', 6);

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
('bQniz9DzFTL7GRV0Afa3hrpcHuFkHOc7XgyrjtwK', 4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiem1lV1dhT2VUOFVzV3duaWR0RHVLQkN1bk9YZ3dLWG1zdm01M1o2dCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9rb25zdHJ1a2FsYWthbC50ZXN0L3RyYWRlLW1hdGVyaWFscyI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjQ7fQ==', 1756049034),
('kZ4NzD3Iq5zwCDMQgito66f699y8yKEaysUV5Zug', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:142.0) Gecko/20100101 Firefox/142.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTDNSRTlRT1VqZHFJa3FEVDFnOU5FNFNyYURIYURVUVRFQ2hTenA2MCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9rb25zdHJ1a2FsYWthbC50ZXN0L2NhcnQvZG9uYXRlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mzt9', 1756049032);

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
  `status` enum('pending','accepted','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trades`
--

INSERT INTO `trades` (`id`, `user_id`, `owner`, `trade_for`, `item_title`, `item_image`, `status`, `created_at`, `updated_at`) VALUES
(10, 4, 2, 4, 'Wooder than Wood', 'trades/qtIKXKAeXJKWCYskY8rPDPfxSlG04eKX6C6gmgfq.png', 'rejected', '2025-08-20 06:49:44', '2025-08-23 06:03:33'),
(11, 3, 2, 4, 'Woody', 'trades/nUdLtIehLHUfMMvErLugwRQhyzJxeYB8hh7KDwb9.jpg', 'accepted', '2025-08-20 07:24:25', '2025-08-23 06:03:33');

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
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `contact`, `address`, `profile_image`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Earl Mike H. Sarabia', 'sarabiaearlmike14@gmail.com', '09925318606', 'Dampas Tagbilaran City, Bohol', 'profile_images/l9x0gX9lIyKEfpfMDwG8qFFA0IPnPRge7OioHr5C.jpg', NULL, '$2y$12$u52ar64MRhfsep0yqdOMvuC/NZaESFWQ7CnaoHlhDvChWIAyu0yY6', NULL, '2025-03-31 00:51:05', '2025-04-01 21:42:52'),
(3, 'Ira Jane Renoblas', 'irajane@gmail.com', '09364355837', 'Antequera, Bohol', 'profile_images/hkIkA36Cs3wwqYlLrl8XIAK9oQkbGEJtGVjxiPHW.jpg', NULL, '$2y$12$u52ar64MRhfsep0yqdOMvuC/NZaESFWQ7CnaoHlhDvChWIAyu0yY6', NULL, '2025-04-24 18:08:11', '2025-04-24 21:58:50'),
(4, 'Peter Kyle Gingo', 'peter@gmail.com', '09812348981', 'Tiptip Tagbilaran City', NULL, NULL, '$2y$12$NZwGJ834nVl5QF8WPkBajOSd1hdVxY1d2Fc9bBYD.d3lbnnikhsFC', NULL, '2025-04-25 22:59:15', '2025-04-25 22:59:15');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `donates`
--
ALTER TABLE `donates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trades`
--
ALTER TABLE `trades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_material_id_foreign` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `trades`
--
ALTER TABLE `trades`
  ADD CONSTRAINT `trades_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
