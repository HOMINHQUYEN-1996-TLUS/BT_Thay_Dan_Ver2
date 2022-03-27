<?php
require_once("server.php");//add code php file server vào trong file api.php
$event=$_POST['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
	case "login":
	$mang=array();
		$username=$_POST['username'];
		$password=sha1($_POST['password']);
        //$rs=mysqli_query($conn,"select username,password from manager_login u where  username='".$username."' and `password`='".$password."'");
		$rs = mysqli_query($conn,"call checkLogin('".$username."','".$password."')");
        if(mysqli_num_rows($rs)>0){
		    while ($rows=mysqli_fetch_array($rs)){
			    // $usertemp['username']=$rows['username'];
                // $usertemp['password']=$rows['password'];
                $usertemp['count'] = $rows['count'];
		        array_push($mang,$usertemp);
		    }
	
            $jsondata['success'] =1;
		
            $jsondata['items'] =$mang;
		
            echo json_encode($jsondata);
		}
		else{
		$jsondata['success'] =0;
		
        $jsondata['items'] =$mang;
		echo json_encode($jsondata);
		}

        mysqli_close($conn);
        break;
	case "updatepass":
		$username=$_POST['username'];
		$pass=sha1($_POST['pass']);
        $sql="update `users` set password='$pass' where username='".$username."'";
		 
            if (mysqli_query($conn,$sql)) {
				if(mysqli_affected_rows($conn)>0){
					$res[$event] = 1;
				}
				else
				{
					$res[$event] = 0;
				}
            } else {
                $res[$event] = 0;
            }
        echo json_encode($res);
        mysqli_close($conn);
        break;
	case "deleteImage":
		$filelinkanh=$_POST['linkdata'];
		
              if($filelinkanh==""){
					$res["success"] = 1;
				}else{
					$filelinkanh="../filesach/".$filelinkanh;
				if(unlink($filelinkanh)){
						$res["success"] = 1;
						
					}else{
						
						$res["success"] = 2;//file not exsit
					}
				}
				
		echo json_encode($res);
        mysqli_close($conn);
        break;
	case "insertTL":
		$matl=$_POST['matl'];
		$tentl=$_POST['tentl'];   	
	    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  theloai where matl='".$matl."' ");
        $row=mysqli_fetch_array($rs);
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
		}else{
        $sql="INSERT INTO `theloai`(`matl`, `tentl`) VALUES ('".$matl."','".$tentl."')";
            if (mysqli_query($conn, $sql)) {
				if(mysqli_affected_rows($conn)>0){ //có thay đổi dữ liệu
					
                         $res["success"] = 1; //Insert dữ liệu thành công
				}
				else{
					$res["success"] = 0;//Không thành công
				}
            } else {
                $res["success"] = 0;  //Không thành công
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
   
        case "updateTL":
                $matl=$_POST['matl'];
                $tentl=$_POST['tentl'];   
                //Viết câu lệnh update có điều kiện where matl=biến client
                $sql="update theloai set TenTL='".$tentl."' where MaTL='".$matl."'";      
                    if (mysqli_query($conn, $sql)) {
                        if(mysqli_affected_rows($conn)>0){
                            
                                 $res["success"] = 1; //update dữ liệu thành công
                        }
                        else{
                            $res["success"] = 0;//Không thành công
                        }
                    } else {
                        $res["success"] = 0;  //Không thành công
                    }
               
                echo json_encode($res);
                mysqli_close($conn);
                break; 
        case "deleteTL":
                    $matl=$_POST['matl'];
                    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
                    $sql="delete  from theloai  where MaTL='".$matl."'";      
                        if (mysqli_query($conn, $sql)) {
                            if(mysqli_affected_rows($conn)>0){
                                
                                     $res["success"] = 1; //update dữ liệu thành công
                            }
                            else{
                               $res["success"] = 0 ;//Không thành công
                            }
                        } else {
                            $res["success"] = 0;  //Không thành công
                        }
                   
                    echo json_encode($res);
                    mysqli_close($conn);
                    break;
       //Get tất cả các TheLoai
    case "getALLTL":
		$mang=array();   
        $sql=mysqli_query($conn,"select matl,tentl from Theloai"); 
		while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['matl']=$rows['matl'];//{'matl':'TH','tentl':'tin hoc'}
			$usertemp['tentl']=$rows['tentl'];  //{'matl':'TH','tentl':'tin hoc'}
            array_push($mang,$usertemp); //[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]
        }       
        $jsonData['items'] =$mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
	case "getALLNhaXB":
		$mang=array();   
        $sql=mysqli_query($conn,"select maxb,tenxb,sdt,email,diachi from nhaxb"); 
		while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['maxb']=$rows['maxb'];//{'matl':'TH','tentl':'tin hoc'}
			$usertemp['tenxb']=$rows['tenxb'];  //{'matl':'TH','tentl':'tin hoc'}
			$usertemp['sdt']=$rows['sdt'];
			$usertemp['email']=$rows['email'];
			$usertemp['diachi']=$rows['diachi'];
            array_push($mang,$usertemp); //[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]
        }       
        $jsonData['items'] =$mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
	case "insertSach":
		$masach=$_POST['masach'];
		$tensach=$_POST['tensach'];
		$matl=$_POST['matl'];
		$maxb=$_POST['maxb'];  	
		$urlsach=$_POST['urlsach'];  		
	    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  sach where masach='".$masach."' ");
        $row=mysqli_fetch_array($rs);
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
		}else{
        $sql="INSERT INTO `sach`(`masach`, `tensach`, `matl`, `maxb`,urlsach) VALUES ('".$masach."','".$tensach."','".$matl."','".$maxb."','".$urlsach."')";
            if (mysqli_query($conn, $sql)) {
				if(mysqli_affected_rows($conn)>0){ //có thay đổi dữ liệu
					
                         $res["success"] = 1; //Insert dữ liệu thành công
				}
				else{
					$res["success"] = 0;//Không thành công
				}
            } else {
                $res["success"] = 0;  //Không thành công
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
	 case "updateSach":
              $masach=$_POST['masach'];
			  $tensach=$_POST['tensach'];
			  $matl=$_POST['matl'];
			  $maxb=$_POST['maxb'];   
			  $urlsach=$_POST['urlsach'];  
                //Viết câu lệnh update có điều kiện where matl=biến client
                $sql="update sach set tensach='".$tensach."',matl='".$matl."',maxb='".$maxb."',urlsach='".$urlsach."' where masach='".$masach."'";      
                    if (mysqli_query($conn, $sql)) {
                        if(mysqli_affected_rows($conn)>0){
                            
                                 $res["success"] = 1; //update dữ liệu thành công
                        }
                        else{
                            $res["success"] = 0;//Không thành công
                        }
                    } else {
                        $res["success"] = 0;  //Không thành công
                    }
               
                echo json_encode($res);
                mysqli_close($conn);
                break; 
	case "getSach":
		$mang=array();
        $record=$_POST['record']; //số dòng sẽ lấy về từ server
        $page=$_POST['page']; //số số trang mà client
		$search=$_POST['search']; //Tìm kiếm dữ liệu
		$vt=$page*$record;  //page=1,record=2
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select masach,tensach,sotrang,ngayxb,s.maxb,s.matl,xb.tenxb,tl.tentl,s.urlsach from sach s,theloai tl,nhaxb xb where s.maxb=xb.maxb and s.matl=tl.matl and (s.masach like '%".$search."%' or s.tensach like '%".$search."%') order by s.masach asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['masach']=$rows['masach'];
			$usertemp['tensach']=$rows['tensach'];
			$usertemp['sotrang']=$rows['sotrang'];
            $usertemp['ngayxb']=$rows['ngayxb'];
			$usertemp['maxb']=$rows['maxb'];
			$usertemp['matl']=$rows['matl'];
			$usertemp['tenxb']=$rows['tenxb'];
			$usertemp['tentl']=$rows['tentl'];
			$usertemp['urlsach']=$rows['urlsach'];
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sach s,theloai tl,nhaxb xb where s.maxb=xb.maxb and s.matl=tl.matl and (s.masach like '%".$search."%' or  s.tensach like '%".$search."%') order by s.masach asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
		

    case "getAllPhongBan" :
        $mang=array();   
        //$sql=mysqli_query($conn,"select ID_PhongBan,TenPhong,ID_bacsi,ID_khachhang,ID_DichVu from phongban"); 
		$sql = mysqli_query($conn,"call procedureName()");
        while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['ID_PhongBan']=$rows['ID_PhongBan'];//{'matl':'TH','tentl':'tin hoc'}
			$usertemp['TenPhong']=$rows['TenPhong'];  //{'matl':'TH','tentl':'tin hoc'}
            $usertemp['ID_bacsi']=$rows['ID_bacsi'];
            $usertemp['ID_khachhang']=$rows['ID_khachhang'];
            $usertemp['ID_DichVu']=$rows['ID_DichVu'];
            array_push($mang,$usertemp); //[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]
        }       
        $jsonData['items'] =$mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
    case "LichSuKham" : 
        $ID_khachhang=$_POST['ID_khachhang'];
        $mang=array();   
        // $sql=mysqli_query($conn,"select khachhang.ID_khachhang, hoadon.TongTien, hoadon.NgayThang,phongban.TenPhong,bacsi.HoTen
        //     FROM ( ( ( hoadon INNER join phongban
        //     ON hoadon.ID_PhongBan = phongban.ID_PhongBan ) inner join khachhang 
        //     on phongban.ID_khachhang = khachhang.ID_khachhang) INNER JOIN bacsi
        //     on phongban.ID_bacsi = bacsi.ID_bacsi)
        //     WHERE khachhang.ID_khachhang = '".$ID_khachhang."' order by hoadon.NgayThang asc "); 
        $sql = mysqli_query($conn,"call getLichSuKham('".$ID_khachhang."')");
		while($rows=mysqli_fetch_array($sql))
        {
            $usertemp['ID_khachhang']=$rows['ID_khachhang'];
			$usertemp['TongTien']=$rows['TongTien'];  //{'matl':'TH','tentl':'tin hoc'}
            $usertemp['NgayThang']=$rows['NgayThang'];
            $usertemp['TenPhong']=$rows['TenPhong'];
            $usertemp['HoTen']=$rows['HoTen'];
            array_push($mang,$usertemp); //[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]
        }       
        $jsonData['items'] =$mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
    case "insertPhongBan":
            $ID_PhongBan=$_POST['ID_PhongBan'];
            $TenPhong=$_POST['TenPhong'];   
            $ID_bacsi=$_POST['ID_bacsi'];
            $ID_khachhang=$_POST['ID_khachhang'];
            $ID_DichVu=$_POST['ID_DichVu'];	
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  phongban where ID_PhongBan='".$ID_PhongBan."' ");
            $row=mysqli_fetch_array($rs);
            if((int)$row['total']>0){
                 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
            }else{
            $sql="INSERT INTO `phongban`(`ID_PhongBan`, `TenPhong`, `ID_bacsi`, `ID_khachhang`, `ID_DichVu`) VALUES ('".$ID_PhongBan."','".$TenPhong."','".$ID_bacsi."','".$ID_khachhang."','".$ID_DichVu."')";
                if (mysqli_query($conn, $sql)) {
                    if(mysqli_affected_rows($conn)>0){ //có thay đổi dữ liệu
                        
                             $res["success"] = 1; //Insert dữ liệu thành công
                    }
                    else{
                        $res["success"] = 0;//Không thành công
                    }
                } else {
                    $res["success"] = 0;  //Không thành công
                }
            }
            echo json_encode($res);
            mysqli_close($conn);
            break;
        case "insertHoaDon" :
            $ID_HoaDon=$_POST['ID_HoaDon'];
            $ID_bacsi=$_POST['ID_bacsi'];   
            $ID_PhongBan=$_POST['ID_PhongBan'];
            $NgayThang=$_POST['NgayThang'];
            $TongTien=$_POST['TongTien'];	
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  hoadon where ID_HoaDon='".$ID_HoaDon."' ");
            $row=mysqli_fetch_array($rs);
            if((int)$row['total']>0){
                 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
            }else{
            $sql="INSERT INTO `hoadon`(`ID_HoaDon`, `ID_bacsi`, `ID_PhongBan`, `NgayThang`, `TongTien`) VALUES ('".$ID_HoaDon."','".$ID_bacsi."','".$ID_PhongBan."','".$NgayThang."','".$TongTien."')";
                if (mysqli_query($conn, $sql)) {
                    if(mysqli_affected_rows($conn)>0){ //có thay đổi dữ liệu
                        
                             $res["success"] = 1; //Insert dữ liệu thành công
                    }
                    else{
                        $res["success"] = 0;//Không thành công
                    }
                } else {
                    $res["success"] = 0;  //Không thành công
                }
            }
            echo json_encode($res);
            mysqli_close($conn);
            break;
        default:
        # code...
        break;
}
?>