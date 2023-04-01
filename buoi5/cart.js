lst = [];
curItem = null;
$(function () {
  var data = [
    {
      "value": "Laptop Gaming Acer Aspire 7 A715 42G R05G",
      "label": "Laptop Gaming Acer Aspire 7 A715 42G R05G - 15,990,000",
      "maSP": "SP001",
      "tenSP": "Laptop Gaming Acer Aspire 7 A715 42G R05G",
      "DG": 15990000,
      "DVT": "Cái",
      "Loai": "Laptop",
    },
    {
      "value": "Laptop gaming ASUS ROG Strix G15 G513IE HN246W",
      "label": "Laptop gaming ASUS ROG Strix G15 G513IE HN246W - 22,990,000",
      "maSP": "SP002",
      "tenSP": "Laptop gaming ASUS ROG Strix G15 G513IE HN246W",
      "DG": 22990000,
      "DVT": "Cái",
      "Loai": "Laptop",
    },
    {
      "value": "Màn hình ASUS VZ27EHE 27 IPS 75Hz viền mỏng",
      "label": "Màn hình ASUS VZ27EHE 27 IPS 75Hz viền mỏng - 3,590,000",
      "maSP": "SP003",
      "tenSP": "Màn hình ASUS VZ27EHE 27 IPS 75Hz viền mỏng",
      "DG": 3590000,
      "DVT": "Cái",
      "Loai": "Màn hình",
    },
    {
      "value": "Chuột Logitech G Pro X Superlight Wireless Red",
      "label": "Chuột Logitech G Pro X Superlight Wireless Red - 2,990,000",
      "maSP": "SP004",
      "tenSP": "Chuột Logitech G Pro X Superlight Wireless Red",
      "DG": 2990000,
      "DVT": "Cái",
      "Loai": "Chuột",
    },
    {
      "value": "Bàn phím AKKO ACR Pro 68",
      "label": "Bàn phím AKKO ACR Pro 68 - 2,390,000",
      "maSP": "SP005",
      "tenSP": "Bàn phím AKKO ACR Pro 68",
      "DG": 2390000,
      "DVT": "Cái",
      "Loai": "Bàn Phím",
    }
  ];
  $("#txtSanPham").autocomplete({
    source: data,
    select: function (e, ui) {
      curItem = ui.item;
      $("#lblChon").html("Bạn đã chọn <b>[" + ui.item.tenSP + "]</b> với giá " + formatNumber(ui.item.DG) + " VNĐ");
    }
  });
});

function formatNumber(n) {
  return new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(n);
}

function themSP() {
  sl = parseInt($("#txtSL").val());
  curItem.SoLuong = sl
  curItem.ThanhTien = sl * curItem.DG;

  var i =0;
  for(i=0; i<lst.length; i++)
  {
    if(lst[i].maSP == curItem.maSP)
    break;
  }
  if(i <lst.length)
  {
    //tồn tại trong lst
    curItem.SoLuong = sl + lst[i].SoLuong;
    curItem.ThanhTien = curItem.SoLuong * curItem.DG;
    lst[i] = curItem;
  }
  else
  {
    lst.push(curItem);
  }
    TinhTongDon();
}

function xoaSP(id)
{
  var i =0
  for(i = 0; i < lst.length; i++)
  {
    if(lst[i].maSP == id)
    break;
  }
  if(i < lst.length)
  {
    lst.splice(i,1);
    TinhTongDon();
  }
}


function TinhTongDon(){
  tong = 0;
  for(i=0; i<lst.length; i++)
  {
    tong =  tong + lst[i].ThanhTien;
  }
  $("#txtTongTien").html(formatNumber(tong));
  $("#totSP").text(lst.length);
  $("#ulCart").html("");
  $("#cartTemplate").tmpl(lst).appendTo("#ulCart");
}