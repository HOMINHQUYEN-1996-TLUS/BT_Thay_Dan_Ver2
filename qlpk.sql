-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 27, 2022 lúc 06:09 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlpk`
--

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkLogin` (IN `user` CHAR(20), IN `pass` CHAR(100))   BEGIN
   SELECT COUNT(*) as count  FROM manager_login WHERE username = user and password = pass;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getLichSuKham` (IN `ID` VARCHAR(20))   select khachhang.ID_khachhang, hoadon.TongTien, hoadon.NgayThang,phongban.TenPhong,bacsi.HoTen
FROM ( ( ( hoadon INNER join phongban
ON hoadon.ID_PhongBan = phongban.ID_PhongBan ) inner join khachhang 
on phongban.ID_khachhang = khachhang.ID_khachhang) INNER JOIN bacsi
on phongban.ID_bacsi = bacsi.ID_bacsi)
WHERE khachhang.ID_khachhang = ID
ORDER BY hoadon.NgayThang ASC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `procedureName` ()   BEGIN
   SELECT *  FROM phongban ;
	END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi`
--

CREATE TABLE `bacsi` (
  `ID_bacsi` char(20) NOT NULL,
  `HoTen` varchar(100) DEFAULT NULL,
  `Birthday` char(30) DEFAULT NULL,
  `GioiTinh` char(10) DEFAULT NULL,
  `DiaChi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bacsi`
--

INSERT INTO `bacsi` (`ID_bacsi`, `HoTen`, `Birthday`, `GioiTinh`, `DiaChi`) VALUES
('BS001', 'Nguyen Van A', '10/09/1975', 'Nam', 'Ha Noi'),
('BS002', 'Nguyen Van B', '10/09/1982', 'Nam', 'Can Tho'),
('BS003', 'Nguyen Thi C', '10/09/1979', 'Nu', 'HCM');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_login`
--

CREATE TABLE `customer_login` (
  `sdt` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customer_login`
--

INSERT INTO `customer_login` (`sdt`) VALUES
('0923467749'),
('0923468888'),
('0938872403');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dichvu`
--

CREATE TABLE `dichvu` (
  `ID_DichVu` char(20) NOT NULL,
  `TenDichVu` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `GiaDichVu` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `dichvu`
--

INSERT INTO `dichvu` (`ID_DichVu`, `TenDichVu`, `GiaDichVu`) VALUES
('DV001', 'Nhổ Răng Khôn', '250000'),
('DV002', 'Trám Răng', '300000'),
('DV003', 'Tẩy Răng', '400000'),
('DV004', 'Lấy Cao Răng', '150000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `ID_HoaDon` char(20) NOT NULL,
  `ID_bacsi` char(20) DEFAULT NULL,
  `ID_PhongBan` char(20) DEFAULT NULL,
  `NgayThang` char(100) DEFAULT NULL,
  `TongTien` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`ID_HoaDon`, `ID_bacsi`, `ID_PhongBan`, `NgayThang`, `TongTien`) VALUES
('HD001', 'BS001', 'PB001', '26/03/2022', '500000'),
('HD002', 'BS001', 'PB002', '22/03/2022', '450000'),
('HD003', 'BS002', 'PB003', '19/01/2021', '890000'),
('HD004', 'BS001', 'PB004', '07/03/2021', '600000'),
('HD005', 'BS001', 'PB005', '19/08/2019', '500000'),
('HD006', 'BS002', 'PB006', '27/03/2022', '150000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `ID_khachhang` char(20) NOT NULL,
  `HoTen` varchar(100) DEFAULT NULL,
  `Birthday` char(30) DEFAULT NULL,
  `GioiTinh` char(10) DEFAULT NULL,
  `DiaChi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`ID_khachhang`, `HoTen`, `Birthday`, `GioiTinh`, `DiaChi`) VALUES
('0938872403', 'Nguyen Van A', '10/09/1996', 'Nam', 'Ha Noi'),
('111111111', 'Tran A', '10/09/1992', 'Nam', 'Ha Noi'),
('222222222', 'Tran B', '10/09/1999', 'Nam', 'Phu Yen'),
('333333333', 'Tran Thi C', '10/09/2001', 'Nu', 'Binh Dinh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `manager_login`
--

CREATE TABLE `manager_login` (
  `username` char(100) NOT NULL,
  `password` char(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `manager_login`
--

INSERT INTO `manager_login` (`username`, `password`) VALUES
('admin', '356a192b7913b04c54574d18c28d46e6395428ab');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongban`
--

CREATE TABLE `phongban` (
  `ID_PhongBan` char(20) NOT NULL,
  `TenPhong` varchar(100) DEFAULT NULL,
  `ID_bacsi` char(20) DEFAULT NULL,
  `ID_khachhang` char(20) DEFAULT NULL,
  `ID_DichVu` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `phongban`
--

INSERT INTO `phongban` (`ID_PhongBan`, `TenPhong`, `ID_bacsi`, `ID_khachhang`, `ID_DichVu`) VALUES
('PB001', 'Kham Rang 1', 'BS001', '111111111', 'DV001'),
('PB002', 'Kham Rang 2', 'BS001', '222222222', 'DV001'),
('PB003', 'Kham Rang 3', 'BS002', '333333333', 'DV002'),
('PB004', 'Kham Rang 1', 'BS003', '0938872403', 'DV003'),
('PB005', 'Kham Rang 5', 'BS001', '111111111', 'DV002'),
('PB006', 'Kham Răng 4', 'BS002', '333333333', 'DV002');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  ADD PRIMARY KEY (`ID_bacsi`);

--
-- Chỉ mục cho bảng `customer_login`
--
ALTER TABLE `customer_login`
  ADD PRIMARY KEY (`sdt`);

--
-- Chỉ mục cho bảng `dichvu`
--
ALTER TABLE `dichvu`
  ADD PRIMARY KEY (`ID_DichVu`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`ID_HoaDon`),
  ADD KEY `ID_bacsi` (`ID_bacsi`),
  ADD KEY `ID_PhongBan` (`ID_PhongBan`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`ID_khachhang`);

--
-- Chỉ mục cho bảng `manager_login`
--
ALTER TABLE `manager_login`
  ADD PRIMARY KEY (`username`);

--
-- Chỉ mục cho bảng `phongban`
--
ALTER TABLE `phongban`
  ADD PRIMARY KEY (`ID_PhongBan`),
  ADD KEY `ID_bacsi` (`ID_bacsi`),
  ADD KEY `ID_khachhang` (`ID_khachhang`),
  ADD KEY `ID_DichVu` (`ID_DichVu`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`ID_bacsi`) REFERENCES `bacsi` (`ID_bacsi`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`ID_PhongBan`) REFERENCES `phongban` (`ID_PhongBan`);

--
-- Các ràng buộc cho bảng `phongban`
--
ALTER TABLE `phongban`
  ADD CONSTRAINT `phongban_ibfk_1` FOREIGN KEY (`ID_bacsi`) REFERENCES `bacsi` (`ID_bacsi`),
  ADD CONSTRAINT `phongban_ibfk_2` FOREIGN KEY (`ID_khachhang`) REFERENCES `khachhang` (`ID_khachhang`),
  ADD CONSTRAINT `phongban_ibfk_3` FOREIGN KEY (`ID_DichVu`) REFERENCES `dichvu` (`ID_DichVu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
