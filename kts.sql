-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2021 at 02:14 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kts`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `activity` text DEFAULT NULL,
  `activity_type` varchar(100) DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `date_done` datetime DEFAULT current_timestamp(),
  `is_active` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `card_number` varchar(5) DEFAULT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `card_type` varchar(10) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `owner` varchar(100) DEFAULT NULL,
  `is_active` int(11) DEFAULT 1,
  `auth_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id`, `card_number`, `bank`, `card_type`, `date_created`, `owner`, `is_active`, `auth_code`) VALUES
(1, '4081', 'TEST BANK', 'visa ', '2021-06-26 07:59:47', 'SPN-00006', 1, 'AUTH_0vk0oepu9h'),
(2, 'X000', 'Zenith Bank', '', '2021-06-28 16:22:21', 'SPN-00006', 1, 'AUTH_9xto1n0evo');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `ref` varchar(100) DEFAULT NULL,
  `donator` varchar(100) DEFAULT NULL,
  `kid` varchar(100) DEFAULT NULL,
  `amount` double DEFAULT 0,
  `title` varchar(100) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `date_done` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `ref`, `donator`, `kid`, `amount`, `title`, `payment_type`, `status`, `date_done`) VALUES
(1, '173586524', 'SPN-00006', 'KDS-00009', 348341, 'undefined', '', 0, '2021-07-05 17:20:30'),
(2, '709280578', 'SPN-00006', 'KDS-00009', 500000, 'School Fees', '', 1, '2021-07-05 17:23:41'),
(3, '250822025', 'SPN-00006', 'KDS-00009', 5000, 'School Fees', 'card', 1, '2021-07-05 17:38:29'),
(4, '769754751', 'SPN-00006', 'KDS-00013', 5000, 'School Fees', 'bank', 1, '2021-07-05 17:39:23'),
(5, '634519313', 'SPN-00006', 'KDS-00014', 60, 'School Fees', 'card', 1, '2021-07-05 17:42:13'),
(6, '519216432', 'SPN-00006', 'KDS-00000', 5000, 'School Fees', 'card', 1, '2021-07-06 14:17:30'),
(7, '746330195', 'SPN-00006', 'KDS-00000', 5000, 'School Fees', 'card', 1, '2021-07-06 14:23:12'),
(8, '218116612', 'SPN-00006', 'KDS-00000', 5000, 'School Fees', 'card', 1, '2021-07-06 14:43:17'),
(9, '154891797', 'SPN-00006', 'KDS-00001', 700, 'School Fees', 'card', 1, '2021-07-06 14:52:42'),
(10, '66404749', 'SPN-00006', 'KDS-00001', 6300, 'School Fees', 'card', 1, '2021-07-06 14:55:36'),
(11, '25455950', 'SPN-00006', 'KDS-00000', 6500, 'School Fees', 'card', 1, '2021-07-06 17:30:01'),
(12, '130346045', 'SPN-00006', 'KDS-00000', 6500, 'School Fees', 'card', 1, '2021-07-06 17:33:21'),
(13, '503361278', 'SPN-00006', 'KDS-00000', 700, 'School Fees', 'card', 1, '2021-07-06 17:35:37'),
(14, '851892410', 'SPN-00006', 'KDS-00001', 6000, 'School Fees', 'card', 1, '2021-07-06 17:38:12'),
(15, '317787398', 'SPN-00006', 'KDS-00001', 1000, 'School Fees', 'wallet', 1, '2021-07-07 10:40:44'),
(16, '6118561', 'SPN-00006', 'KDS-00000', 1000, 'School Fees', 'wallet', 1, '2021-07-07 10:43:28'),
(17, '80316172', 'SPN-00006', 'KDS-00000', 1000, 'School Fees', 'wallet', 1, '2021-07-07 10:44:41'),
(18, '210831183', 'SPN-00006', 'KDS-00003', 70000, 'food items', 'card', 1, '2021-08-11 10:47:07'),
(19, '239166264', 'SPN-00006', 'KDS-00003', 50300, 'clothe items', 'wallet', 1, '2021-08-11 11:02:40'),
(20, '708817794', 'SPN-00006', 'KDS-00003', 10000, 'food items', 'card', 1, '2021-08-11 11:09:44'),
(21, '346007828', 'SPN-00006', 'KDS-00003', 5000, 'clothe items', 'card', 1, '2021-08-11 11:13:54'),
(22, '634279417', 'SPN-00006', 'KDS-00003', 1000, 'clothe items', 'wallet', 1, '2021-08-11 11:18:31'),
(23, '874336517', 'SPN-00006', 'KDS-00003', 1000, 'clothe items', 'wallet', 1, '2021-08-11 11:21:32'),
(24, '102411065', 'SPN-00006', 'KDS-00003', 1000, 'clothe items', 'wallet', 1, '2021-08-11 11:44:12'),
(25, '319050202', 'SPN-00006', 'KDS-00003', 500, 'clothe items', 'wallet', 1, '2021-08-11 11:50:34'),
(26, '868208293', 'SPN-00006', 'KDS-00000', 1000, 'School Fees', 'wallet', 1, '2021-08-11 11:57:24'),
(27, '960251666', 'SPN-00006', 'KDS-00000', 1000, 'School Fees', 'wallet', 1, '2021-08-11 12:00:28'),
(28, '798872065', 'SPN-00006', 'KDS-00003', 10000, 'hello', 'card', 1, '2021-08-11 12:29:06'),
(29, '740756183', 'SPN-00006', 'KDS-00003', 500, 'hello', 'wallet', 1, '2021-08-11 12:38:23'),
(30, '805062018', 'SPN-00006', 'KDS-00003', 100, 'hello', 'wallet', 1, '2021-08-11 12:40:40'),
(31, '648113721', 'SPN-00006', 'KDS-00003', 100, 'hello', 'wallet', 1, '2021-08-11 12:42:01'),
(32, '497391088', 'SPN-00006', 'KDS-00003', 100, 'hello', 'wallet', 1, '2021-08-11 12:43:43'),
(33, '594550401', 'SPN-00006', 'KDS-00003', 200, 'hello', 'wallet', 1, '2021-08-11 12:49:09'),
(34, '343444052', 'SPN-00006', 'KDS-00003', 1000, 'hello', 'card', 1, '2021-08-11 12:51:48'),
(35, '420357120', 'SPN-00006', 'KDS-00003', 6000, 'hello', 'wallet', 1, '2021-08-11 17:39:11');

-- --------------------------------------------------------

--
-- Table structure for table `kids`
--

CREATE TABLE `kids` (
  `id` bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `kid_id` varchar(256) NOT NULL,
  `category` varchar(100) NOT NULL,
  `fname` varchar(300) NOT NULL,
  `mname` varchar(300) NOT NULL,
  `lname` varchar(300) NOT NULL,
  `dob` date NOT NULL,
  `age` bigint(20) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state_o` varchar(100) NOT NULL,
  `state_r` varchar(100) NOT NULL,
  `lga` varchar(100) NOT NULL,
  `email` varchar(300) NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `school_name` varchar(300) NOT NULL,
  `los` varchar(300) NOT NULL,
  `class` varchar(300) NOT NULL,
  `school_address` text NOT NULL,
  `other_school_details` text NOT NULL,
  `school_fees` text NOT NULL,
  `parent_title` varchar(100) NOT NULL,
  `parent_name` varchar(100) NOT NULL,
  `parent_email` varchar(300) NOT NULL,
  `parent_telephone` varchar(100) NOT NULL,
  `parent_address` text DEFAULT NULL,
  `story` text NOT NULL,
  `goal` text NOT NULL,
  `bc` varchar(300) NOT NULL,
  `profile_photo` varchar(300) NOT NULL,
  `percent` double DEFAULT 0,
  `remaining` double DEFAULT 0,
  `total_paid` double DEFAULT 0,
  `expenses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `editted_by` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `is_kid` tinyint(1) NOT NULL DEFAULT 0,
  `is_paid` int(11) NOT NULL DEFAULT 0,
  `last_edit` datetime DEFAULT NULL,
  `date_joined` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT NULL,
  `adopted_by` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --
-- -- Dumping data for table `kids`
-- --

INSERT INTO `kids` (`id`, `kid_id`, `category`, `fname`, `mname`, `lname`, `dob`, `age`, `gender`, `country`, `state_o`, `state_r`, `lga`, `email`, `telephone`, `address`, `school_name`, `los`, `class`, `school_address`, `other_school_details`, `school_fees`, `parent_title`, `parent_name`, `parent_email`, `parent_telephone`, `parent_address`, `story`, `goal`, `bc`, `profile_photo`, `percent`, `remaining`, `total_paid`, `expenses`, `editted_by`, `is_active`, `is_kid`, `is_paid`, `last_edit`, `date_joined`, `created_by`, `adopted_by`) VALUES
(2, 'KDS-00002', 'Kids To Sports', 'David', ' ADESINA ', ' Matt-Ojo ', '1942-06-04', 0, 'Male', 'Nigeria-131', ' Edo ', ' Abuja Federal Capital ', 'Amac', ' fwrty@gmail.com ', '+234-0809143269', ' Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F ', 'Royal Rainbow Academy', 'Secondary-1', '10th grade (ss1)', 'Lugbe', '', '0', ' Father ', '', ' omoregbe4lord@gmail.com ', '8033231217', ' Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F ', ' Blah ', ' Blah ', '/doc/bc/d8b63196b1f4539a855a0ce3596da459.', '/images/profile/kids/a06e3cf108a21cbb61d4187e925ec583.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00024', 'SPN-00006'),
(3, 'KDS-00003', 'Kids To School', 'Idris', ' rihanna ', ' ozemeyi ', '2019-11-09', 2, 'Female', 'Nigeria-131', 'Kogi', 'Ogun', 'Ado odo ota', 'saliuidris25@gmail.com', '+234-08064598117', '', 'Not yet', 'Primary-0', 'null', 'Sango ota', '', '350000', 'Father', 'Yanny dada', 'saliuidris25@gmail.com', '8064598117', ' 7 ajegunle Street off ijoko road sango ota ogun State ', ' My daughter is old enough to start School but I don&#039;t have the money to register her into one ', ' I want kids to school to kindly assist me with my daughter education ', '/doc/bc/52dad51a7848e3b360bfd1a03031429f.jpg', '/images/profile/kids/e89ac9a6f2a2a5fa8f4cb3889b2a2b4a.jpg', 1.7751479289940828, 332000, 0, '{\"expenses\":[{\"ename\":\"Food Items\",\"evalue\":\"120000\",\"edesc\":\"for food\"},{\"ename\":\"clothe items\",\"evalue\":\"200000\",\"edesc\":\"clothe\"},{\"ename\":\"hello\",\"evalue\":\"12000\",\"edesc\":\"yh\"}]}', 'ENV-00019', 1, 1, 0, '2021-08-11 12:08:10', '2021-06-07 17:32:46', 'ENV-00019', NULL),
(4, 'KDS-00004', 'Kids To School', 'Aderbare', ' Sodiq ', ' Diekola ', '2007-03-15', 0, 'Male', 'Nigeria-131', ' Lagos ', ' Lagos ', 'Kosofe lga', ' akanilateef@gmail.com ', '+234-08136005828', ' 5 ajegunle Street off ijoko road sango ota ', 'Sam o nursery and primary school', 'Secondary-1', '8th grade (jss2)', 'Lagos', '', '0', ' Father ', '', ' Akanilateef@gmail.com ', '8136005828', ' 5 ajegunle street off ijoko road sango ota ', ' I lost my job,and couldn&#039;t afford to pay my son school fees ', ' Kids to school can help me with my son&#039;s education ', '/doc/bc/639657e358a75d40d4a87eff9581b36e.jpg', '/images/profile/kids/01c8b32309bc602cddf2a19a10855328.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(5, 'KDS-00005', 'Kids To School', 'Soliu', ' Akeem ', ' Adeiza ', '2013-09-25', 0, 'Male', 'Nigeria-131', ' Kogi ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08141911957', ' 18 owoseni street temidire sango ota ', 'Better way nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Sango ota', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8141911957', ' 18 owoseni street temidire sango ota ', ' I could not afford to pay my children school fees due to financial meltdown ', ' I will be glad if kids to school can help me with my children school fees ', '/doc/bc/deda9f90e48ad9da1f28180a230fcbee.jpg', '/images/profile/kids/f48f860f864e5b364ce090c4aa0a711d.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(6, 'KDS-00006', 'Kids To School', 'Soliu', ' Kehinde ', ' Otuoze ', '2016-04-10', 0, 'Male', 'Nigeria-131', ' Kogi ', ' Ogun ', 'Ado odo ota', ' abolajiqudus3@gmail.com ', '0', ' 18 owoseni street temidire sango ota ', 'Better way nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Sango ota', '', '0', ' Father ', '', ' Abolajiqudus3@gmail.com ', '8141911957', ' 18 owoseni street temidire sango ota ', ' I couldn&#039;t afford to pay my son&#039;s school fees,I was very glad when heard about kids to school ', ' I pray kids to can help me with my children school expenses ', '/doc/bc/be87e9c5b589c76ccd1c1c18bf6d0025.jpg', '/images/profile/kids/22977c5e45bb69e4da54c392b6f66136.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(7, 'KDS-00007', 'Kids To School', 'Bello', ' Ramadan ', ' Isiaq ', '2018-05-17', 0, 'Male', 'Nigeria-131', ' Kwara ', ' Ogun ', 'Ado odo ota', ' Arinolabello@gmail.com ', '+234-09068661652', ' 6,Dpo quarter onihale ', 'Omotayo nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Onihale', '', '0', ' Mother ', '', ' arinolabello@gmail.com ', '9068661652', ' 6, Dpo quarter onihale ', ' Financial challenges ', ' I want kids to school to help me my son school expenses ', '/doc/bc/05e6a0a6a364f3587d37b5776f8cd7ac.jpg', '/images/profile/kids/39561fcc7602556afbfd2b7d6d653e38.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(8, 'KDS-00008', 'Kids To School', 'Adegoke Fatia Asabi', ' Fatiat ', ' Asabi ', '2005-08-02', 0, 'Female', 'Nigeria-131', ' Ogun ', ' Oyo ', 'Ado odo ota', ' arinolabello@gmail.com ', '+234-09068661652', ' 6, Dpo quarter onihale ', 'Omotayo', 'Secondary-1', '7th grade (jss1)', 'Onihale', '', '0', ' Sister ', '', ' arinolabello@gmail.com ', '9068661652', ' 6, Dpo quarter onihale ', ' Financial challenges ', ' I want kids to school to help me with my sister education ', '/doc/bc/c99533451c17b518bb5588b8587d9362.jpg', '/images/profile/kids/223e36ab5e1eb73185bf85be91b42e82.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(9, 'KDS-00009', 'Kids To Sports', 'Ojoawo', ' Korede ', ' David ', '2010-08-31', 0, 'Male', 'Nigeria-131', ' Oyo ', ' Ogun ', 'Ado odo ota', ' ojoawosamsonoluwaseun@gmail.com ', '+234-07066442894', ' 10 ifelodun street second power line off Ilogbo road ota ', 'Iwoye community high school', 'Secondary-1', '7th grade (jss1)', 'Iwoye', '', '0', ' Father ', '', ' ojoawosamsonoluwaseun@gmail.com ', '7066442894', ' 10 ifelodun street second power line off Ilogbo road ota ', ' My kid have so much passion for football. And he&#039;s very good at it ', ' I believe kids to school can help me to achieve my son&#039;s dream ', '/doc/bc/b6d3a7cefbe15285cb90778a4b774a59.jpg', '/images/profile/kids/2efb94367c0d75fc8320ab5e8baf4155.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(10, 'KDS-00010', 'Kids To School', 'Abubakar', ' Wumu ', ' Bukunmi ', '2015-03-24', 0, 'Female', 'Nigeria-131', ' Kwara ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09068946763', ' 2 Mike badejo ', 'Destiny land nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Hassan idowu', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '9068946763', ' 2,Mike badejo street arinko sango ota ogun State Nigeria ', ' Financial challenges ', ' Help me with school expenses ', '/doc/bc/36593ba22262545579d0859602d08b9c.jpg', '/images/profile/kids/e133c62b06cbabe07ed61dbdfabb69a6.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(11, 'KDS-00011', 'Kids To Tech', 'Hammed', ' Nojim ', ' Odunayo ', '2008-12-24', 0, 'Male', 'Nigeria-131', ' Oyo ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09068946763', ' 2,Mike badejo street arinko sango ota ogun State ', 'Sango ota high school', 'Secondary-1', '8th grade (jss2)', 'Sango ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '9068946763', ' 2,Mike badejo street arinko sango ota ogun State Nigeria ', ' Financial challenges ', ' Help my son to learn work ', '/doc/bc/3b09a864796fbf90c15b75fed4bc00b0.jpg', '/images/profile/kids/63e154e149bfff153d6f7740cb4cdd71.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(12, 'KDS-00012', 'Kids To School', 'Aransiola', ' Ayomide ', ' Bose ', '2009-11-15', 0, 'Female', 'Nigeria-131', ' Kwara ', ' Ogun ', 'Ado odo Ota', ' solomonolalekan1710@gmail.com ', '+234-08036414038', ' 8, ifelodun street second power line off Ilogbo road ota ', 'Avoside nursery and primary school', 'Secondary-1', '8th grade (jss2)', 'Ireakari', '', '0', ' Father ', '', ' solomonolalekan1710@gmail.com ', '8036414038', ' 8, ifelodun street ireakari ', ' Financial challenges ', ' If kids to school can help me with my daughter school expenses ', '/doc/bc/0b3af1aaeded58675f5df1dee4769616.jpg', '/images/profile/kids/9732a7fbf7a5568b79ebcf705cd7ed4b.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(13, 'KDS-00013', 'Kids To School', 'Aransiola', ' Blessing ', ' Victoria ', '2012-01-02', 0, 'Female', 'Nigeria-131', ' Kwara ', ' Ogun ', 'Ado odo ota', ' solomonolalekan1710@gmail.com ', '+234-08036414038', ' 8, ifelodun street second power line off Ilogbo road ota ', 'Avoside nursery and primary school', 'Primary-0', '4th grade (Primary 4)', 'Ireakari', '', '0', ' Father ', '', ' solomonolalekan1710@gmail.com ', '8036414038', ' 8, ifelodun street ireakari ota ', ' Financial challenges ', ' I want kids to school to help me with my children school fees ', '/doc/bc/cb09a260daa9cc3f3f15e20d0e77e111.jpg', '/images/profile/kids/d07135479e9d92340faff110e805547b.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(14, 'KDS-00014', 'Kids To School', 'Aransiola', ' Samuel ', ' Oluwaferanmi ', '1914-07-11', 0, 'Male', 'Nigeria-131', ' Kwara ', ' Ogun ', 'Ado odo ota', ' solomonolalekan1710@gmail.com ', '+234-08036414038', ' 8, ifelodun street second power line off Ilogbo road ota ', 'Avoside nursery and primary school', 'Primary-0', '2nd grade (Primary 2)', 'Ireakari', '', '0', ' Father ', '', ' solomonolalekan1710@gmail.com ', '8036414038', ' 8, ifelodun street second power line off Ilogbo road ota ', ' Financial challenges ', ' I want kids to school to help me with my son&#039;s education ', '/doc/bc/f797e8e3d93ca2988e3ef102ac1f7234.jpg', '/images/profile/kids/a41836e251fc59728320b36f04c420b6.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(15, 'KDS-00015', 'Kids To Sports', 'Olasupo', ' Afeez ', ' Ayomide ', '2004-04-16', 0, 'Male', 'Nigeria-131', ' Oyo ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08180172991', ' 4,idowu close off second power line Sango ota ogun State Nigeria ', 'Community high school', 'Secondary-1', '12th grade (ss3)', 'Sango ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '8167221369', ' 4,idowu close off second power line Sango ota ogun State Nigeria ', ' He&#039;s very good in football but I don&#039;t have the money to finance his career,I was very glad when I heard about kids to school ', ' I will be glad if kids to school can help my son to achieve His football career. ', '/doc/bc/3208b8bab8ca3918bd1eb0f7a9570b39.jpg', '/images/profile/kids/72abd5c276477d03ca198d27ecde3d1b.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(16, 'KDS-00016', 'Kids To School', 'Hamzat', ' Abdulrazaq ', ' Aremu ', '2004-06-06', 0, 'Male', 'Nigeria-131', ' Osun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-07086590408', ' 5 ajegunle street off ijoko road sango ota ogun State ', 'Ansarudeen comprehensive college Ota', 'Tertiary-2', '1st year', 'Ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '7086590408', ' 5 ajegunle street off ijoko road sango ota ', ' Financial challenges ', ' I will be glad if kids to school can help me with my son&#039;s education ', '/doc/bc/b283ac9bc57ce723d456f408dd800fd6.jpg', '/images/profile/kids/a5601b048ee0eef967332f4cd0875825.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(17, 'KDS-00017', 'Kids To School', 'Hamzat', ' Ibrahim ', ' Adekunle ', '2002-01-23', 0, 'Male', 'Nigeria-131', ' Oyo ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-07086590408', ' 5 ajegunle street off ijoko road sango ota ', 'Ansarudeen comprehensive college Ota', 'Tertiary-2', '1st year', 'Ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '7086590408', ' 5 ajegunle street off ijoko road sango ota ', ' I&#039;m a single mother of two, things is so difficult for us,I was happy when I heard about kids to school ', ' I will be glad if kids to school can help me with my son&#039;s education ', '/doc/bc/aa19b5c0364cd876411c6a932beef7a1.jpg', '/images/profile/kids/c4c1bad22bc7ea7463338cff1146e12b.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(18, 'KDS-00018', 'Kids To School', 'Johnson', ' Deborah ', ' Dunmininu ', '2018-01-22', 0, 'Female', 'Nigeria-131', ' Ondo ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09064358412', ' 9, ajegunle Street off ijoko road sango ota ogun State Nigeria ', 'Farida nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '9064358412', ' 9, ajegunle street off ijoko road sango ota ogun State Nigeria ', ' Financial challenges ', ' I want kids to school to kindly assist me with my daughter&#039;s school expenses ', '/doc/bc/5de4beee9cff5f8218234640eb174a84.jpg', '/images/profile/kids/f87017b1e0a55cdfc01467b11524d0a6.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(19, 'KDS-00019', 'Kids To School', 'Bello', ' Basirat ', ' Ajoke ', '2010-07-11', 0, 'Female', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' bigbello02@yahoo.com ', '+234-08023324404', ' 6, ajegunle Street off ijoko road sango ota ogun State Nigeria ', 'Eminence nursery and primary school', 'Secondary-1', '7th grade (jss1)', 'Ota', '', '0', ' Father ', '', ' Bigbello02@yahoo.com ', '8039628294', ' 6, ajegunle street off ijoko road sango ota ogun State Nigeria ', ' Financial challenges ', ' I will be glad if kids to school can help me with my daughter&#039;s school expenses.God bless the founder. ', '/doc/bc/9c526dd05e25be5ea349a2b2b392e197.jpg', '/images/profile/kids/f350de31d56b3ce4134b7722b60fc038.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(20, 'KDS-00020', 'Kids To School', 'Olokode', ' Farid ', ' Ayomide ', '2014-03-17', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' bigbello02@yahoo.com ', '+234-08064063232', ' 151 abeokuta express way ', 'Gagantuan nursery and primary school', 'Primary-0', '2nd grade (Primary 2)', 'Sango ota', '', '0', ' Mother ', '', ' Bigbello02@yahoo.com ', '8064063232', ' 151 abeokuta express way ', ' Financial challenges ', ' I will be glad if kids to school can help me with my son&#039;s education ', '/doc/bc/760231326e545d6441cdb9d066ef0912.jpg', '/images/profile/kids/dfb0301f91ef922de352921521463ab5.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(21, 'KDS-00021', 'Kids To Sports', 'Test', ' test ', ' Test ', '2000-05-06', 0, 'Male', ' Dominican Republic ', ' San Juan ', ' La Vega ', 'blah blah', ' davidmatthew708@gmail.com ', '0', ' Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F ', 'Royal Rainbow Academy, ota', 'Secondary-1', '8th grade (jss2)', 'heloooooooo', '', '0', ' Father ', '', ' omoregbe44lord@gmail.com ', '8033231217', ' Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F ', ' blah ', ' blah ', '/doc/bc/e57cd54674537d694358697c466253cd.', '/images/profile/kids/1da51ae72432734e412e1f5a6b8c4dbf.png', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00024', 'SPN-00006'),
(22, 'KDS-00022', 'Kids To School', 'Dosu', ' Taye ', ' Darasimi ', '2016-10-19', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08145773445', ' Ifelodun oko bale area off Ilogbo road ota ogun State Nigeria ', 'Kikelomo nursery/primary school', 'Primary-0', '1st grade (Primary 1)', 'Okobale ota', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8145773445', ' Ifelodun street off Ilogbo Ota ', ' Financial challenges,things have not been the same for me,my kids have been sent from school due to inability to pay their school fees ', ' I want kids to school to assist me with my son&#039;s education ', '/doc/bc/342efe17ab8e04c603526d2328f97b13.', '/images/profile/kids/6c1ad709058bc39a9311897c2e9813f2.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(23, 'KDS-00023', 'Kids To School', 'Dosu', ' Kehinde ', ' Timileyin ', '2016-10-19', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08145773445', ' Ifelodun street off Ilogbo road ota ogun State Nigeria ', 'Kikelomo nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Okobale', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8145773445', ' Ifelodun street off Ilogbo road ota ogun State Nigeria ', ' Financial challenges,my kids have sent several times because of my inability to pay their school fees ', ' I want kids to school to help me with my son&#039;s education ', '/doc/bc/64363469f72b6fc0c8004ee91b58418a.', '/images/profile/kids/c97fb425a22f43e825e9ec047a987e95.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(24, 'KDS-00024', 'Kids To Sports', 'Tajudeen', ' faruk ', ' dimeji ', '2004-07-11', 17, 'Male', 'Nigeria-131', 'Ogun', 'Ogun', 'Ado odo ota', 'saliuidris25@gmail.com', '+234-08162093997', '', 'Community school', 'Secondary-1', '11th grade (ss2)', 'Abule iroko', '', '300000', 'Father', 'Saliu ummar', 'saliuidris25@gmail.com', '8126093997', ' 5,akinde tawakalitu street abule iroko sango ota ', ' There is no helper and my salary is not enough for me to sponsor son&#039;s education, ', ' I want help from kids to school,to help me with my son&#039;s education ', '/doc/bc/95269e1b849160cad20d3880e9bc8359.', '/images/profile/kids/afca5cb8277c437e4285ae1e6e7c87b6.jpg', 0, 0, 0, '{\"expenses\":[{\"ename\":\"School Fees\",\"evalue\":\"300000\",\"edesc\":\"for school fees\"}]}', 'ADMS-00001', 1, 1, 0, '2021-08-26 18:18:28', '2021-06-07 17:32:46', 'ENV-00019', NULL),
(25, 'KDS-00025', 'Kids To School', 'Ajayi', ' Abdulsamod ', ' O. ', '2012-12-12', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-07033433938', ' 3,ajayi street ilupewo ota ', 'Sydam model school', 'Primary-0', '4th grade (Primary 4)', 'Ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '7033433938', ' 3,ajayi close ilupewo ota ', ' To allow him move on with his education ', ' By help my son to complete his academic career ', '/doc/bc/b8d8083394d8fdc636f95e782dcdc2c7.', '/images/profile/kids/166559f782f647c8696f6b96726cd257.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(26, 'KDS-00026', 'Kids To School', 'Olamiposi', ' Fasal ', ' Obadimu ', '2015-12-10', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09078551939', ' 18,unity close osi ota ', 'Raising hope nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Abebi ota', '', '0', ' Mother ', '', ' saliuidris25@gmail.com ', '9078551939', ' 18 unity close osi quarters ota ', ' I&#039;m a single mother ', ' My son&#039;s education ', '/doc/bc/b7ea17f01d69c789aa19fbcdae4795da.', '/images/profile/kids/6dc9265a17bfd0f6d522e201a0e1dfc0.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(27, 'KDS-00027', 'Kids To School', 'Aderounmu', ' Rokibat ', ' Rokibat ', '2008-03-09', 0, 'Female', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08161183121', ' 8,ago egun street konifewo ogun State ', 'Seat of glory secondary school', 'Secondary-1', '9th grade (jss3)', 'Konifewo', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '7035534771', ' 8,ago egun street konifewo ogun State ', ' Can&#039;t afford to send her to school due to financial situation ', ' I want kids to school to help me with my daughter&#039;s school expenses ', '/doc/bc/610121f5f997e4fe5efe6478788bbe43.', '/images/profile/kids/a062cb77cc9057d2647813a0d29bef87.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(28, 'KDS-00028', 'Kids To School', 'David', ' Adetunji ', ' Adetunji ', '2019-04-29', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08116437404', ' 45,Ajayi Egan road  onibukun ota ', 'Mercy of land nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Onibukun', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8116437404', ' 45,Ajayi Egan road onibukun ota ', ' Need support for my son&#039;s education ', ' I need help ', '/doc/bc/15313ffccd6270041a8a462c27fb673d.', '/images/profile/kids/808d420a5d645a94fa9f23dd81f828c3.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(29, 'KDS-00029', 'Kids To School', 'Ayo', ' Akorede ', ' Akorede ', '2017-06-17', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09033734003', ' Iju ota ogun State ', 'Super topmost school', 'Primary-0', '1st grade (Primary 1)', 'Igberen', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '9076308437', ' Iju Ota ogun State ', ' Need support for his education ', ' I want kids to school to help me to take responsibility of his education ', '/doc/bc/821e40c34d0e5610dc6fd2c4795ee2e8.', '/images/profile/kids/d7de1ff7947ee197c210c477968c4233.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(30, 'KDS-00030', 'Kids To School', 'Faruq', ' Kareem ', ' Kareem ', '2015-12-12', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-07064222053', ' 15,orenco oyedele street London estate ijoko ', 'Mercy of God nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Ijoko', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8037219239', ' 15, orenco oyedele street London estate ijoko ota ', ' Paying of school fees ', ' Need help for paying of school fee ', '/doc/bc/bab7c6ca8cce4020d4a693ea886677d9.', '/images/profile/kids/b9e67ad6821c71800fa838e34fb7e779.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(31, 'KDS-00031', 'Kids To School', 'Oderinde', ' Okiki ', ' Okiki ', '2013-06-12', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-08062301577', ' Abimbola estate ', 'Living Grace', 'Primary-0', '1st grade (Primary 1)', 'Living Grace street abimbola estate', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '9040094614', ' Abimbola estate ', ' Paying of school fees and financing his education ', ' Payment of school fees ', '/doc/bc/652030f0921ceafa566f443f0d6cbaf8.', '/images/profile/kids/8409c1ad35db63a1d00ce94027ed278c.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(32, 'KDS-00032', 'Kids To School', 'Abdulwaris', ' Adeyemi ', ' Yusuf ', '2016-02-26', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09151774077', ' 24,igamode road ota ogun State ', 'The professional school', 'Primary-0', '1st grade (Primary 1)', 'Idiroko road ota', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8036071706', ' 24, igamode road ota ogun State ', ' We have a bright kid with amazing future but we are financially unstable to encourage him ', ' Kid to school to help us ', '/doc/bc/12e14edbf1ff4bb781ae6f961ba70866.', '/images/profile/kids/f7beda4ac058980b6772edc1b7b2ac02.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(33, 'KDS-00033', 'Kids To School', 'Amirat', ' Adams ', ' Amirat ', '2016-06-27', 0, 'Female', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09066222183', ' 2,ago igbira ahmadiya ota ', 'The professional school', 'Primary-0', '1st grade (Primary 1)', 'Idiroko road ota', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '7017546960', ' 2,ago igbira ahmadiya ota ', ' We are financially down to finance her education ', ' Kid to school can help us with her education ', '/doc/bc/1f0b2810c6575a1dec2ac644237e0951.', '/images/profile/kids/e2b7c8339036de7561c09e78b2a31c6f.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(34, 'KDS-00034', 'Kids To School', 'Ojo', ' Opeyemi ', ' Opeyemi ', '2010-05-09', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-07014291645', ' Adeyemi street atan ota ', 'Greater tomorrow children school', 'Primary-0', '4th grade (Primary 4)', 'Igbolomi atan ota ogun State', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '7035364833', ' Adeyemi street atan ota ogun State ', ' We need financial assist for his education ', ' Kid to school should help us with his education ', '/doc/bc/e7affe54e87d796143b91979738f87b8.', '/images/profile/kids/2c03d06e19a2ace559f4cea729815c3c.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(35, 'KDS-00035', 'Kids To School', 'Kareem', ' Babatunde ', ' Babatunde ', '2012-12-23', 0, 'Male', 'Nigeria-131', ' Ogun ', ' Ogun ', 'Ado odo ota', ' saliuidris25@gmail.com ', '+234-09034363789', ' 8, ireakari atan Ota ', 'Bayholder nursery and primary school', 'Primary-0', '1st grade (Primary 1)', 'Ilogbo Ota ogun State', '', '0', ' Father ', '', ' saliuidris25@gmail.com ', '8036620832', ' 8, ireakari atan Ota ', ' I need help for his education ', ' I want kids to school to help me with his education ', '/doc/bc/cd2dc535303f4be6486d601be1e94901.', '/images/profile/kids/063a09d24072ac3a42fb75fc7699ffd4.jpg', 0, 0, 0, '', '', 1, 1, 0, NULL, '2021-06-07 17:32:46', 'ENV-00019', NULL),
(44, 'KDS-00036', 'Kids To School', 'Mercy', 'Idowu', 'Daniels', '2003-07-24', 18, 'Female', 'Nigeria-131', 'Kwara', 'Ogun', 'Ota Ogun', '', '+234-', '', 'Covenant university', 'Tertiary-2', '2nd Year', 'Km 10 idiroko rd, 112104, ota', '', '1025000', 'Brother', 'John daniels', 'johndaniels@gmail.com', '08077645342', NULL, '', '', '', '/images/profile/kids/ff608ba7-a8ba-4fbe-afc7-e2401025032c.png', 0, 0, 0, '{\"expenses\":[{\"ename\":\"School Fees\",\"evalue\":\"875000\",\"edesc\":\"for the session\"},{\"ename\":\"school Provision\",\"evalue\":\"150000\",\"edesc\":\"School Provisions for the session milk, milo, lipton\"}]}', 'ENV-00013', 1, 1, 0, '2021-08-10 15:19:59', '2021-08-10 11:23:03', 'ENV-00013', NULL),
(45, 'KDS-00045', 'Kids To School', 'Test', '', 'Test', '2007-08-06', 14, 'Female', 'Nigeria-131', 'Kano', 'Ogun', '', '', '+234-', '', 'Rainbow academy', 'Primary-0', '3rd grade', 'Abuja, lugbe fedral housing estate\nplot 904 sector f', '', '400000', 'Step father', 'Faraday michael', 'faraday@gmail.com', '08077645342', NULL, '', '', '', '/images/profile/kids/b0e49aa1-79ae-479e-942e-bd42a506f340.jpg', 0, 0, 0, '{\"expenses\":[{\"ename\":\"School Fees\",\"evalue\":\"300000\",\"edesc\":\"school fees for the session\"},{\"ename\":\"school Provision\",\"evalue\":\"100000\",\"edesc\":\"milk, milo, golden morn\"}]}', '', 0, 1, 0, NULL, '2021-08-11 17:29:41', 'ENV-00013', NULL),
(46, 'KDS-00046', 'Kids To School', 'David', '', 'Matt-ojo', '2007-06-04', 14, 'Female', 'Nigeria-131', 'Enugu', 'Ebonyi', '', 'davidmatthew708@gmail.com', '+234-', '', '', '', '', '', '', '5000', 'Mother', 'Faraday michael', 'faraday@gmail.com', '08077645342', NULL, '', '', '', '/images/profile/kids/67b71ca7-d956-45c2-8ecd-654bea7795ae.jpg', 0, 0, 0, '{\"expenses\":[{\"ename\":\"School Fees\",\"evalue\":\"5000\",\"edesc\":\"school fees for the session\"}]}', '', 1, 1, 0, NULL, '2021-08-11 17:36:17', 'ENV-00013', NULL);

--------------------------------------------------------


Table structure for table `kts_envoy`


CREATE TABLE `kts_envoy` (
  `id` bigint(20) NOT NULL PRIMARY KEY,
  `fname` varchar(256) NOT NULL,
  `lname` varchar(256) NOT NULL,
  `mname` varchar(256) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state_o` varchar(100) NOT NULL,
  `state_r` varchar(100) NOT NULL,
  `loga` varchar(100) NOT NULL,
  `email` varchar(256) NOT NULL,
  `telephone` bigint(20) NOT NULL DEFAULT 0,
  `address` text NOT NULL,
  `identification` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `document` varchar(300) NOT NULL,
  `picture` varchar(300) NOT NULL,
  `token` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kts_envoy`
--

INSERT INTO `kts_envoy` (`id`, `fname`, `lname`, `mname`, `dob`, `gender`, `country`, `state_o`, `state_r`, `loga`, `email`, `telephone`, `address`, `identification`, `password`, `document`, `picture`, `token`) VALUES
(2, 'David', 'Matt-Ojo', 'Adesina', '2000-06-04', 'Male', 'Nigeria', 'Edo', 'Abuja Federal Capital', 'Municipal', 'davidmatthew708@gmail.com', 8091414443, 'plot 904', 'National Id', '$2y$10$U7cLdA4qbnbE2RzF4pFdFeyiJzu5HgZdk2gsGgj9mOHV7ZLpCidPe', '', '', ''),
(3, 'David', 'Matt-Ojo', 'ADESINA', '1917-07-10', 'Male', 'Nigeria', 'Edo', 'Abuja Federal Capital', 'AMAC', 'davidmatthew708@gmail.com', 23408091414443, 'Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F', ' Passport ', '$2y$10$91dSnPIc/otJKDlai4piFerigKm9tEJrijQoMCgnbkhwBTdWXxx9W', 'static/Documents/bfd55e6f98cb970a8d8b4dfcde227b2d.pdf', 'static/images/profile-pic/1accf05c981c54bef460f6b996a80fb7.jpeg', ''),
(4, 'David', 'Matt-Ojo', 'ADESINA', '1917-07-10', 'Male', 'Nigeria', 'Edo', 'Abuja Federal Capital', 'AMAC', 'davidmatthew708@gmail.com', 23408091414443, 'Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F', ' Passport ', '$2y$10$n6GUwtnfoZPFkuI3icmVW.MStWuE/nIXySzHnkh/ywSPbBjzNSiqK', 'static/Documents/329bf0aa3f0d9d5fb8cec984139ce9d4.pdf', 'static/images/profile-pic/981b526bfad09e33818802c86acb74d2.jpeg', ''),
(5, 'David', 'Matt-Ojo', 'ADESINA', '1917-07-10', 'Male', 'Nigeria', 'Edo', 'Abuja Federal Capital', 'AMAC', 'davidmatthew708@gmail.com', 23408091414443, 'Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F', ' Passport ', '$2y$10$Pfe8GiuuuuLnT9GTrJKeh.04YDzZoFemrDbCMsCThSAyv.0sVPRoC', 'static/Documents/898ff68f64dde2f1d2ab619ccf79c6d2.pdf', 'static/images/profile-pic/940cf3d0f1e7c66d02d599c204813a37.jpeg', ''),
(6, 'David', 'Matt-Ojo', 'ADESINA', '1913-07-07', 'Male', 'Nigeria', 'Ekiti', 'Bayelsa', 'Abuja Federal Capital Territor', 'davidmatthew708@gmail.com', 23408091414443, 'Abuja, Lugbe Fedral Housing Estate↵plot 904 Sector F', ' Passport ', '$2y$10$arkRB2uh.2ussaEcRvgTMOo90rkUV1rshdHlZKMRZ1gsGEPz5N7qi', 'static/Documents/33243d00292374ee799c8ec7cdec4b65.jpg', 'static/images/profile-pic/04a486c0e8930e90c8a9365dbbd5ea66.jpg', '9245b34090ade56f8fcaee8d7c63de90'),
(7, 'David', 'Matt-Ojo', 'ADESINA', '1913-07-07', 'Male', 'Nigeria', 'Ekiti', 'Bayelsa', 'Abuja Federal Capital Territor', 'davidmatthew708@gmail.com', 23408091414443, 'Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F', ' Passport ', '$2y$10$zMzYVeH8vJ9sAhgm6/gIvef1faPo8SMTNUHqoKOn/PzF3CHWL3Cxe', 'static/Documents/c3d9b00b35649dea67636902e2334e52.jpg', 'static/images/profile-pic/96b8ebe7d0df9bcc8338102b4fb794ae.jpg', '3f77d45b2185ba166f668e628396f8bf'),
(8, 'Test', 'Largely', 'hello', '1900-02-03', 'Male', 'Algeria', 'Ain Defla', 'Ain Temouchent', 'Abuja Federal Capital Territor', 'davidmatthew708@gmail.com', 21308091414443, 'Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F', ' National ID ', '$2y$10$f6Jgm9TN7RDxGKV3VUKP5.8LJInZre62.YHQD8Wqi.TWH.VyXCOh.', 'static/Documents/e408f9dcc2e4e9f6f1a65f4f5b659d7c.png', 'static/images/profile-pic/d17dc6e1e8c4a334d629cfb35852827b.png', '2d65415df44a5de1c224deb54f6ab893'),
(9, 'Ameerah', 'Ashir', 'Muhammad', '1995-05-18', 'Female', 'Nigeria', 'Kwara', 'Abuja Federal Capital', 'jabi', 'muhammadameerahashir11@gmail.com', 234, 'Abuja', ' National ID ', '$2y$10$A7Xh6Va8/gFHB0ed6xlDAuAJUEMm0dxm3MN7pC24jwWzFjjBzXhTq', 'static/Documents/ea5b70a4be9a6e111ee4a3a5efa479a1.jpg', 'static/images/profile-pic/71563a5fce2404059cec0228f33d41be.jpg', 'df484f13c6769e113e532b7f20c43649');

--------------------------------------------------------


Table structure for table `kts_form`


CREATE TABLE `kts_form` (
  `id` bigint(20) NOT NULL PRIMARY KEY,
  `category` varchar(100) NOT NULL,
  `fname` varchar(256) NOT NULL,
  `mname` varchar(256) NOT NULL,
  `lanme` varchar(256) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(50) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state_o` varchar(100) NOT NULL,
  `state_r` varchar(100) NOT NULL,
  `loga` varchar(256) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` bigint(20) NOT NULL,
  `address` text NOT NULL,
  `school_name` varchar(256) NOT NULL,
  `school_level` varchar(200) NOT NULL,
  `school_class` varchar(100) NOT NULL,
  `school_location` text NOT NULL,
  `parent_title` varchar(256) NOT NULL,
  `parent_email` varchar(100) NOT NULL,
  `parent_address` text NOT NULL,
  `parent_tel` bigint(20) NOT NULL,
  `story` text NOT NULL,
  `goal` text NOT NULL,
  `envoy` bigint(20) NOT NULL,
  `pp` varchar(300) NOT NULL,
  `bc` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--------------------------------------------------------


Table structure for table `messages`


CREATE TABLE `messages` (
  `id` bigint(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `msg` varchar(200) DEFAULT NULL,
  `category` enum('task_c','task_a','task_d','task_e','task_f','task_u','chat') DEFAULT NULL,
  `count` bigint(20) DEFAULT NULL,
  `seen` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


Dumping data for table `messages`


INSERT INTO `messages` (`id`, `user_id`, `msg`, `category`, `count`, `seen`) VALUES
(7, 'ENV-00013', 'You have 2 Finished Task(s)', 'task_f', 2, 0),
(6, 'ENV-00013', 'You have 2 Finished Task(s)', 'task_f', 2, 1),
(5, 'ENV-00013', 'You have 2 Created Task(s)', 'task_c', 2, 1),
(17, 'ENV-00015', 'You Have 1 unread message from ENV-00013', 'chat', 1, 1),
(16, 'ENV-00013', 'You Have 1 unread message', 'chat', 1, 0),
(15, 'ENV-00015', 'You Have 1 unread message', 'chat', 1, 1),
(14, 'ENV-00015', 'You have 1 Created Task(s)', 'task_c', 1, 0),
(13, 'ENV-00013', 'You have 3 Updated Task(s)', 'task_u', 3, 0),
(18, 'SPN-00006', 'You have 5 Created Task(s)', 'task_c', 5, 0),
(19, 'SPN-00006', 'You have 3 Updated Task(s)', 'task_u', 5, 0),
(20, 'SPN-00006', 'You have 4 Finished Task(s)', 'task_f', 4, 1),
(21, 'SPN-00006', 'You have 1 Deleted Task(s)', 'task_d', 1, 1),
(22, 'ADM-00005', 'You have 17 Unread Messages Sponsor Sponsor - sponsor', 'chat', 17, 0),
(23, 'ADM-00003', 'You have 38 Unread Messages David Ojooh', 'chat', 38, 0),
(24, 'ADM-00002', 'You have 18 Unread Messages Sponsor Sponsor - sponsor', 'chat', 18, 0),
(25, 'ADM-00004', 'You have 23 Unread Messages Sponsor Sponsor - sponsor', 'chat', 23, 0),
(26, 'ENV-00019', 'You have 1 Created Task(s)', 'task_c', 1, 0),
(27, 'ENV-00019', 'You have 1 Finished Task(s)', 'task_f', 1, 0),
(28, 'ENV-00019', 'You have 1 Updated Task(s)', 'task_u', 3, 0),
(29, 'ENV-00019', 'You have 1 Deleted Task(s)', 'task_d', 1, 0),
(30, 'SPN-00006', 'You have 13 Unread Messages Saliu IDRIS', 'chat', 13, 1),
(31, 'ENV-00019', 'You have 8 Unread Messages Sponsor Sponsor - sponsor', 'chat', 8, 0),
(32, 'SPN-00006', 'You Have 1 unread message from Saliu IDRIS', 'chat', 1, 0),
(33, 'ADMS-00001', 'You have 5 Created Task(s)', 'task_c', 5, 0),
(34, 'ADMS-00001', 'You have 2 Finished Task(s)', 'task_f', 2, 0),
(35, 'ADMS-00001', 'You have 6 Updated Task(s)', 'task_u', 5, 0),
(36, 'ADMS-00001', 'You have 1 Deleted Task(s)', 'task_d', 1, 0),
(37, 'ADMS-00001', 'You have 8 Unread Messages Test Testy', 'chat', 8, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notify`
--

