
function show() {
  console.log("abc");
  var dataSend = {
    event: "getAllPhongBan",
  };
  queryDataPost("php/api.php", dataSend, function (data) {
    if (data.items.length == 0) {
      console.log(data);
      $(".addListTheLoai").html(
        "<tr><td colspan=4>Không tìm thấy record</td><tr>"
      );
    } else {
      var htmls = "";
      var list = data.items;
      var stt = 1;
      for (var item in list) {
        var d = list[item];
        htmls =
          htmls +
          '<tr data-ID_PhongBan="' +
          d.ID_PhongBan +
          '" data-TenPhong="' +
          d.TenPhong +
          '" data-ID_bacsi="' +
          d.ID_bacsi +
          '" data-ID_khachhang="' +
          d.ID_khachhang +
          '" data-ID_DichVu="' +
          d.ID_DichVu +
          '">' +
          "<td>" +
          stt +
          "</td>" +
          "<td>" +
          d.ID_PhongBan +
          "</td>" +
          "<td>" +
          d.TenPhong +
          "</td>" +
          "<td>" +
          d.ID_bacsi +
          "</td>" +
          "<td>" +
          d.ID_khachhang +
          "</td>" +
          "<td>" +
          d.ID_DichVu +
          "</td>" +
          '<td class="click_view_theloai"><span class="badge bg-danger">Xem</span></td>' +
          "</tr>";
        stt++;
      }

        $(".addListTheLoai").html(htmls);
    }
  });
}