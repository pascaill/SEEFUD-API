-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 12, 2024 at 05:41 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seefud`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` longtext NOT NULL,
  `report_status` tinyint(1) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `vendor_id`, `rating`, `comment`, `report_status`, `foto`, `created_at`) VALUES
(1, 3, 1, 5, 'The chocolate cake was amazing!', 1, 'feedback_1.jpg', '2024-12-12 04:41:47'),
(2, 4, 2, 4, 'The rendang was delicious, but a bit too spicy for me.', 0, NULL, '2024-12-12 04:41:47');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `qty` decimal(10,0) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `image` longtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `description`, `qty`, `unit`, `image`, `created_at`) VALUES
(1, 'Flour', 'All-purpose flour', '1000', 'gram', 'flour.jpg', '2024-12-12 04:41:47'),
(2, 'Sugar', 'Granulated sugar', '500', 'gram', 'sugar.jpg', '2024-12-12 04:41:47'),
(3, 'Eggs', 'Fresh chicken eggs', '10', 'pcs', 'eggs.jpg', '2024-12-12 04:41:47'),
(4, 'Beef', 'Premium quality beef', '500', 'gram', 'beef.jpg', '2024-12-12 04:41:47'),
(5, 'Coconut Milk', 'Canned coconut milk', '400', 'ml', 'coconut_milk.jpg', '2024-12-12 04:41:47');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients_product`
--

CREATE TABLE `ingredients_product` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ingredients_product`
--

INSERT INTO `ingredients_product` (`id`, `product_id`, `ingredient_id`, `created_at`) VALUES
(1, 1, 1, '2024-12-12 04:41:47'),
(2, 1, 2, '2024-12-12 04:41:47'),
(3, 1, 3, '2024-12-12 04:41:47'),
(4, 2, 1, '2024-12-12 04:41:47'),
(5, 2, 2, '2024-12-12 04:41:47'),
(6, 2, 3, '2024-12-12 04:41:47'),
(7, 3, 4, '2024-12-12 04:41:47'),
(8, 3, 5, '2024-12-12 04:41:47');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `qr_code` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `vendor_id`, `name`, `description`, `price`, `image`, `qr_code`, `created_at`) VALUES
(1, 1, 'Chocolate Cake', 'Rich and decadent chocolate cake.', '25000', 'chocolate_cake.jpg', 'qr_code_1.png', '2024-12-12 04:41:47'),
(2, 1, 'Strawberry Cheesecake', 'Creamy cheesecake with fresh strawberries.', '30000', 'strawberry_cheesecake.jpg', 'qr_code_2.png', '2024-12-12 04:41:47'),
(3, 2, 'Rendang Padang', 'Spicy beef rendang cooked to perfection.', '50000', 'rendang_padang.jpg', 'qr_code_3.png', '2024-12-12 04:41:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('vendor','customer','admin') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `role`, `created_at`, `email`) VALUES
(1, 'Admin User', '$2b$10$KGCaBwSHRZFtRKaD7sRAmuzNvAnHmyWdgO7okp3IYDgz6usc/NaoG', 'admin', '2024-12-12 04:41:47', 'admin@example.com'),
(2, 'Vendor User', '$2b$10$QbVMGifkq/jadDThGBGVbuYzSQim9gSgak0mFF87I.hf4uICEYgPO', 'vendor', '2024-12-12 04:41:47', 'vendor@example.com'),
(3, 'Customer User 1', '$2b$10$O0fzCsfKBsnTvrJytQMMZ.Ro0cvoRuEzab.1v0WGFn43X9BSqjxvi', 'customer', '2024-12-12 04:41:47', 'customer1@example.com'),
(4, 'Customer User 2', '$2b$10$mLzGFyWb/XaktmGfbdHISO7FBAFIjEULZuWsZo7vZBg4wezW/jDDO', 'customer', '2024-12-12 04:41:47', 'customer2@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `location` longtext NOT NULL,
  `rating` int DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `user_id`, `store_name`, `description`, `location`, `rating`, `is_verified`, `image`, `created_at`) VALUES
(1, 2, 'Delicious Delights', 'We serve the best desserts in town!', 'Jl. Makanan Enak No. 1', 4, 1, 'delicious_delights.jpg', '2024-12-12 04:41:47'),
(2, 4, 'Spicy Sensations', 'Authentic Indonesian spicy dishes.', 'Jl. Pedas No. 2', 5, 0, 'spicy_sensations.jpg', '2024-12-12 04:41:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients_product`
--
ALTER TABLE `ingredients_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`name`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ingredients_product`
--
ALTER TABLE `ingredients_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
