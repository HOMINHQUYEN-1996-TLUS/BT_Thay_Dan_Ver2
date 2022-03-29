-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 29, 2022 lúc 04:41 AM
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
('PB002', 'Kham Răng 3', 'BS001', '111111111', 'DV003');

--
-- Chỉ mục cho các bảng đã đổ
--

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
