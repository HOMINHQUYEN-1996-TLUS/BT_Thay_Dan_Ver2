var urlimagesach=""; //biến lưu tên tập tin hình ảnh 
var flagSach=0
$(document).ready(function(){
	//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemsach").on('click',function(){
		console.log("click them");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemsach").prop("disabled",true);
		$(".btnluusach").prop("disabled",false);
        $(".btnsuasach").prop("disabled",true);
		$(".txtmasach").prop("disabled",false);
		//2.Xóa các ô text field 
		resetViewSach();
		flagSach=1;
		urlimagesach="";
		$(".imgsach").addClass("is-hidden");    
		$("#imgSach").val("");
		document.querySelector("#imgSach").addEventListener('change', initUploadAllCommon);	
	});
	 $(".btnsuasach").on('click',function(){
		 document.querySelector("#imgSach").addEventListener('change', initUploadAllCommon);	
		console.log("click them");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemsach").prop("disabled",true);
		$(".btnluusach").prop("disabled",false);
        $(".btnsuasach").prop("disabled",true);
		flagSach=2;
	});
	$(".btnlamlaisach").on('click',function(){
		resetViewSach();
		flagSach=0;
		$(".btnthemsach").prop("disabled",false);
		$(".btnluusach").prop("disabled",true);
        $(".btnsuasach").prop("disabled",true);
		$(".txtmasach").prop("disabled",false);
			urlimagesach="";
		document.querySelector("#imgSach").removeEventListener('change', initUploadAllCommon);
	});
	 $(".btnluusach").on('click',function(){
		 if(flagSach==1){
			console.log("Thêm");
			//1.Lấy dữ liệu trên form
			var masach=$(".txtmasach").val();			
			var tensach=$(".txttensach").val();
			var matl=$(".cbtheloai").val();			
			var maxb=$(".cbnhaxb").val();
			if(masach==""){
				alert_info("Mã sách là khác khoảng trống");
				
				$(".txtmasach").focus();
			}else if(tensach==""){
				alert_info("Tên sách phải là khác khoảng trống");
				$(".txttensach").focus();
			}else if(matl=="0"){
				alert_info("Chọn 1 thể loại cho sách");
				$(".cbtheloai").focus();
			}else if(maxb=="0"){
				alert_info("Chọn 1 nhà xuất bản cho sách");
				$(".cbnhaxb").focus();
			}else{ ///dữ liệu ta thỏa mản
				var dataclient={
					urlsach:urlimagesach,
					masach:masach,
					tensach:tensach,
					matl:matl,
					maxb:maxb,
					event:"insertSach"
				}
				queryDataPost("php/api.php",dataclient,function(dataserver){
					console.log(dataserver);
					if(dataserver.success==2){
						alert_error("Bị trùng khóa");
					}else if(dataserver.success==1){
						//showDataTheLoai();
						alert_success("Thêm Thành công");
						resetViewSach();
						flagSach=0;
					}else {
						alert_error("Thêm Không Thành công");
					}
				});	
				
			}
		 }else if(flagSach==2){
			var masach=$(".txtmasach").val();			
			var tensach=$(".txttensach").val();
			var matl=$(".cbtheloai").val();			
			var maxb=$(".cbnhaxb").val();
			if(masach==""){
				alert_info("Mã sách là khác khoảng trống");
				
				$(".txtmasach").focus();
			}else if(tensach==""){
				alert_info("Tên sách phải là khác khoảng trống");
				$(".txttensach").focus();
			}else if(matl=="0"){
				alert_info("Chọn 1 thể loại cho sách");
				$(".cbtheloai").focus();
			}else if(maxb=="0"){
				alert_info("Chọn 1 nhà xuất bản cho sách");
				$(".cbnhaxb").focus();
			}else{ ///dữ liệu ta thỏa mản
				var dataclient={
					urlsach:urlimagesach,
					masach:masach,
					tensach:tensach,
					matl:matl,
					maxb:maxb,
					event:"updateSach"
				}
				queryDataPost("php/api.php",dataclient,function(dataserver){
					console.log(dataserver);
					 if(dataserver.success==1){
						alert_success("Update Thành công");
						showDataTheLoai();
						flagSach=0;
					}else {
						alert_error("Update Không Thành công");
					}
				});	
				
			}
		 }else{
			 console.log("bạn chưa thao tác thêm hoặc sửa");
		 }
	 });
	 $(".btnxoatl").on('click',function(){
		  var matl=$(".txtmasach").val();
		  var tentl=$(".txttentl").val();
	 bootbox.confirm("Bạn có chắc xóa thể loại[ "+tentl+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteTL",
                matl:matl
            };
       
		
            queryDataPost("php/api.php", dataSend, function (data) {
              if(data.success==1){
				showDataTheLoai();
                resetViewSach();
			  }else if(data.success==2){
				  alert_info("Thể loại đã được sử dụng trong bảng sách");
			  }else{
				  alert_error("Xóa lỗi");
			  }
               
				
            });
			
			
        }else
        {
            // alert_info("Lỗi");
        }
	 });
	 });
	 $(".addListTheLoai").on('click','.click_view_theloai',function(){
		var matl= $(this).parent().attr("data-matl");
		var tentl= $(this).parent().attr("data-tentl");
		  $(".txtmasach").val(matl);
		$(".txttentl").val(tentl);
		$(".btnthemsach").prop("disabled",true);
		$(".btnluusach").prop("disabled",true);
        $(".btnsuasach").prop("disabled",false);
		$(".txtmasach").prop("disabled",true);
	 });
	 ///Xử lý các nút mà phân trang
	 $(".pagenumbersach").on('click','button',function(){
		 console.log($(this).val());
		 showDataSach($(this).val(),record);
	 });
	  $(".btnfindsach").on('click',function(){
		   showDataSach(0,record);
	  });
	  $(".txtfindsach").keypress(function(e){
		  if(e.which==13){
		   showDataSach(0,record);
		  }
	  });
	  $(".addListSach").on('click','td',function(){
		  var masach= $(this).parent().attr("data-masach");
		var tensach= $(this).parent().attr("data-tensach");
		var urlsach= $(this).parent().attr("data-urlsach");
		 $(".txtmasach").val(masach);
		$(".txttensach").val(tensach);
		$(".btnthemsach").prop("disabled",true);
		$(".btnluusach").prop("disabled",true);
        $(".btnsuasach").prop("disabled",false);
		$(".txtmasach").prop("disabled",true);
		 urlimagesach=urlsach;
		 //hiển thị lên 
		 $(".imgsach").removeClass("is-hidden");
		 $("#imgPreviewSach").attr("src","filesach/"+urlimagesach);
	  });
 });
 function resetViewSach(){
	    $(".txtmasach").val("");
		$(".txttensach").val("");
		$(".txtsotrang").val("");
		$(".txtgiaban").val("");
		$(".cbtheloai").val("0");
		$(".cbnhaxb").val("0");
		$(".txtmasach").focus();
 }
 //viết hàm hiển thị dữ liệu lên table
 function showDataTheLoai(){
	var dataSend={
		event:"getALLTL"
	}
	queryDataPost("php/api.php", dataSend, function (data) {
		if(data.items.length==0){
			console.log(data);
			$(".addListTheLoai").html("<tr><td colspan=4>Không tìm thấy record</td><tr>");
		}else{
			var htmls='';
			var list=data.items;
			var stt=1;
			for(var item in list)
			{
					var d=list[item];
					htmls=htmls+'<tr data-matl="'+d.matl+'" data-tentl="'+d.tentl+'">'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.matl+'</td>'+
                            '<td>'+d.tentl+'</td>'+                                                                                          
                            '<td class="click_view_theloai"><span class="badge bg-danger">Xem</span></td>'+
                          '</tr>';
					stt++;
			}
			
			$(".addListTheLoai").html(htmls);
		}
		
	});
 }
 //Viết 2 hàm để lấy dữ liệu từ server đổ vào combox 
 function showCBTheLoai(){
	var dataSend={
		event:"getALLTL"
	}
	queryDataPost("php/api.php", dataSend, function (res) {
		if(res.items.length==0){
			$('.cbtheloai').html("<option value='0'>Chọn 1 thể loại sách</option>");
		}else{
		  var htmls='<option value="0">Chọn 1 thể loại sách</option>';
		  var list=res.items;
		  for(var item in list){
				var d=list[item];
				htmls=htmls+'<option value="'+d.matl+'">'+d.tentl+'</option>'
		  }
		 $('.cbtheloai').html(htmls);
		}
	});
	
 }
 function showCBNhaXB(){
	var dataSend={
		event:"getALLNhaXB"
	}
	queryDataPost("php/api.php", dataSend, function (res) {
		if(res.items.length==0){
			$('.cbtheloai').html("<option value='0'>Chọn 1 nhà xuất bản</option>");
		}else{
		  var htmls='<option value="0">Chọn 1 nhà xuất bản</option>';
		  var list=res.items;
		  for(var item in list){
				var d=list[item];
				htmls=htmls+'<option value="'+d.maxb+'">'+d.tenxb+'</option>'
		  }
		 $('.cbnhaxb').html(htmls);
		}
	});
	
 }
 //Viết 1 hàm showData trên table Sach
 
 function showDataSach(page,record){
	 var find=$('.txtfindsach').val();
		var dataSend={
		page:page,
		record:record,
		search:find,
		event:"getSach"
	}
	$('.addListSach').html('<tr><td colspan=8><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
	queryDataPost("php/api.php", dataSend, function (res) {
		if(res.items.length==0){
			$('.addListSach').html("<tr><td colspan=8>Không tìm thấy dữ liệu</td></tr>");
			$('.pagenumbersach').html("");
		}else{
			
		 var stt=printSTT(record,res.page);
		  var htmls='';
		  var list=res.items;
		  for(var item in list){
				var d=list[item];
				htmls=htmls+' <tr data-masach="'+d.masach+'" data-tensach="'+d.tensach+'" data-urlsach="'+d.urlsach+'">'+
                                '<td>'+stt+'</td>'+
                                 '<td>'+d.masach+'</td>'+
								  '<td>'+d.tensach+'</td>'+
								   '<td>'+d.sotrang+'</td>'+
								    '<td>'+d.ngayxb+'</td>'+
									 '<td>'+d.tenxb+'</td>'+
									  '<td>'+d.tentl+'</td>'+
                               ' <td><span class="badge bg-danger">Xem</span></td>'+
                              '</tr>';             
							  stt++;
		  }
		 $('.addListSach').html(htmls);
		 buildSlidePage($('.pagenumbersach'),5,res.page,res.totalpage);
		 
		}
	});
 }
 function ketquauploadsach(oj){
	 console.log(oj);
	 if(oj.status==true)
	 {
		 $(".progresscommon").html("Ảnh sách:Tải Thành công");
		 urlimagesach=oj.attach;
		 //hiển thị lên 
		 $(".imgsach").removeClass("is-hidden");
		 $("#imgPreviewSach").attr("src","filesach/"+urlimagesach);
		 if(flagSach==2){
			showDataSach();
		 }
	 }else{
		 $(".progresscommon").html("Ảnh sách:Tải thất bại");
	 }
 }
 //Bắt sự kiện 
 $(".btndeletefilesach").click(function(){
	 
	 var datasend={
		 event:"deleteImage",
		 linkdata:urlimagesach
	 }
	 queryDataPost("php/api.php", datasend, function (res) {
		 if(res.success==1){
			  urlimagesach="";
		 //hiển thị lên 
		  $(".progresscommon").html("Ảnh sách");
		 $(".imgsach").addClass("is-hidden");
		 $("#imgPreviewSach").attr("src","");
		 }else{
			alert_info("Lỗi xóa file");
		 }
	 });
 });