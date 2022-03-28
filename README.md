# 1.Giới Thiệu về dự án quản lý phòng khám răng 

-Source code đề tài môn Thầy Dân 

-Source code được thực hiện bởi nhóm gồm có 3 thành viên :
    - Trần Thị Hằng (nhóm trưởng)
    - Hoàng Minh Tài (phân tích viên)
    - Hồ Minh Quyền (coder)

# Hướng dẫn run project
Cài đặt [XAMPP](https://www.apachefriends.org/xampp-files/7.4.28/xampp-windows-x64-7.4.28-0-VC15-installer.exe)
Dùng bất kì trình biên soạn nào vd : notepad, vim, vs code, sublime text, .... Ở đây em dùng [VS_CODE](https://code.visualstudio.com/download#)
Các extensions trợ giúp khi dùng vs code : <img src="https://imgur.com/a/Z4Wkv5m">
Mở xampp lên và start 2 Module là Apache và MySql lên
Truy cập theo đường dẫn http://localhost/phpmyadmin/ để thêm csdl
Tạo mới 1 database với tên 'qlpk'
Chọn chức năng `Nhập` sau đó chọn `Choose File` rồi chọn đến file `qlpk.sql` trong folder đã tải về. click `Thực hiện`
Copy thư mục project vào theo đường dẫn C:\xampp\htdocs\ 
Mở trình duyệt mở đường dẫn : http://localhost/BT_Thay_Dan_Ver2/ để chạy project
Mặc định port của server là `3306` tuy nhiên để chắc chắn mở file config của MySql trên phần mềm xampp lên để xem và thay đổi giống với file `php\server.php` để project chạy được