CREATE TABLE `notify` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `sender` varchar(256) DEFAULT NULL,
  `receiver` varchar(256) DEFAULT NULL,
  `message_topic` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `category` enum('task','chat') DEFAULT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  `date_done` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `is_complete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notify`
--

INSERT INTO `notify` (`id`, `sender`, `receiver`, `message_topic`, `message`, `category`, `date_created`, `date_done`, `due_date`, `is_complete`) VALUES
(14, 'ENV-00013', 'ENV-00013', 'Notifications section', 'Finish notification Area', 'task', '2021-05-12 13:25:42', '2021-05-12 14:14:10', '2021-05-16 13:25:00', 1),
(15, 'ENV-00013', 'ENV-00013', 'Envoy dashboard', 'Finish envoy dashboard', 'task', '2021-05-12 13:26:16', NULL, NULL, 0),
(19, 'ENV-00013', 'ENV-00015', 'New Chat', '[{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"hello\",\"name\":\"testys\",\"sender_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"how are you\",\"name\":\"testys\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"i am good and you\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"doing great \",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"how is the family\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"family is awesome\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"great just testing the chat\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"ooh how is it going\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"hope its working\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"yh i feel it is\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"awesome so notifications is done\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"yh just to add some design and enter and date\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"okay i am done with the design\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"awesome\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"and notification\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"good good\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"test 1\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"test 2\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"so i think we are all good now\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"yh i think so to check the database\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"so this might not work\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"lets see\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"let us try again\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"okay\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00015\",\"receiver\":\"ENV-00013\",\"msg\":\"should be good\",\"sender_name\":\"Faraday Michael\",\"receiver_name\":\"Soro Roger\"},{\"sender\":\"ENV-00013\",\"receiver\":\"ENV-00015\",\"msg\":\"so it works now\",\"sender_name\":\"Soro Roger\",\"receiver_name\":\"Faraday Michael\"}]', 'chat', '2021-05-14 17:45:07', NULL, NULL, 0),
(32, 'SPN-00006', 'ADM-00005', 'New Chat', '[{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"hello david\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"hey hey\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"are you okay\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"is it working now\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"hep\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"try\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"what did\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"say \",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00005\",\"msg\":\"is it good\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"David Matt-ojo\",\"id\":\"32\"}]', 'chat', '2021-07-02 16:51:36', NULL, NULL, 0),
(33, 'SPN-00006', 'ADM-00004', 'New Chat', '[{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00004\",\"msg\":\"watch a movie\",\"sender_name\":\"Sponsor Sponsor - sponsor\",\"receiver_name\":\"Ryan Paul\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00004\",\"msg\":\"on friday night\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Ryan Paul\",\"id\":\"33\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00004\",\"msg\":\"are you up\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Ryan Paul\",\"id\":\"33\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00004\",\"msg\":\"its good\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Ryan Paul\",\"id\":\"33\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ADM-00004\",\"msg\":\"will you go\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Ryan Paul\",\"id\":\"33\"}]', 'chat', '2021-07-02 20:16:07', NULL, NULL, 0),
(34, 'SPN-00006', 'SPN-00006', 'Cannot sign up', 'yhyh', 'task', '2021-07-02 20:20:38', NULL, '2021-08-08 13:26:00', 0),
(36, 'ENV-00019', 'SPN-00006', 'New Chat', '[{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"hello \",\"sender_name\":\"Saliu IDRIS\",\"receiver_name\":\"Sponsor Sponsor - sponsor\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"i am just testing the chat function\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"i think it should be working perfectly\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"right ?\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"are you online\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"yes i am \",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"nice to hear from you\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"it seems to work fine\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"oh lovely\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"yes it working\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"oh thank God\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"let us try this gain\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"alright here we go\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"what do you think\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"working awesome\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"cool cool\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"nice chat\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"i love your pic\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"thank you i love yours to\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"hello\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"},{\"sender\":\"SPN-00006\",\"receiver\":\"ENV-00019\",\"msg\":\"hi\",\"send_name\":\"Sponsor Sponsor - sponsor\",\"rec_name\":\"Saliu IDRIS\",\"id\":\"36\"},{\"sender\":\"ENV-00019\",\"receiver\":\"SPN-00006\",\"msg\":\"how are you\",\"send_name\":\"Saliu IDRIS\",\"rec_name\":\"Sponsor Sponsor - sponsor\",\"id\":\"36\"}]', 'chat', '2021-07-09 17:58:06', NULL, NULL, 0),
(37, 'ADMS-00001', 'ADMS-00001', 'Make home page dynamic', '> work on dividing the home page into components\n> make components dynamic.\n> store dynamic content in a database', 'task', '2021-08-26 15:43:36', NULL, '2021-08-27 15:50:00', 0),
(39, 'ADMS-00001', 'ADMS-00001', 'Work on video streaming with ztream', 'not related', 'task', '2021-08-26 15:51:16', NULL, NULL, 0),
(40, 'ADMS-00001', 'ADM-00003', 'New Chat', '[{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"hello\",\"sender_name\":\"David Ojooh\",\"receiver_name\":\"Test Testy\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"i am good and you\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"awesome\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"hello\",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"yh i am good\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"and you\",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"yh yh\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"okay\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"Hi\",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"Are you good\",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"yes boss\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"yes boss\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"What happened \",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"I travelled\",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"To where \",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADM-00003\",\"receiver\":\"ADMS-00001\",\"msg\":\"Hi\",\"send_name\":\"Test Testy\",\"rec_name\":\"David Ojooh\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"i dey ooh\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"},{\"sender\":\"ADMS-00001\",\"receiver\":\"ADM-00003\",\"msg\":\"how your side\",\"send_name\":\"David Ojooh\",\"rec_name\":\"Test Testy\",\"id\":\"40\"}]', 'chat', '2021-08-26 15:55:30', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `fname` varchar(255) NOT NULL,
  `mname` varchar(100) DEFAULT NULL,
  `lname` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `lga` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `address` text DEFAULT NULL,
  `user_type` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `proffession` varchar(256) NOT NULL,
  `kids` bigint(20) DEFAULT 0,
  `profile_photo` text NOT NULL,
  `identification` varchar(256) NOT NULL,
  `document` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL,
  `editted_by` varchar(100) NOT NULL,
  `last_editted` datetime DEFAULT NULL,
  `password` varchar(300) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_kid` tinyint(1) NOT NULL DEFAULT 0,
  `is_sponsor` tinyint(1) NOT NULL DEFAULT 0,
  `is_envoy` int(11) NOT NULL DEFAULT 0,
  `is_changed` int(11) NOT NULL DEFAULT 0,
  `is_verified` int(11) NOT NULL DEFAULT 0,
  `token` varchar(100) DEFAULT NULL,
  `preference` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `fname`, `mname`, `lname`, `dob`, `age`, `gender`, `country`, `state`, `lga`, `email`, `telephone`, `address`, `user_type`, `title`, `proffession`, `kids`, `profile_photo`, `identification`, `document`, `is_active`, `date_created`, `last_login`, `editted_by`, `last_editted`, `password`, `is_admin`, `is_kid`, `is_sponsor`, `is_envoy`, `is_changed`, `is_verified`, `token`, `preference`) VALUES
(1, 'ADMS-00001', NULL, 'David', NULL, 'Ojooh', '1994-05-25', 27, 'Male', 'Nigeria-131', 'Kwara', NULL, 'davidmatthoo@outlook.com', '+234-08091414443', NULL, 'ADMS', 'Super Admin', '', 0, '/images/profile/admin/81d76add-adda-485e-8664-4b454e9c68e1.png', '', '', 1, '2021-01-08 21:25:18', '2021-08-30 13:14:55', 'ADMS-00001', '2021-08-25 15:08:22', '$2b$10$LXFagF4/7VtFTPL9Kns3iePrXqJuXIEf0XwPpqvSzdesEdrjBe/ai', 1, 0, 0, 0, 0, 0, NULL, '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(2, 'ADM-00002', NULL, 'Michael', NULL, 'Davis', '1997-11-07', 24, 'Male', 'Nigeria-131', 'Abuja Federal Capital', NULL, 'michael@yahoo.com', '+234-07001000357', NULL, 'ADM', 'Admin Editor', '', 0, '', '', '', 1, '2021-01-08 22:54:31', '2021-01-29 16:57:46', 'ADMS-00001', '2021-01-13 16:51:20', '$2b$10$j0LawgeKdRrs1PumyZ8OMu6qH.NLWuO4G7EBafdZ/.k3UjTCsxzzq', 1, 0, 0, 0, 0, 0, NULL, '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(3, 'ADM-00003', NULL, 'Test', NULL, 'Testy', '1912-12-11', 109, 'Male', 'Nigeria-131', 'Abuja Federal Capital', NULL, 'test@gmail.com', '+234-08091417893', NULL, 'ADM', 'Administrator Editor', '', 0, '', '', '', 1, '2021-01-10 17:43:51', '2021-08-26 16:36:47', 'ADMS-00001', '2021-08-25 15:54:37', '$2b$10$LXFagF4/7VtFTPL9Kns3iePrXqJuXIEf0XwPpqvSzdesEdrjBe/ai', 1, 0, 0, 0, 0, 0, NULL, '{\"tab_grid\":\"\",\"tab_list\":\"active\",\"row_grid\":\"deactivated\",\"row_list\":\"\"}'),
(11, 'SPN-00006', NULL, 'Sponsor', NULL, 'Sponsor - sponsor', '1967-07-03', 54, 'Male', 'Nigeria-131', 'Lagos', NULL, 'sponsor@gmail.com', '+234-08091414443', NULL, 'SPN', 'Sponsor', 'Accountant', 4, '/images/profile/profile_pic/44467bfd-48af-4a2a-bb8a-9f81ba39de80.57', '', '', 1, '2021-02-03 16:10:22', '2021-08-26 10:23:51', 'SPN-00006', '2021-08-10 17:51:30', '$2b$10$5pfYQU5Jzmdh8LtBuVsUre7yxw6pf7jzpvdQSzSYZ4cVPb6LlKthy', 0, 0, 1, 0, 0, 0, NULL, '{\"tab_grid\":\"\",\"tab_list\":\"active\",\"row_grid\":\"deactivated\",\"row_list\":\"\"}'),
(12, 'SPN-00012', NULL, 'Dele', NULL, 'Tayo', '1970-02-13', 51, 'Male', 'Nigeria-131', 'Kwara', NULL, 'tayo@outlook.com', '+234-08052345567', NULL, 'SPN', 'Sponsor', 'Engineer', 0, '/images/profile/profile_pic/3f61e542-8515-4ab5-9188-879829218574.jpg', '', '', 1, '2021-02-04 16:00:22', NULL, 'ADMS-00001', '2021-02-04 17:44:33', '$2b$10$ouXQEMItgVsk.Pipu7/jXeSMINotomYyRpjTZ00UQickoEO6Eqvtq', 0, 0, 1, 0, 0, 0, NULL, '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(14, 'ENV-00013', NULL, 'Soro', NULL, 'Roger', '1995-12-10', 26, 'Female', 'Nigeria-131', 'Benue', NULL, 'soro@hotmail.com', '+234-070945678934', NULL, 'ENV', 'Envoy', 'Software Developer', 4, '/images/profile/envoy/0409a334-8253-4f7c-bd59-d528c536802e.jpg', '', '', 1, '2021-02-05 12:34:40', '2021-09-28 13:03:31', 'ENV-00013', '2021-08-10 17:16:03', '$2b$10$7YBbSq/v.EkGst1zPAadhuUdI0U1CpFHWA5D.g8LiFGKguLLMUq6K', 0, 0, 0, 1, 0, 0, NULL, '{\"tab_grid\":\"\",\"tab_list\":\"active\",\"row_grid\":\"deactivated\",\"row_list\":\"\"}'),
(16, 'ENV-00015', NULL, 'Faraday', NULL, 'Michael', '1996-11-16', 25, 'Male', 'Nigeria-131', 'Kwara', NULL, 'faraday@gmail.com', '+234-070945678934', NULL, 'ENV', 'Envoy', 'Accountant', 0, '/images/profile/profile_pic/a1c7fa38-ca6c-4126-810f-3927cbe79a6a.57', '', '', 1, '2021-02-05 17:46:35', '2021-05-14 20:46:49', '', NULL, '$2b$10$mDoO7osq5l6P7RyJRlWQKurEMNVW1Vb4cjC93vcomOYu5XR/rpqLe', 0, 0, 0, 1, 0, 0, NULL, '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(17, 'ENV-00017', NULL, 'David', NULL, 'Ojo', '1994-06-04', 27, 'Male', 'Nigeria-131', 'Abuja Federal Capital', NULL, 'ojoooh@gmail.com', '+234-08091414443', NULL, 'ENV', 'Envoy', 'Developer', 0, '/images/profile/profile_pic/b4191101-782d-4f2d-9434-9a7098262cd5.jpg', '', '', 1, '2021-04-30 17:18:54', '2021-05-03 20:02:26', '', NULL, '$2b$10$llTilj9yz3ryIW33f0lhh.w5UDuXagS6QVOmDhFDtKVPKBDSAb.1G', 0, 0, 0, 1, 0, 0, NULL, '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(18, 'ENV-00018', '', 'Samuel', 'Agboola', 'Oladotun', '1986-08-20', 35, 'Male', 'Nigeria-131', 'Ogun', 'Ado Odo Ota', 'samueldoxy@gmail.com', '23407037862231', '65, Kajola Street by Asiko Block Factory Iloye Sango Ota Ogun State', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/b306075810af37f8a6eb659e393f66fe.jpeg', ' Other ', '/doc/envoy_id/1588d8e7505cb90af9d28a0a7e7cfc96.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$qyYyxgDTwPnbwtmqmBCVEOTEm38YFh8w/FUQwwe6HmrXvBHZmVUcW', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(19, 'ENV-00019', '', 'Saliu', 'Omeiza', 'Idris', '1988-05-15', 33, 'Male', 'Nigeria-131', 'Ogun', 'Ajegunle', 'saliuidris25@gmail.com', '23408064598117-08064598117', '7 ajegunle Street off ijoko road sango ota ogun State', 'ENV', 'Envoy', '', 32, '/images/profile/envoy/d99d4644-7120-46e8-8b02-286b5386c8e2.jpeg', ' Other ', '/doc/envoy_id/ce3fe1d0aeb12073cd67e796e5ed7d26.pdf', 1, '2021-06-07 16:30:49', '2021-08-11 12:05:47', 'ENV-00019', '2021-08-11 10:31:36', '$2b$10$7YBbSq/v.EkGst1zPAadhuUdI0U1CpFHWA5D.g8LiFGKguLLMUq6K', 0, 0, 0, 1, 1, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(20, 'ENV-00020', '', 'Ojoawo', 'Mary', 'Toyin', '1989-02-01', 32, 'Female', 'Nigeria-131', 'Ogun', 'Ado odo ota', 'testy@gmail.com', '23408067228975', 'Ire Akari,Oko Baale,Off Ilogbo Road,Ota', 'ENV', 'Envoy', '', 0, '/images/profile/envoy/50dd134403555ab4facb4cca88495d25.jpeg', ' Other ', '/doc/envoy_id/e68317a384ee681a22663701a09a7b80.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$4HloqdF5z/R8G77W4pA.beabdPL2IwKZNlSBSzQDC4.VYc5RxSH9G', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(21, 'ENV-00021', '', 'Jatto', 'Jola', 'Sunday', '1986-08-27', 35, 'Male', 'Nigeria-131', 'Ogun', 'ado odo ota', 'jolasunday973@gmail.com', '23408039585651', '2 abiola close temidire sango ota off sekoni', 'ENV', 'Envoy', '', 0, '/images/profile/envoy/e61f734765679be1ad1dd4690cce6043.jpeg', ' Other ', '/doc/envoy_id/5649be4f52050f609bb78fef104b31d5.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$CvoPn2NkPOq1l8E.2cZ6OO7e0w8aRpRiKWWtWyHMXa4gvs/7lPnwq', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(22, 'ENV-00022', '', 'Yusuf', 'Echipate', 'Mustapha', '1979-08-23', 42, 'Male', 'Nigeria-131', 'Ogun', 'ado odo ota', 'yusufshittumustapha@gmail.com', '23408135921916', 'akinbowale No7  temidire sango ota', 'ENV', 'Envoy', '', 0, '/images/profile/envoy/e55056f8998d9f47270e166edc661b49.jpeg', ' Other ', '/doc/envoy_id/43edb1b7c600ae6aa1d030e45cf325b7.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$2IA70lrgWfD6xo7y5kp4A.6tOnkmrzB1lZM41ZC/ZjxyMcoeJZwdG', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(23, 'ENV-00023', '', 'Azeezat', 'Akindele', 'Adebukola', '1993-11-25', 28, 'Female', 'Nigeria-131', 'Ogun', 'Ado odo ota', 'akintolaakindele12@gmail.com', '23408169082684', 'Arobieye peace Avenue, ijalebii CDA, iju road wineers', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/bb61fd6685c1e6672e59745805648cdd.jpeg', ' Other ', '/doc/envoy_id/423aeb9433a471524839a505c229179f.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$vmPqTS0JTjzDAAycLM3s8u0yVMqkBhA5Va6A5rtKTW74hoIkgnPF6', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(24, 'ENV-00024', '', 'David', 'Matt-Ojo', '', '2000-06-04', 21, 'Male', 'Nigeria-131', 'Abuja Federal Capital', 'Amac', 'davidmatthew798@gmail.com', '23408091414443', 'Bkah blah blah', 'ENV', 'Envoy', '', 3, '/images/envoy//profile-pic/359e2ad984afb2b80eca3acac5746bfc.jpg', ' Other ', '/doc/envoy_id/1380b097cd0d687e35bfa70acbfa444b.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$jMnttOxhTrpcqXDawrI9VObm2W8AeilhGZ6WcwLP1Q7EMhUPk8nsG', 0, 0, 0, 1, 1, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(25, 'ENV-00025', '', 'Abiodun', 'Rauph', '', '1961-03-26', 60, 'Male', 'Nigeria-131', 'Ogun', 'Ogun', 'biodunrauph2@gmail.com', '2349097349688', '5, Ijoko Road, Sango Ota', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/1800d607fee32848d0c340e379ac938a.jpg', ' Other ', '/doc/envoy_id/53ca295780fd878a4f7d1391acbfef9d.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$Z4UlqkAsSy2H4fy/sDBeben3YXo3xu/Xnmfd9zseXiOXJFSJzLGja', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(26, 'ENV-00026', '', 'Adeyinka', 'Kasim', 'Gabriel', '1969-10-23', 52, 'Male', 'Nigeria-131', 'Ogun', 'Adoodo/Ota', 'obanijesu@gmail.com', '23408035521552', '22 Jimoh Olaosebikan street. Ayetoro. Itele Ota. Ogun State.', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/0faa5c9cf814de4c872622b4ea9d7f95.jpeg', ' National ID ', '/doc/envoy_id/007c54b9e3258b3dbc3c3a64ea6ed347.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$0M/QWLiVvzXUN.wvvKcvxOgC.DL2OCYo9NuDCJJnVvNrZB5ysLLye', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(27, 'ENV-00027', '', 'Abilawon', 'Victor', 'Adekola', '1979-10-01', 42, 'Male', 'Nigeria-131', 'Ogun', 'ado odo ota', 'adevictor35@gmail.com', '23408036497796', '10 irepodun street sango ota', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/e28497cfc08c2440f003a7a19a54751a.jpeg', ' National ID ', '/doc/envoy_id/718d1238065359656a9ca0cd2adfb57a.pdf', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$vIo07rmU8K7MPaTMUjGUquMg4PJPbKdt9UKLfmq8F9M.KiiLpJ2Ae', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(28, 'ENV-00028', '', 'Mudashiru', 'Mutiu', 'Ayinla', '1975-12-26', 46, 'Male', 'Nigeria-131', 'Ogun', 'ADO ODO OTA', 'mudashiruayinla@gmail.com', '23408145235257', '5 ajegunle street off ijoko road sango ota', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/f4085df35aaf560042306d68d38b7e29.jpeg', ' Other ', '/doc/envoy_id/a76b3559e1ba82bdc4eeb6ab98581adc.jpeg', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$SQY8Lr0c3A46zTiUZO2YWeiN1Gq3ksDhf5gxU3grw02P.ZPUsrjNC', 0, 0, 0, 1, 0, 1, '', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(29, 'ENV-00029', '', 'David', 'Matt-Ojo', 'ADESINA', '1903-03-03', 118, 'Male', 'Nigeria-131', 'Edo', 'Abuja Federal Capital Territor', 'davidmatthew708@gmail.com', '23408091414443', 'Abuja, Lugbe Fedral Housing Estate\nplot 904 Sector F', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/564ca25ab6fc4007399145c2009470e8.jpg', ' Passport ', '/doc/envoy_id/bbb7c5e134f3d872e63fefb1be63fae3.jpg', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$WH7cPHQl/C7/yFO9SQI1zO27ABXy88xoPnOllP8Ad89h5Vpy/5wXe', 0, 0, 0, 1, 0, 0, 'fa3f7ab0985ab4fb40ea77d8de91998a', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(30, 'ENV-00030', '', 'Azeezat', 'Akindele', 'Adebukola', '1993-11-25', 28, 'Female', 'Nigeria-131', 'Ogun', 'Ado odo ota', 'akintolaakindele12@gmail.com', '23408169082684', 'Arobieye peace avenue, ijalebi CDA, winners iju/ idiroko road', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/79b9732712c9f15de891a20df82e8f68.jpg', ' Other ', '/doc/envoy_id/ccef696d50fe2cabf9207c637fc6a01f.png', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$WHbaAmoWIF8PrvvDHGoukeHZ8By6HP4JATNhKwln6vTC9cAhUJLd.', 0, 0, 0, 1, 0, 0, '8b044811136dcc63c5f5456fbf161d70', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(31, 'ENV-00031', '', 'Raphael', 'Unoh', 'dd', '1956-01-07', 65, 'Male', 'Nigeria-131', 'Jigawa', 'ddf', 'paulkilkelly3@gmail.com', '+23408161664911', '3 fez street abuja', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/098b2965e0f91c9cf7e9c36d7afef2b7.jpg', ' Passport ', '/doc/envoy_id/3c1a0de4436e9ede6a63d32642de1f67.jpg', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$UvRo3qHgj081GnE8NRsEN.ilXip4zMP0ftOlpErdN5xoxqPjo2xGy', 0, 0, 0, 1, 0, 0, '77a4988b588d0ca63d24e481b3effc92', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(32, 'ENV-00032', '', 'Sanni', 'Jamiu', 'OLADAPO', '1969-05-08', 52, 'Male', 'Nigeria-131', 'Ogun', 'Ado-odo/ota', 'jsanni54@yahoo.com', '+2347037894429', '5 Ajegunle Str. Ijoko rd. Sango ota Ogun state', 'ENV', 'Envoy', '', 0, '/images/envoy//profile-pic/530f3393da48de8ca4d894d116056439.jpg', ' National ID ', '/doc/envoy_id/817cf5b921e4a99b786768d4d2395827.jpg', 1, '2021-06-07 16:30:49', NULL, '', NULL, '$2y$10$m3yGs0kSmwtTz8WZD8I4Se7DvFXBwia7aHlqpxgp4ek/02u8mmX7e', 0, 0, 0, 1, 0, 0, 'bbf39571d605ef1065dbb54f8005b731', '{\"tab_grid\":\"active\",\"tab_list\":\"\",\"row_grid\":\"\",\"row_list\":\"deactivated\"}'),
(33, 'ADM-00033', NULL, 'Joey', NULL, 'Boy', '1994-08-30', 27, 'Male', 'Nigeria-131', 'Ogun', NULL, 'joeyboy@gmail.com', '+234-070945678934', NULL, 'ADM', 'Administrator Editor', '', 0, '/images/profile/admin/ac1aa0be-1ee5-496d-8478-d1cc38113a59.jpg', '', '', 1, '2021-08-25 15:24:31', NULL, 'ADMS-00001', '2021-08-25 15:27:47', '$2b$10$OgUWRbRRf4QtxNI7KuCuo.mA92wfA9W1roDuXZTbiUjvXO1yv0n7e', 1, 0, 0, 0, 0, 0, NULL, NULL),
(34, 'SPN-00034', NULL, 'Michael', NULL, 'Ifeanyi', '1966-09-10', 55, 'Male', 'Nigeria-131', 'Abuja Federal Capital', NULL, 'michaelkts@yahoo.com', '+234-07089345679', NULL, 'SPN', 'Sponsor', 'Engineer', 0, '/images/profile/sponsor/b72b58c1-e338-4c6b-9410-5a240a8328aa.jpg', '', '', 1, '2021-08-26 09:55:54', NULL, 'ADMS-00001', '2021-08-26 10:45:43', '$2b$10$pxRicZoaZlbwpP2TadqGeeCSlmRorKXWMoOPN.hLSyBFZNlAQ1O.e', 0, 0, 1, 0, 0, 0, NULL, NULL),
(36, 'ENV-00035', NULL, 'Michael', NULL, 'Fadare', '1989-03-31', 32, 'Male', 'Nigeria-131', 'Imo', NULL, 'michalefedy@gmail.com', '+234-09034567788', NULL, 'ENV', 'Envoy', 'Architect', 0, '/images/profile/envoy/7b6197e8-2b19-450a-b738-92a2e42c2f58.png', '', '', 1, '2021-08-26 10:57:40', NULL, 'ADMS-00001', '2021-08-26 10:58:55', '$2b$10$Zl9.BRwrN26TAEukbiDf7.p0w/Dr3E.NtotWN9XTT.cWmOgTt8YIu', 0, 0, 0, 1, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` bigint(20) NOT NULL PRIMARY KEY,
  `wallet_name` varchar(200) DEFAULT NULL,
  `owner` varchar(20) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `quick` double DEFAULT NULL,
  `auto` double DEFAULT NULL,
  `donate` double DEFAULT NULL,
  `is_active` int(11) DEFAULT 0,
  `date_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `wallet_name`, `owner`, `amount`, `quick`, `auto`, `donate`, `is_active`, `date_created`) VALUES
(1, NULL, 'SPN-00006', 385615, 385615, 0, 165915, 1, '2021-06-24 17:07:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kids`
--
ALTER TABLE `kids`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kts_envoy`
--
ALTER TABLE `kts_envoy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kts_form`
--
ALTER TABLE `kts_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notify`
--
ALTER TABLE `notify`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `kids`
--
ALTER TABLE `kids`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `kts_envoy`
--
ALTER TABLE `kts_envoy`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kts_form`
--
ALTER TABLE `kts_form`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `notify`
--
ALTER TABLE `notify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
