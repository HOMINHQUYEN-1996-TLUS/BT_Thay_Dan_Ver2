function showLichSuBenhNhan () {
    console.log('abc')
    var sdt = $(".txt_IDLichSuBenhNhan").val();
    var datasend = {
      event: "LichSuKham",
      ID_khachhang: sdt,
    };
    queryDataPost("php/api.php", datasend, function (data) {
      if (data.items.length == 0) {
        console.log(data);
        $(".ListLichSuKham").html(
        "<tr><td colspan=4>Không tìm thấy record</td><tr>"
        );
      } else {
      console.log(datasend)
      console.log(data)
      var htmls = "";
      var list = data.items;
      var stt = 1;
      for (var item in list) {
        var d = list[item];
        htmls =
          htmls +
          '<tr data-ID_khachhang="' +
          d.ID_khachhang +
          '" data-TongTien="' +
          d.TongTien +
          '" data-GiaCuoi="' +
          d.GiaCuoi +
          '" data-NgayThang="' +
          d.NgayThang +
          '" data-TenPhong="' +
          d.TenPhong +
          '" data-HoTen="' +
          d.HoTen +
          '" data-TenDichVu="' +
          d.TenDichVu +
          '">' +
          "<td>" +
          stt +
          "</td>" +
          "<td>" +
          d.ID_khachhang +
          "</td>" +
          "<td>" +
          d.TongTien +
          "</td>" +
          "<td>" +
          d.GiaCuoi +
          "</td>" +
          "<td>" +
          d.NgayThang +
          "</td>" +
          "<td>" +
          d.TenPhong +
          "</td>" +
          "<td>" +
          d.HoTen +
          "</td>" +
          "<td>" +
          d.TenDichVu +
          "</td>" +
          '<td class="click_view_theloai"><span class="badge bg-danger">Xem</span></td>' +
          "</tr>";
        stt++;
      }

      $(".ListLichSuKham").html(htmls);
    }
    });
}