$(".btn_luuHoaDon").click(function () {
  var ID_HoaDon = $(".txt_IDHoaDon").val();
  // var ID_bacsi = document.getElementById("select_IDBacsi_HoaDon").value;
  var ID_PhongBan = $(".txt_IDPhongBan_HoaDon").val();
  var NgayThang = $(".txt_ngayThang_hoadon").val();
  // var TongTien = $(".txt_tongTien_hoadon").val();

  var dataSend = {
    event: "insertHoaDon",
    ID_HoaDon: ID_HoaDon,
    // ID_bacsi: ID_bacsi,
    ID_PhongBan: ID_PhongBan,
    NgayThang: NgayThang,
    // TongTien: TongTien,
  };

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
