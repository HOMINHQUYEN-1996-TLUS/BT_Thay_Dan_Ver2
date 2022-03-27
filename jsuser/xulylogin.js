$(document).ready(function () {
  var myUser = JSON.parse(localStorage.getItem("userbookstore"));
  console.log(myUser);
  console.log(localStorage.getItem("rememberbookstore"));
  if (myUser != null || myUser != undefined) {
    var r = localStorage.getItem("rememberbookstore");

    if (r == "true") {
      $(".txtemail").val(localStorage.getItem("usernamebookstore"));
      $(".txtpass").val(localStorage.getItem("passwordbookstore"));
    }
  }
  $(".btnlogin").click(function () {
    var username = $(".txtemail").val();
    var pass = $(".txtpass").val();
    if (username == "") {
      alert("Nhập số email");
    } else if (pass == "") {
      alert("Mật khẩu");
    } else {
      var datasend = {
        event: "login",
        username: username,
        password: pass,
      };
      console.log(datasend);
      queryData("php/api.php", datasend, function (data) {
        var dog = data.items[0];
        console.log(dog.count);
        console.log(data)
        if (data.success == 1 && dog.count != 0) {
          if ($(".remember").is(":checked")) {
            localStorage.setItem("rememberbookstore", true);
          } else {
            localStorage.removeItem("rememberbookstore");
          }
          localStorage.setItem("usernamebookstore", username);
          localStorage.setItem("passwordbookstore", pass);
          localStorage.setItem("avartarbookstore", data.items[0].avartar);
          localStorage.setItem("userbookstore", JSON.stringify(data)); //lưu đối tượng

          location.href = "index.html"; //chuyển sang index.html
        } else {
          alert("Tài khoản chưa đúng");
          $(".txtemail").val("");
          $(".txtpass").val("");
        }
      });
    }
  });
});

function queryData(url, dataSend, callback) {
  $.ajax({
    type: "POST",
    url: url,
    data: dataSend,
    async: true,
    dataType: "json",
    success: callback,
  });
}
