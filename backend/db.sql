-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 13, 2018 at 09:06 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nigeria_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `input_stats`
--

CREATE TABLE `input_stats` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `page_statistic_id` int(11) NOT NULL,
  `backspaceCount` int(11) NOT NULL,
  `totalKeyPressCount` int(11) NOT NULL,
  `timeStartTyping` varchar(64) NOT NULL,
  `timeStopTyping` varchar(64) NOT NULL,
  `timeSpentInField` int(11) NOT NULL,
  `finalInputValue` varchar(128) NOT NULL,
  `finalInputLength` int(11) NOT NULL,
  `intelliWordChanges` varchar(256) NOT NULL,
  `intelliWordIndex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `input_stats`
--

INSERT INTO `input_stats` (`id`, `name`, `page_statistic_id`, `backspaceCount`, `totalKeyPressCount`, `timeStartTyping`, `timeStopTyping`, `timeSpentInField`, `finalInputValue`, `finalInputLength`, `intelliWordChanges`, `intelliWordIndex`) VALUES
(36, 'phone_number', 134, 0, 10, '0', '1526217763785', 2147483647, '0714928674', 10, '', 0),
(37, 'month', 135, 0, 0, '0', '1526217766426', 2147483647, 'August', 7, '', 0),
(38, 'phone_number', 140, 0, 10, '0', '1526217763785', 2147483647, '0714928674', 10, '', 0),
(39, 'month', 141, 0, 0, '0', '1526217766426', 2147483647, 'August', 7, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `page_statistics`
--

CREATE TABLE `page_statistics` (
  `id` int(11) NOT NULL,
  `respondent_id` int(11) NOT NULL,
  `timestamp` varchar(64) NOT NULL,
  `timespent` int(11) NOT NULL,
  `previousPage` varchar(20) NOT NULL,
  `pageName` varchar(20) NOT NULL,
  `pageOrder` int(11) NOT NULL,
  `isInputPresent` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page_statistics`
--

INSERT INTO `page_statistics` (`id`, `respondent_id`, `timestamp`, `timespent`, `previousPage`, `pageName`, `pageOrder`, `isInputPresent`) VALUES
(134, 10, '1526217756203', 140, 'index', 'login', 1, 'yes'),
(135, 10, '1526217763882', 7679, 'login', 'homepage', 2, 'yes'),
(136, 10, '1526217770256', 6374, 'homepage', 'employability_goal_t', 3, 'no'),
(137, 10, '1526217776562', 6306, 'employability_goal_t', 'employability_goal_a', 4, 'no'),
(138, 10, '1526217780065', 3503, 'employability_goal_a', 'super_employability_', 5, 'no'),
(139, 10, '1526217785522', 5457, 'super_employability_', 'super_employability_', 6, 'no'),
(140, 10, '1526217756203', 140, 'index', 'login', 1, 'yes'),
(141, 10, '1526217763882', 7679, 'login', 'homepage', 2, 'yes'),
(142, 10, '1526217770256', 6374, 'homepage', 'employability_goal_t', 3, 'no'),
(143, 10, '1526217776562', 6306, 'employability_goal_t', 'employability_goal_a', 4, 'no'),
(144, 10, '1526217780065', 3503, 'employability_goal_a', 'super_employability_', 5, 'no'),
(145, 10, '1526217785522', 5457, 'super_employability_', 'super_employability_', 6, 'no');

-- --------------------------------------------------------

--
-- Table structure for table `respondents`
--

CREATE TABLE `respondents` (
  `id` int(11) NOT NULL,
  `survey_id` varchar(12) NOT NULL,
  `application` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `respondents`
--

INSERT INTO `respondents` (`id`, `survey_id`, `application`) VALUES
(10, '0714928674', 'nigeria_project');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `input_stats`
--
ALTER TABLE `input_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_statistics`
--
ALTER TABLE `page_statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `respondents`
--
ALTER TABLE `respondents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `input_stats`
--
ALTER TABLE `input_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `page_statistics`
--
ALTER TABLE `page_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `respondents`
--
ALTER TABLE `respondents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
