-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Nov 02, 2021 at 08:05 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlysachth2`
--

-- --------------------------------------------------------

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
CREATE TABLE IF NOT EXISTS `chitietdonhang` (
  `ID_item` int(11) NOT NULL,
  `SoDH` varchar(10) DEFAULT NULL,
  `MaSach` varchar(10) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `GiaTien` float DEFAULT NULL,
  `GiamGia` float DEFAULT NULL,
  PRIMARY KEY (`ID_item`),
  KEY `SoDH` (`SoDH`),
  KEY `MaSach` (`MaSach`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietdonhang`
--

INSERT INTO `chitietdonhang` (`ID_item`, `SoDH`, `MaSach`, `SoLuong`, `GiaTien`, `GiamGia`) VALUES
(1, '001', 'KTDC', 10, 30000, 0.1),
(2, '001', 'QTKDTLKD', 5, 20000, 0.2),
(3, '002', 'KTMTCB', 2, 40000, 0.5),
(4, '002', 'THVP', 1, 35000, 0.4);

-- --------------------------------------------------------

--
-- Table structure for table `dondathang`
--

DROP TABLE IF EXISTS `dondathang`;
CREATE TABLE IF NOT EXISTS `dondathang` (
  `SoDH` varchar(10) NOT NULL,
  `NgayDH` datetime DEFAULT NULL,
  `TrangThaiDH` int(11) DEFAULT NULL,
  `MaKH` varchar(10) DEFAULT NULL,
  `NgayDuKienGiao` datetime DEFAULT NULL,
  `NgayThucTeGiao` datetime DEFAULT NULL,
  `MaNV` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`SoDH`),
  KEY `MaKH` (`MaKH`),
  KEY `MaNV` (`MaNV`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dondathang`
--

INSERT INTO `dondathang` (`SoDH`, `NgayDH`, `TrangThaiDH`, `MaKH`, `NgayDuKienGiao`, `NgayThucTeGiao`, `MaNV`) VALUES
('001', '2020-10-20 09:00:00', 1, '001', '2020-10-20 09:00:00', NULL, NULL),
('002', '2020-12-20 09:00:00', 0, '002', '2020-12-20 09:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
CREATE TABLE IF NOT EXISTS `khachhang` (
  `MaKH` varchar(10) NOT NULL,
  `HoKH` varchar(100) DEFAULT NULL,
  `TenKH` varchar(100) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MaKH`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `HoKH`, `TenKH`, `Phone`, `Email`) VALUES
