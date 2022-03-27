$(".btn_themBenhNhan").click(function () {
	var ID_PhongBan = $(".txt_IDPhongBan").val()
    var TenPhong = document.getElementById("select_TenPhong").value
    var ID_bacsi = document.getElementById("select_IDBacsi").value
    var ID_khachhang = $(".txt_IDKhachhang").val()
    var ID_DichVu = document.getElementById("select_IDDichVu").value

    var dataSend = {
        event: "insertPhongBan",
        ID_PhongBan : ID_PhongBan,
        TenPhong : TenPhong,
        ID_bacsi : ID_bacsi,
        ID_khachhang : ID_khachhang,
        ID_DichVu : ID_DichVu
    }

    queryDataPost("php/api.php", dataSend, function (dataserver) {
        console.log(dataserver);
        if (dataserver.success == 2) {
          alert_error("Bị trùng khóa");
        } else if (dataserver.success == 1) {
          showDataTheLoai();
          alert_success("Thêm Thành công");
          resetViewTL();
          flag = 0;
        } else {
          alert_error("Thêm Không Thành công");
        }
      });
});