function swapMain(tenbien) {
  $(".form_bacsi").addClass("is-hidden"); //ẩn
  $(".form_khachhang").addClass("is-hidden"); //ẩn
  $(".formPhongBan").addClass("is-hidden"); //ẩn
  $(".formsach").addClass("is-hidden"); //ẩn
  $(".formBenhNhan").addClass("is-hidden"); //ẩn
  $("." + tenbien).removeClass("is-hidden");
}
var record = 3;
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
//Sử dụng thư viện bootbox
function alert_error(mes) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: function () {
      /* your callback code */
    },
  });
}
function alert_success(mes, callback) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: callback,
  });
}
function alert_info(mes) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: function () {
      /* your callback code */
    },
  });
}
$(document).ready(function () {
  buildUserDropdown();
  //swapMain("formtheloai");
  $(".btn_log_out").click(function () {
    logout();
  });
  $(".btn_change_matkhau").click(function () {
    $(".showmodalchangematkhau").modal("show");
  });
  $(".btn_change_pass").click(function () {
    //var txtpassold=$('.txtpassold').val();
    var txtpassnew = $(".txtpassnew").val();
    var txtpassnewagain = $(".txtpassnewagain").val();
    if (txtpassnew == "" || txtpassnewagain == "") {
      alert_info("Mật khẩu không được trống");
    } else if (txtpassnew != txtpassnewagain) {
      alert_info("Mật khẩu cũ và mới không khớp");
    } else {
      var dataSend = {
        event: "updatepass",
        pass: txtpassnew,

        username: localStorage.getItem("usernamebookstore"),
      };
      console.log(dataSend);
      $(".progesschangepass").html(
        "<img src='images/loading.gif' width='5px' height='5px'/>"
      );

      queryDataPost("php/api.php", dataSend, function (res) {
        console.log(res);
        if (res["updatepass"] == 1) {
          alert_info("Thay đổi mật khẩu thành công");
          $(".showmodalchangematkhau").modal("hide");
        } else {
          alert_info("Thay đổi mật khẩu thất bại");
        }

        $(".progesschangepass").html("");
      });
    }
  });
  $(".menuPhongBan").click(function () {
    //   $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">Thể Loại</li>');

    $(".titlestatus").html(
      ' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' +
        $(this).text() +
        "</li>"
    );

    swapMain("formPhongBan");
    $(".btnthemtl").prop("disabled", false);
    $(".btnsuatl").prop("disabled", true);
    $(".btnluutl").prop("disabled", true);
    showDataTheLoai();
  });
  $(".menuBenhNhan").click(function () {
	  console.log('abc')
    $(".titlestatus").html(
      ' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' +
        $(this).text() +
        "</li>"
    );

    swapMain("formBenhNhan");
  });
  $(".menusach").click(function () {
    $(".titlestatus").html(
      ' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' +
        $(this).text() +
        "</li>"
    );
    swapMain("formsach");
    showCBTheLoai();
    showCBNhaXB();
    showDataSach(0, record);
    $(".btnthemsach").prop("disabled", false);
    $(".btnsuasach").prop("disabled", true);
    $(".btnluusach").prop("disabled", true);
  });
});
function printSTT(record, pageCurr) {
  if (pageCurr + 1 == 1) {
    return 1;
  } else {
    return record * (pageCurr + 1) - (record - 1);
  }
}
function buildSlidePage(obj, codan, pageActive, totalPage) {
  var html = "";
  pageActive = parseInt(pageActive);
  for (i = 1; i <= codan; i++) {
    if (pageActive - i < 0) break;
    html =
      '<button type="button" class="btn btn-outline btn-default" value="' +
      (pageActive - i) +
      '">' +
      (pageActive - i + 1) +
      "</button>" +
      html;
  }
  if (pageActive > codan) {
    html =
      '<button type="button" class="btn btn-outline btn-default" value="' +
      (pageActive - i) +
      '">...</button>' +
      html;
  }
  html +=
    '<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' +
    pageActive +
    '">' +
    (pageActive + 1) +
    "</button>";
  for (i = 1; i <= codan; i++) {
    if (pageActive + i >= totalPage) break;
    html =
      html +
      '<button  type="button" class="btn btn-outline btn-default" value="' +
      (pageActive + i) +
      '">' +
      (pageActive + i + 1) +
      "</button>";
  }
  if (totalPage - pageActive > codan + 1) {
    html =
      html +
      '<button type="button" value="' +
      (pageActive + i) +
      '" class="btn btn-outline btn-default">...</button>';
  }
  obj.html(html);
}

//Hàm upload ảnh
function initUploadAllCommon() {
  "use strict";
  var resize = new window.resize();
  resize.init();

  event.preventDefault();
  var files = event.target.files;
  var countFile = files.length;
  for (var i in files) {
    if (typeof files[i] !== "object") return false;

    (function () {
      var initialSize = files[i].size;

      resize.photo(files[i], 1200, "file", function (resizedFile) {
        var resizedSize = resizedFile.size;
        $(".progresscommon").html("Ảnh sách:Đang tải file");
        upload(resizedFile, function (res) {
          console.log(JSON.parse(res));
          //Lưu ý hàm này
          ketquauploadsach(JSON.parse(res));
        });

        // This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
        resize.photo(resizedFile, 600, "dataURL", function (thumbnail) {
          //console.log('Display the thumbnail to the user: ', thumbnail);
        });
      });
    })();
  }
}
var upload = function (photo, callback) {
  var formData = new FormData();
  formData.append("photo", photo);

  $.ajax({
    url: "./spuploadimagestatus/process.php",
    type: "POST",
    data: formData,
    async: true,
    xhrFields: {
      withCredentials: true,
    },
    processData: false, // tell jQuery not to process the data
    contentType: false, // tell jQuery not to set contentType
    success: callback,
  });
};
function buildUserDropdown() {
  myUser = JSON.parse(localStorage.getItem("userbookstore"));

  var avartar = localStorage.getItem("avartarbookstore");

  if (myUser == undefined || myUser == null || myUser == "") {
    location.href = "login.html";
  } else {
    $(".addusername").html(
      "<div style='text-align=center;'>" +
        myUser.items[0].fullname +
        '<br><a href="#" class="btn_change_matkhau">[Đổi mật khẩu]</a>&nbsp;<a href="#" class="btn_log_out">[Logout]</a></div>'
    );

    if (avartar == "" || avartar == undefined || avartar == "null") {
      $(".addvartar").attr("src", "images/vienthanhnha.png");
    } else {
      $(".addvartar").attr("src", "filesach/" + avartar);
    }
  }
}
function logout() {
  localStorage.removeItem("rememberbookstore");
  localStorage.removeItem("usernamebookstore");
  localStorage.removeItem("passwordbookstore");

  localStorage.removeItem("userbookstore");

  location.href = "login.html";
}