('001', 'Nguyễn Văn', 'An', '098899999', 'an@gmail.com'),
('002', 'Lưu Bình', 'Nguyên', '0978977777', 'nguyen@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
CREATE TABLE IF NOT EXISTS `nhanvien` (
  `MaNV` varchar(10) NOT NULL,
  `HotenNV` varchar(50) DEFAULT NULL,
  `GT` varchar(5) DEFAULT NULL,
  `NS` date DEFAULT NULL,
  `MaNVQL` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`MaNV`),
  KEY `MaNVQL` (`MaNVQL`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `nhaxb`
--

DROP TABLE IF EXISTS `nhaxb`;
CREATE TABLE IF NOT EXISTS `nhaxb` (
  `MaXB` varchar(20) NOT NULL,
  `TenXB` varchar(100) DEFAULT NULL,
  `DiaChi` varchar(200) DEFAULT NULL,
  `SDT` varchar(10) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MaXB`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhaxb`
--

INSERT INTO `nhaxb` (`MaXB`, `TenXB`, `DiaChi`, `SDT`, `email`) VALUES
('NXBTH', 'Nhà xuất bản tổng hợp', '12 Hai Bà \r\nTrưng. Hà Nội', '0245678612', 'nxbtonghop@gmail.com'),
('NXBGD', 'Nhà xuất bản giáo dục', '14 Đống Đa. \r\nHà Nội', '0247646786', 'nxbgiaoduc@gmail.com'),
('NXBTK', 'Nhà xuất bản thống kê', '1 Bình Trị\r\nĐông. TPHCM', '0285638613', 'nxbthongke@gmail.com'),
('NXBKHKT', 'Nhà xuất bản khoa học kỹ thuật', '13 \r\nVõ Văn Tần, TPHCM', '0285678614', 'nxbkhkt@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `sach`
--

DROP TABLE IF EXISTS `sach`;
CREATE TABLE IF NOT EXISTS `sach` (
  `MaSach` varchar(10) NOT NULL,
  `TenSach` varchar(100) DEFAULT NULL,
  `SoTrang` int(11) DEFAULT NULL,
  `NgayXB` date DEFAULT NULL,
  `MaTL` varchar(10) DEFAULT NULL,
  `MaXB` varchar(20) DEFAULT NULL,
  `urlsach` text NOT NULL,
  PRIMARY KEY (`MaSach`),
  KEY `MaTL` (`MaTL`),
  KEY `MaXB` (`MaXB`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sach`
--

INSERT INTO `sach` (`MaSach`, `TenSach`, `SoTrang`, `NgayXB`, `MaTL`, `MaXB`, `urlsach`) VALUES
('TKH', 'Học hoài chả hiểu', 10, NULL, 'TH3', 'NXBTH', ''),
('fsdf', 'fsdf', NULL, NULL, 'TH2', 'NXBGD', ''),
('fds', 'fsdfsd', NULL, NULL, 'TH2', 'NXBKHKT', ''),
('A', 'Hoa hướng dương', NULL, NULL, 'TH', 'NXBTH', '0f892c7c1b9090cca60b5ddae716440a.jpeg'),
('B', 'B', NULL, NULL, 'TH3', 'NXBTK', '7b336ce4d97a2ec343e1ab103889e194.jpeg'),
('HJ', 'Học Chi Mãi', NULL, NULL, 'TH2', 'NXBTH', 'd4606e42f7875cc34e027c24b0b33ff9.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `sach_tacgia`
--

DROP TABLE IF EXISTS `sach_tacgia`;
CREATE TABLE IF NOT EXISTS `sach_tacgia` (
  `MaTG` varchar(20) NOT NULL,
  `MaSach` varchar(10) NOT NULL,
  PRIMARY KEY (`MaTG`,`MaSach`),
  KEY `MaSach` (`MaSach`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sach_tacgia`
--

INSERT INTO `sach_tacgia` (`MaTG`, `MaSach`) VALUES
('001', 'KTDC'),
('001', 'QTKDNLKD'),
('001', 'THDC'),
('001', 'THVP'),
('001', 'TNNCTN'),
('002', 'KTMTCB'),
('002', 'QTKDNLKD'),
('002', 'THDC'),
('002', 'THVP'),
('002', 'TNNCTN'),
('003', 'THKT'),
('004', 'KTDC'),
('004', 'THKT');

-- --------------------------------------------------------

--
-- Table structure for table `tacgia`
--

DROP TABLE IF EXISTS `tacgia`;
CREATE TABLE IF NOT EXISTS `tacgia` (
  `MaTG` varchar(20) NOT NULL,
  `TenTG` varchar(100) DEFAULT NULL,
  `DiaChi` varchar(200) DEFAULT NULL,
  `SDT` varchar(10) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MaTG`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tacgia`
--

INSERT INTO `tacgia` (`MaTG`, `TenTG`, `DiaChi`, `SDT`, `email`) VALUES
('001', 'Phạm Hữu Độ', 'Hà Nội', '0988888888', 'huudo@gmail.com'),
('002', 'Phạm An Bình', 'HCM', '0988675555', 'anbinh@gmail.com'),
('003', 'Viên An', 'HCM', '098122211', 'anvien@gmail.com'),
('004', 'Viên Thanh Nhã', 'CT', '093122221', 'nhavien@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

DROP TABLE IF EXISTS `theloai`;
CREATE TABLE IF NOT EXISTS `theloai` (
  `MaTL` varchar(10) NOT NULL,
  `TenTL` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`MaTL`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`MaTL`, `TenTL`) VALUES
('TH3', 'Tin học'),
('TH2', 'Kinh Tế'),
('TH', 'Kế Toán');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `permission` int(11) NOT NULL DEFAULT 0,
  `avartar` text NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `permission`, `avartar`) VALUES
('nha@gmail.com', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Nhã Thanh Viên', 0, 'noavatarfemale.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
