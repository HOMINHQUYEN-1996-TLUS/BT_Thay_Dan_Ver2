$(document).ready(function () {
  var flag = 0; //giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
  $(".btnthemtl").on("click", function () {
    console.log("click them");
    //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
    $(".btnthemtl").prop("disabled", true);
    $(".btnluutl").prop("disabled", false);
    $(".btnsuatl").prop("disabled", true);
    $(".txtmatl").prop("disabled", false);
    //2.Xóa các ô text field
    resetViewTL();
    flag = 1;
  });
  $(".btnsuatl").on("click", function () {
    console.log("click them");
    //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
    $(".btnthemtl").prop("disabled", true);
    $(".btnluutl").prop("disabled", false);
    $(".btnsuatl").prop("disabled", true);
    flag = 2;
  });
  $(".btnlamlaitl").on("click", function () {
    resetViewTL();
    flag = 0;
    $(".btnthemtl").prop("disabled", false);
    $(".btnluutl").prop("disabled", true);
    $(".btnsuatl").prop("disabled", true);
    $(".txtmatl").prop("disabled", false);
  });
  $(".btnluutl").on("click", function () {
    if (flag == 1) {
      console.log("Thêm");
      //1.Lấy dữ liệu trên form
      var matl = $(".txtmatl").val();
      var tentl = $(".txttentl").val();
      if (matl == "") {
        alert_info("Mã TL phải là khác khoảng trống");

        $(".txtmatl").focus();
      } else if (tentl == "") {
        alert_info("Tên TL phải là khác khoảng trống");
        $(".txttentl").focus();
      } else {
        ///dữ liệu ta thỏa mản
        var dataclient = {
          matl: matl,
          tentl: tentl,
          event: "insertTL",
        };
        queryDataPost("php/api.php", dataclient, function (dataserver) {
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
      }
    } else if (flag == 2) {
      console.log("update");
      //1.Lấy dữ liệu trên form
      var matl = $(".txtmatl").val();
      var tentl = $(".txttentl").val();
      if (matl == "") {
        alert_info("Mã TL phải là khác khoảng trống");

        $(".txtmatl").focus();
      } else if (tentl == "") {
        alert_info("Tên TL phải là khác khoảng trống");
        $(".txttentl").focus();
      } else {
        ///dữ liệu ta thỏa mản
        var dataclient = {
          matl: matl,
          tentl: tentl,
          event: "updateTL",
        };
        queryDataPost("php/api.php", dataclient, function (dataserver) {
          console.log(dataserver);
          if (dataserver.success == 1) {
            alert_success("Update Thành công");
            showDataTheLoai();
            flag = 0;
          } else {
            alert_error("Update Không Thành công");
          }
        });
      }
    } else {
      console.log("bạn chưa thao tác thêm hoặc sửa");
    }
  });
  $(".btnxoatl").on("click", function () {
    var matl = $(".txtmatl").val();
    var tentl = $(".txttentl").val();
    bootbox.confirm(
      "Bạn có chắc xóa thể loại[ " + tentl + " ] này không?",
      function (result) {
        if (result == true) {
          var dataSend = {
            event: "deleteTL",
            matl: matl,
          };

          queryDataPost("php/api.php", dataSend, function (data) {
            if (data.success == 1) {
              showDataTheLoai();
              resetViewTL();
            } else if (data.success == 2) {
              alert_info("Thể loại đã được sử dụng trong bảng sách");
            } else {
              alert_error("Xóa lỗi");
            }
          });
        } else {
          // alert_info("Lỗi");
        }
      }
    );
  });

  $(".btn_LichSuKham").on("click", function () {
    console.log('abc')
    var sdt = $(".txt_sdt").val();
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
          '" data-HoTen="' +
          d.HoTen +
          '" data-TongTien="' +
          d.TongTien +
          '" data-NgayThang="' +
          d.NgayThang +
          '" data-TenPhong="' +
          d.TenPhong +
          '">' +
          "<td>" +
          stt +
          "</td>" +
          "<td>" +
          d.ID_khachhang +
          "</td>" +
          "<td>" +
          d.HoTen +
          "</td>" +
          "<td>" +
          d.TongTien +
          "</td>" +
          "<td>" +
          d.NgayThang +
          "</td>" +
          "<td>" +
          d.TenPhong +
          "</td>" +
          '<td class="click_view_theloai"><span class="badge bg-danger">Xem</span></td>' +
          "</tr>";
        stt++;
      }

      $(".ListLichSuKham").html(htmls);
    }
    });
  });
  $(".addListTheLoai").on("click", ".click_view_theloai", function () {
    var matl = $(this).parent().attr("data-matl");
    var tentl = $(this).parent().attr("data-tentl");
    $(".txtmatl").val(matl);
    $(".txttentl").val(tentl);
    $(".btnthemtl").prop("disabled", true);
    $(".btnluutl").prop("disabled", true);
    $(".btnsuatl").prop("disabled", false);
    $(".txtmatl").prop("disabled", true);
  });
});
function resetViewTL() {
  $(".txtmatl").val("");
  $(".txttentl").val("");
  $(".txtmatl").focus();
}
//viết hàm hiển thị dữ liệu lên table
function showDataTheLoai() {
  console.log("abc");
  var dataSend = {
    event: "getAllPhongBan",
  };
  queryDataPost("php/api.php", dataSend, function (data) {
    if (data.items.length == 0) {
      console.log(data);
      $(".ListLichSuKham").html(
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

      $(".ListLichSuKham").html(htmls);
    }
  });
}
function show(){
	console.log('abc')
}
function queryDataPost(url, dataSend, callback) {
  $.ajax({
    type: "POST",
    url: url,
    data: dataSend,
    async: true,
    dataType: "json",
    success: callback,
  });
}
