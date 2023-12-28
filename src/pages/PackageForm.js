import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useEffect } from 'react';
/*import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
//import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
//mport TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RegisteredPackages from '../components/Tables/RegisteredPackages';*/
import { dexieDB, addDataToFireStoreAndDexie, addDataToDexieTable } from '../database/cache';
import { fireDB } from '../database/firebase';
import {
  doc,
  setDoc,
  collection,
  getDoc, getDocs,
  query, where,
} from "firebase/firestore";


export default function PackageForm() {
  const center = "GD10";
  const diemTK = "TK01";

  const defaultForm = {
    id: "",
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    type: "",
    weight: "",
    cost: "",
    startGDpoint: center,
    startTKpoint: diemTK,
    endTKpoint: "",
    endGDpoint: "",
  }
  const [inputs, setInputs] = useState(defaultForm);
  const [distance, setDistance] = useState("");
  const [regisDate, setRegisDate] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const calculateCost = (weight, distance) => {
    if (isNaN(weight) || isNaN(distance)) return "";
    else return weight * distance * 1000;
  }

  const handleDateChange = (event) => {
    setRegisDate(event.target.value);
  }
  
  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setInputs(values => ({...values, weight: newWeight}));
    setInputs(values => ({...values, cost: calculateCost(newWeight, distance)}));
  }

  const handleReceiverAddressChange = (event) => {
    const reAddr = event.target.value;
    setInputs(values => ({...values, receiverAddress: reAddr}));
    const splitAddr = reAddr.split(", ");
    let city = splitAddr[splitAddr.length-1];
    let district = splitAddr[splitAddr.length-2];
    
    dexieDB.GDsystem.where('name').equals(district).first()
    .then(record => {
      if (record) {
        setInputs(values => ({...values, endGDpoint: record.id}));
      }
    })
    dexieDB.TKsystem.where('name').equals(city).first()
    .then(record => {
      if (record) {
        setInputs(values => ({...values, endTKpoint: record.id}));
      }
    })
  
    setDistance(parseInt(inputs.endGDpoint.substring(2)));
    setInputs(values => ({...values, cost: calculateCost(inputs.weight, distance)}));
  }

  const genId = async () => {
    try {
      // Đọc tất cả các đơn hàng để lấy id của đơn hàng cuối cùng
      const ordersCollection = collection(fireDB, "orders");
      const querySnapshot = await getDocs(ordersCollection);
  
      // Tìm id cuối cùng
      let lastOrderId = "";
      querySnapshot.forEach((doc) => {
        const orderId = doc.id;
          lastOrderId = orderId;
      });
  
      // Tăng giá trị của id lên 1
      const stt = parseInt(lastOrderId.substring(2)) + 1;
      const newId = `DH${stt.toString().padStart(3, "0")}`;
      setInputs(values => ({...values, id: newId}));
    } catch (error) {
      console.log("Lỗi khi tạo id đơn hàng", error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //Đưa weight và cost về dạng số
    let w = parseFloat(inputs.weight);
    let c = parseInt(inputs.cost);
    if (isNaN(w)) w = 0;
    if (isNaN(c)) c = 0;

    const submit = async() => {
      try {
        /*// Đọc tất cả các đơn hàng để lấy id của đơn hàng cuối cùng
        const ordersCollection = collection(fireDB, "orders");
        const querySnapshot = await getDocs(ordersCollection);
    
        // Tìm id cuối cùng
        let lastOrderId = "DH000";
        querySnapshot.forEach((doc) => {
          const orderId = doc.id;
            lastOrderId = orderId;
        });
    
        // Tăng giá trị của id lên 1
        const stt = parseInt(lastOrderId.substring(2)) + 1;
        const id = `DH${stt.toString().padStart(3, "0")}`;
       // setInputs(values => ({...values, id: id}));*/
        
        const newData = {
          ...inputs,
          //id,
          weight: w,
          cost: c,
          status: "Chưa xử lý"
        }
        //Thêm vào bảng orders trong FireStore
        const docRef = doc(fireDB, "orders", newData.id);
        setDoc(docRef, newData);
        const newDataDexie = {
          ...newData,
          regisDate: regisDate,
        }
        //Thêm vào bảng orders trong Dexie
        addDataToDexieTable("orders", newDataDexie);
        
        setInputs(defaultForm);
      } catch (error) {
        console.error('Loi khi add order trong fireDB:', error);
        alert ("Loi khi add order trong fireDB");
      }

      //Thêm vào orderHistory trong firestore
      try {
        const orderHistory1 = {
          historyID: inputs.id + "_1",
          orderId: inputs.id,
          date: regisDate,
          currentLocation: center,
          orderStatus: "Đang chờ xử lý",
          Description: "Đơn hàng nhận tại điểm giao dịch " + center,
        }
        const orderHistory2 = {
          historyID: inputs.id + "_2",
          orderId: inputs.id,
          date: 0,
          currentLocation: 0,
          orderStatus: 0,
          Description: 0,
        }
        const orderHistory3 = {
          historyID: inputs.id + "_3",
          orderId: inputs.id,
          date: 0,
          currentLocation: 0,
          orderStatus: 0,
          Description: 0,
        }
        const orderHistory4 = {
          historyID: inputs.id + "_4",
          orderId: inputs.id,
          date: 0,
          currentLocation: 0,
          orderStatus: 0,
          Description: 0,
        }

        const orderHistory5 = {
          historyID: inputs.id + "_5",
          orderId: inputs.id,
          date: 0,
          currentLocation: 0,
          orderStatus: 0,
          Description: 0,
        }

        const docRef1 = doc(fireDB, "orderHistory", orderHistory1.historyID);
        setDoc(docRef1, orderHistory1);
        const docRef2 = doc(fireDB, "orderHistory", orderHistory2.historyID);
        setDoc(docRef2, orderHistory2);
        const docRef3 = doc(fireDB, "orderHistory", orderHistory3.historyID);
        setDoc(docRef3, orderHistory3);
        const docRef4 = doc(fireDB, "orderHistory", orderHistory4.historyID);
        setDoc(docRef4, orderHistory4);
        const docRef = doc(fireDB, "orderHistory", orderHistory5.historyID);
        setDoc(docRef, orderHistory5);
        alert ("Tạo đơn hàng thành công");
        setInputs(defaultForm);
      } catch (error) {
        console.log("Lỗi khi tạo đơn hàng")
      }
    }

    const formValidate = () => {
      let error = 0;
      if (inputs.senderName == "" || inputs.senderPhone == "" || inputs.senderAddress == ""
      || inputs.receiverName == "" || inputs.receiverPhone == "" || inputs.receiverName == ""
      || inputs.type == "" || inputs.weight == "" || inputs.weight == 0 
      || inputs.endTKpoint == ""|| inputs.endGDpoint == "" || regisDate == "") {
          alert ("Vui lòng nhập đầy đủ thông tin");
          error = 1;
        } 
      
      if (error == 0) submit();
    }
    formValidate();
  }

  //genId();

  return (
    <>
    <h1> Ghi nhận bưu gửi của khách</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        flexGrow: 1,
        display: "inline",
        textAlign: "left",
      }}
      noValidate
      autoComplete="off"
      
    >
          <label>Thời gian ghi nhận:</label>
          <Stack direction="row" spacing={2}>
            <TextField required 
              name="regisDate"
              type="date" 
              size="small" 
              value={regisDate || ""}
              onChange={handleDateChange}>
              </TextField>
            {/*<TextField required 
              name="regisTime"
              type="time" 
              size="small" 
              value={inputs.regisTime || ""}
              onChange={handleChange}>
              </TextField>*/}
      
    </Stack>
      <TextField required 
          name="id"
          label="Mã đơn hàng"
          value={inputs.id}
          onChange={handleChange}/>
      {/*Thông tin về 4 điểm GD/TK gửi nhận mà bưu gửi đi qua*/}
        <TextField required   
          name="startGDpoint"
          label="Điểm giao dịch gửi"
          value={inputs.startGDpoint}
          onChange={handleChange}/>

        <TextField required 
          name="startTKpoint"
          label="Điểm tập kết gửi"
          value={inputs.startTKpoint}
          onChange={handleChange}/>

        <TextField required 
          name="endTKpoint"
          label="Điểm tập kết nhận"
          value={inputs.endTKpoint}
          onChange={handleChange}/>

        <TextField required 
          name="endGDpoint"
          label="Điểm giao dịch nhận"
          value={inputs.endGDpoint}
          onChange={handleChange}/>
        
        {/*Thông tin về người gửi*/}
        <h3>Thông tin người gửi</h3>
        <Stack direction="row" spacing={2}>
        <TextField required 
          name="senderName" 
          label="Họ tên" 
          value={inputs.senderName}
          onChange={handleChange}/>
        <TextField required 
          name="senderPhone" 
          label="Số điện thoại" 
          value={inputs.senderPhone}
          onChange={handleChange}/>
        <TextField required 
          name="senderAddress" 
          fullWidth 
          label="Địa chỉ" 
          value={inputs.senderAddress}
          onChange={handleChange}/>
        </Stack>

      {/*Thông tin về người nhận*/}
      <div>
      <h3>Thông tin người nhận</h3>
      <Stack direction="row" spacing={2}>
        <TextField required 
          name="receiverName" 
          label="Họ tên" 
          value={inputs.receiverName}
          onChange={handleChange}/>
        <TextField required 
          name="receiverPhone" 
          label="Số điện thoại" 
          value={inputs.receiverPhone}
          onChange={handleChange}
          />
        <TextField required 
          name="receiverAddress" 
          fullWidth 
          label="Địa chỉ"
          value={inputs.receiverAddress}
          onChange={handleReceiverAddressChange}/>
        </Stack>
        </div>

      <div>
      <h3>Thông tin bưu gửi</h3>
      <Stack direction="row" spacing={2}>
        <FormControl
         required
          sx ={{
            display:"block",
          }}
          >
          <FormLabel>Loại bưu gửi</FormLabel>
            <RadioGroup row 
              name="type"
              value={inputs.type}
              onChange={handleChange}>
              <FormControlLabel value="Tài liệu" control={<Radio />} label="Tài liệu" />
              <FormControlLabel value="Hàng hóa" control={<Radio />} label="Hàng hóa" />
            </RadioGroup>
        </FormControl>
        <TextField required 
          name="weight" 
          label="Khối lượng"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          value={inputs.weight}
          onChange={handleWeightChange} />
        <TextField required 
          name="cost" 
          label="Giá trị hàng" 
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">VNĐ</InputAdornment>,
            //readOnly: true,
          }}
          value={inputs.cost}
          onChange={handleChange}/>
        </Stack> 
      </div>

      <Button variant='contained' onClick={handleSubmit}>Ghi nhận</Button>
      
    </Box>

    <Box>
     
    </Box>
    
    </>
  );
        }

const addDexie = () => {
  const data = [
    {
     "id": "GD01", "name": "Ba Đình",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD02",
     "name": "Bình Thạnh",
     "Tkid": "TK02",
     "TKname": "Hồ Chí Minh"
    },
    {
     "id": "GD03",
     "name": "Cầu Giấy",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD04",
     "name": "Đống Đa",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD05",
     "name": "Hai Bà Trưng",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD06",
     "name": "Hoàn Kiếm",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD07",
     "name": "Hồng Bàng",
     "Tkid": "TK03",
     "TKname": "Hải Phòng"
    },
    {
     "id": "GD08",
     "name": "Ngô Quyền",
     "Tkid": "TK03",
     "TKname": "Hải Phòng"
    },
    {
     "id": "GD09",
     "name": "Tân Bình",
     "Tkid": "TK02",
     "TKname": "Hồ Chí Minh"
    },
    {
     "id": "GD10",
     "name": "Thanh Xuân",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD11",
     "name": "Ninh Kiều",
     "Tkid": "TK04",
     "TKname": "Cần Thơ"
    },
    {
     "id": "GD12",
     "name": "Liên Chiểu",
     "Tkid": "TK05",
     "TKname": "Đà Nẵng"
    },
    {
     "id": "GD13",
     "name": "Hải Châu",
     "Tkid": "TK05",
     "TKname": "Đà Nẵng"
    },
    {
     "id": "GD14",
     "name": "Thủ Dầu Một",
     "Tkid": "TK06",
     "TKname": "Bình Dương"
    },
    {
     "id": "GD15",
     "name": "Dĩ An",
     "Tkid": "TK06",
     "TKname": "Bình Dương"
    },
    {
     "id": "GD16",
     "name": "Thủ Đức",
     "Tkid": "TK02",
     "TKname": "Hồ Chí Minh"
    },
    {
     "id": "GD17",
     "name": "Biên Hòa",
     "Tkid": "TK07",
     "TKname": "Đồng Nai"
    },
    {
     "id": "GD18",
     "name": "Vũng Tàu",
     "Tkid": "TK08",
     "TKname": "Bà Rịa - Vũng Tàu"
    },
    {
     "id": "GD19",
     "name": "Buôn Ma Thuột",
     "Tkid": "TK09",
     "TKname": "Đắk Lắk"
    },
    {
     "id": "GD20",
     "name": "Quy Nhơn",
     "Tkid": "TK10",
     "TKname": "Bình Định"
    },
    {
     "id": "GD21",
     "name": "Nha Trang",
     "Tkid": "TK11",
     "TKname": "Khánh Hòa"
    },
    {
     "id": "GD22",
     "name": "Sơn Trà",
     "Tkid": "TK05",
     "TKname": "Đà Nẵng"
    },
    {
     "id": "GD23",
     "name": "Thanh Khê",
     "Tkid": "TK05",
     "TKname": "Đà Nẵng"
    },
    {
     "id": "GD24",
     "name": "Tây Hồ",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD25",
     "name": "Cẩm Lệ",
     "Tkid": "TK05",
     "TKname": "Đà Nẵng"
    },
    {
     "id": "GD26",
     "name": "Bắc Từ Liêm",
     "Tkid": "TK01",
     "TKname": "Hà Nội"
    },
    {
     "id": "GD28",
     "name": "Sơn Tây",
     "Tkid": "TK19",
     "TKname": "Quảng Ngãi"
    },
    {
     "id": "GD29",
     "name": "Quỳnh Phụ",
     "Tkid": "TK20",
     "TKname": "Thái Bình"
    },
    {
     "id": "GD30",
     "name": "Tam Dương",
     "Tkid": "TK18",
     "TKname": "Vĩnh Phúc"
    },
    {
     "id": "GD31",
     "name": "Hương Sơn",
     "Tkid": "TK12",
     "TKname": "Hà Tĩnh"
    },
    {
     "id": "GD32",
     "name": "Kinh Môn",
     "Tkid": "TK16",
     "TKname": "Hải Dương"
    },
    {
     "id": "GD33",
     "name": "Tứ Kỳ",
     "Tkid": "TK16",
     "TKname": "Hải Dương"
    },
    {
     "id": "GD34",
     "name": "Lập Thạch",
     "Tkid": "TK18",
     "TKname": "Vĩnh Phúc"
    },
    {
     "id": "GD35", "name": "Sông Lô",
     "Tkid": "TK18",
     "TKname": "Vĩnh Phúc"
    },
    {
     "id": "GD36",
     "name": "Phổ Yên",
     "Tkid": "TK15",
     "TKname": "Thái Nguyên"
    },
    {
     "id": "GD37",
     "name": "Sơn Tịnh",
     "Tkid": "TK19",
     "TKname": "Quảng Ngãi"
    },
    {
     "id": "GD38",
     "name": "Yên Khánh",
     "Tkid": "TK19",
     "TKname": "Ninh Bình"
    },
    {
     "id": "GD39",
     "name": "Thuận Bắc",
     "Tkid": "TK17",
     "TKname": "Ninh Thuận"
    },
    {
     "id": "GD40",
     "name": "Tiền Hải",
     "Tkid": "TK20",
     "TKname": "Thái Bình"
    },
    {
     "id": "GD41",
     "name": "Tam Điệp",
     "Tkid": "TK19",
     "TKname": "Ninh Bình"
    },
    {
     "id": "GD42",
     "name": "Cẩm Xuyên",
     "Tkid": "TK12",
     "TKname": "Hà Tĩnh"
    },
    {
     "id": "GD43",
     "name": "Nam Sách",
     "Tkid": "TK16",
     "TKname": "Hải Dương"
    },
    {
     "id": "GD44",
     "name": "Hồng Lĩnh",
     "Tkid": "TK12",
     "TKname": "Hà Tĩnh"
    },
    {
     "id": "GD45",
     "name": "Đồng Hỷ",
     "Tkid": "TK15",
     "TKname": "Thái Nguyên"
    },
    {
     "id": "GD46",
     "name": "Hương Thủy",
     "Tkid": "TK13",
     "TKname": "Huế"
    },
    {
     "id": "GD47",
     "name": "Tư Nghĩa",
     "Tkid": "TK19",
     "TKname": "Quảng Ngãi"
    },
    {
     "id": "GD48",
     "name": "Yên Mô",
     "Tkid": "TK19",
     "TKname": "Ninh Bình"
    },
    {
     "id": "GD49",
     "name": "Phong Điền",
     "Tkid": "TK13",
     "TKname": "Huế"
    },
    {
     "id": "GD50",
     "name": "Hương Trà",
     "Tkid": "TK13",
     "TKname": "Huế"
    },
    {
     "id": "GD51",
     "name": "Ninh Hải",
     "Tkid": "TK17",
     "TKname": "Ninh Thuận"
    },
    {
     "id": "GD52",
     "name": "Ninh Giang",
     "Tkid": "TK16",
     "TKname": "Hải Dương"
    },
    {
     "id": "GD53",
     "name": "Bình Xuyên",
     "Tkid": "TK18",
     "TKname": "Vĩnh Phúc"
    },
    {
     "id": "GD54",
     "name": "Bình Sơn",
     "Tkid": "TK19",
     "TKname": "Quảng Ngãi"
    },
    {
     "id": "GD55",
     "name": "Vĩnh Tường",
     "Tkid": "TK18",
     "TKname": "Vĩnh Phúc"
    },
    {
     "id": "GD56",
     "name": "Đông Hưng",
     "Tkid": "TK20",
     "TKname": "Thái Bình"
    },
    {
     "id": "GD57",
     "name": "Kim Sơn",
     "Tkid": "TK19",
     "TKname": "Ninh Bình"
    },
    {
     "id": "GD58",
     "name": "Từ Sơn",
     "Tkid": "TK14",
     "TKname": "Bắc Ninh"
    },
    {
     "id": "GD59",
     "name": "Định Hóa",
     "Tkid": "TK15",
     "TKname": "Thái Nguyên"
    },
    {
     "id": "GD60",
     "name": "Phú Bình",
     "Tkid": "TK15",
     "TKname": "Thái Nguyên"
    },
    {
     "id": "GD61",
     "name": "Ninh Sơn",
     "Tkid": "TK17",
     "TKname": "Ninh Thuận"
    },
    {
     "id": "GD62",
     "name": "Quế Võ",
     "Tkid": "TK14",
     "TKname": "Bắc Ninh"
    },
    {
     "id": "GD63",
     "name": "Thái Thụy",
     "Tkid": "TK20",
     "TKname": "Thái Bình"
    },
    {
     "id": "GD64",
     "name": "Trà Bồng",
     "Tkid": "TK19",
     "TKname": "Quảng Ngãi"
    }
   ];
  const tkdata = [
    {"id":"TK01","name":"Hà Nội"},
    {"id":"TK02","name":"Hồ Chí Minh"},
    {"id":"TK03","name":"Hải Phòng"},
    {"id":"TK04","name":"Cần Thơ"},
    {"id":"TK05","name":"Đà Nẵng"},
    {"id":"TK06","name":"Bình Dương"},
    {"id":"TK07","name":"Đồng Nai"},
    {"id":"TK08","name":"Bà Rịa - Vũng Tàu"},
    {"id":"TK09","name":"Đắk Lắk"},
    {"id":"TK10","name":"Bình Định"},
  {"id":"TK11","name":"Khánh Hòa"},
  {"id":"TK12","name":"Hà Tĩnh"},
  {"id":"TK13","name":"Huế"},
  {"id":"TK14","name":"Bắc Ninh"},
  {"id":"TK15","name":"Thái Nguyên"},
  {"id":"TK16","name":"Hải Dương"},
  {"id":"TK17","name":"Ninh Thuận"},{"id":"TK18","name":"Vĩnh Phúc"},
  {"id":"TK19","name":"Ninh Bình"},{"id":"TK20","name":"Thái Bình"},
  {"id":"TK21","name":"Quảng Ngãi"},]
  /*dexieDB.TKsystem.bulkAdd(tkdata)
  .then(() => {
    console.log('Dữ liệu đã được thêm thành công');
  })
  .catch(error => {
    console.error('Lỗi khi thêm dữ liệu:', error);
  });*/
  dexieDB.TKsystem.toArray()
  .then(records => {
    console.log('Dữ liệu trong bảng :', records);
  })
  .catch(error => {
    console.error('Lỗi khi lấy dữ liệu:', error);
  });
}