import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  IconButton,
  TextField,
  Box,
  Autocomplete,
  Grid,
  TableSortLabel,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeliveryFormDialog from "./DeliveryFormDialog";
import OrderDetailsDialog from "../OrderDetailsDialog";
import { dexieDB, syncFireStoreToDexie, updateDataFromDexieTable } from "../../database/cache";
import { useLiveQuery } from "dexie-react-hooks";
import { collection, getDocs, query, where, doc, setDoc, getDoc } from "firebase/firestore";
import { fireStore } from "../../database/firebase";

const DeliveryCreate = () => {
  const center = "GD10";
  const diemTK = "TK01";
  const [orders, setOrders] = useState([]);

  const data = useLiveQuery(() =>
    dexieDB
      .table("orders")
      .filter((item) => item.endGDpoint == center /*&& item.status == "Đã đến điểm GD nhận"*/)
      .toArray()
  );

  /*const fetchedOrders = [
    {
      id: "DH001",
      regisDate: "15/11/2023",
      senderName: "Phạm Hồng Thuận",
      senderPhone: "0892209351",
      senderAddress: "Số 78, Đường Lý Thường Kiệt, Ba Đình, Hà Nội",
      receiverName: "Đỗ Minh Anh",
      receiverPhone: "0965489285",
      receiverAddress: "Số 78, Đường Ngọc Khánh, Thủ Đức, Hồ Chí Minh",
      type: "Tài liệu",
      weight: 1,
      cost: 24431,
      startGDpoint: "GD01",
      startTKpoint: "TK01",
      endTKpoint: "TK02",
      endGDpoint: "GD16",
    },
    {
      id: "DH002",
      regisDate: "15/12/2023",
      senderName: "Đỗ Minh Anh",
      senderPhone: "0766665869",
      senderAddress: "Số 100, Đường Hai Bà Trưng, Ba Đình, Hà Nội",
      receiverName: "Hoàng Thị Ly",
      receiverPhone: "0353258682",
      receiverAddress: "Số 69, Đường Trần Văn Sắc, Hải Châu, Đà Nẵng",
      type: "Hàng hóa",
      weight: 0.8,
      cost: 25302,
      startGDpoint: "GD01",
      startTKpoint: "TK01",
      endTKpoint: "TK05",
      endGDpoint: "GD13",
    },
    {
      id: "DH003",
      regisDate: "16/11/2023",
      senderName: "Nguyễn Thị Thu",
      senderPhone: "0631032868",
      senderAddress: "Số 29, Đường Nguyễn Thiện Thành, Ba Đình, Hà Nội",
      receiverName: "Nguyễn Trung Nguyên",
      receiverPhone: "0758105820",
      receiverAddress: "Số 82, Đường Bà Triệu, Hải Châu, Đà Nẵng",
      type: "Tài liệu",
      weight: 1.4,
      cost: 48605,
      startGDpoint: "GD01",
      startTKpoint: "TK01",
      endTKpoint: "TK05",
      endGDpoint: "GD13",
    },
  ];*/
  /*const updatedOrders = fetchedOrders.map((order) => ({
    ...order,
    status: "Chưa tạo đơn",
  }));*/

  useEffect(() => {
    if (data) {
      const newRows = data.map((item) => 
        createData( item.id,
            item.senderName,
            item.senderPhone,
            item.senderAddress,
            item.receiverName,
            item.receiverPhone,
            item.receiverAddress,
            
            item.type,
            item.weight,
            item.cost,
            item.status, 
            item.regisDate)
      );
      setOrders(newRows);
    }
  }, [data]);

  function createData(id, senderName, senderPhone, senderAddress, receiverName, receiverPhone, receiverAddress, type, weight,
    cost, status, regisDate) {
    return {id, senderName, senderPhone, senderAddress, receiverName, receiverPhone, receiverAddress, type, weight,
    cost, status, regisDate/*, startGDpoint, startTKpoint, endTKpoint, endGDpoint*/ };
  }

  const defaultForm = {
    id: "",
    createDate: "",
    counts: 0,
    GDpoint: center,
    details: "",
  };
  const [deliveryBill, setDeliveryBill] = useState(defaultForm);

  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [openDeliveryForm, setOpenDeliveryForm] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clickDetailOrder = (order) => {
    setSelectedOrderDetails(order);
    setOpenDetailsOrder(true);
  };
  const closeDetailsOrder = () => {
    setOpenDetailsOrder(false);
  };

  //Xử lý event khi nhấn Tạo đơn
  const clickCreateDeliveryBill = () => {
    if (selectedOrders.length == 0) {
      alert("Vui lòng chọn đơn hàng");
    } else {
      setDeliveryBill((values) => ({ ...values, counts: selectedOrders.length }));
      let deliveryDetails = selectedOrders[0];
      for (let i = 1; i < selectedOrders.length; i++) {
        deliveryDetails += ", " + selectedOrders[i];
      }
      setDeliveryBill((values) => ({ ...values, details: deliveryDetails }));
      setOpenDeliveryForm(true);
    }
  };

  //Xử lý Xác nhận tạo đơn
  const submit = async() => {
    try {
      const newData = {
        ...deliveryBill,
        status: "chưa xác nhận"
        //id: "S490",  
      }
      //thêm vào bảng delivery trong fireStore
      const docRef = doc(fireStore, "delivery", newData.id);
      setDoc(docRef, newData);

      
      for (let i = 0; i < selectedOrders.length; i++) {
        //update dexie
        const data = orders.find(obj => obj.id === selectedOrders[i]);
        const newData = {...data, status: "Đang giao hàng"};
        updateDataFromDexieTable("orders", selectedOrders[i], newData);

        //update bảng orderHistory
        const docRef = doc(fireStore, "orderHistory", selectedOrders[i]+"_5");
        const querySnapshot = getDoc(docRef);
        const newHistoryLine = {
          ...(await querySnapshot).data(),
          date: deliveryBill.createDate,
        }
        setDoc(docRef, newHistoryLine);
      }
      
      
      setOpenSnackbar(true);
      setDeliveryBill(defaultForm);
    } catch (error) {
      console.error('Loi khi add đơn giao hàng trong fireStore:', error);
    }
    
  };

  const formValidate = () => {
    if (
      deliveryBill.id == "" ||
      deliveryBill.createDate == "" ||
      deliveryBill.counts == "" ||
      deliveryBill.counts == 0 ||
      deliveryBill.GDpoint == "" 
      //||deliveryBill.details == ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      submit();
      setOrders((prevOrders) => {
        return prevOrders.map((order) => ({
          ...order,
          status: selectedOrders.includes(order.id)
            ? "Đã tạo đơn"
            : order.status,
        }));
      });
      setSelectedOrders([]);

      setOpenDeliveryForm(false);
    }
  };

  const handleConfirmDeliveryBill = () => {
    formValidate();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  //Hủy Tạo đơn giao hàng, đóng deliveryFormDialog
  const closeDeliveryForm = () => {
    setOpenDeliveryForm(false);
    setDeliveryBill(defaultForm);
    setSelectedOrders([]);
  };

  //option cho autocomplete (bộ lọc)
  const orderID = [
    { label: "DH123" },
    { label: "DH124" },
    { label: "DH125" },
    { label: "DH126" },
    { label: "DH127" },
  ];

  const year = [
    { label: 2020 },
    { label: 2021 },
    { label: 2022 },
    { label: 2023 },
  ];
  const status = [{ label: "Chưa tạo đơn" }, { label: "Đã tạo đơn" }];
  const createArray = (start, end) => {
    let array = [];
    for (let i = start; i <= end; i++) {
      let object = { label: i };
      array.push(object);
    }
    return array;
  };
  const month = createArray(1, 12);
  const date = createArray(1, 31);

  /*const handleTransactionPointChange = (event, value) => {
    setSelectedTransactionPoint(value);
  };*/
  const handleDateChange = (event, value) => {
    setSelectedDate(value);
  };
  const handleMonthChange = (event, value) => {
    setSelectedMonth(value);
  };
  const handleYearChange = (event, value) => {
    setSelectedYear(value);
  };
  const handleStatusChange = (event, value) => {
    setSelectedStatus(value);
  };
  const handleOrderIDChange = (event, value) => {
    setSelectedOrderID(value);
  };

  //
  const handleCheckboxChange = (params) => {
    //Mảng selectedOrders chứa các orderID được chọn
    const newSelectedOrders = selectedOrders.includes(params)
      ? selectedOrders.filter((orderID) => orderID !== params)
      : [...selectedOrders, params];
    setSelectedOrders(newSelectedOrders);
  };

  const formatTime = (time) => {
    if (time) {
      const [date, month, year] = time.split("/");
    return new Date(`${year}-${month}-${date}`);
    }
    return "";
  };

  const filteredOrders = orders.filter((order) => {
    const formattedRegisDate = formatTime(order.regisDate);
    return (
      (!selectedOrderID || order.id === selectedOrderID.label) &&
      /*(!selectedTransactionPoint ||
        order.transactionPoint === selectedTransactionPoint.label) &&*/
      (!selectedDate ||
        formattedRegisDate.getDate() === parseInt(selectedDate.label)) &&
      (!selectedMonth ||
        formattedRegisDate.getMonth() + 1 === parseInt(selectedMonth.label)) &&
      (!selectedYear ||
        formattedRegisDate.getFullYear() === parseInt(selectedYear.label)) &&
      (!selectedStatus ||
        (order.confirmed ? "Đã tạo đơn" : "Chưa tạo đơn") ===
          selectedStatus.label)
    );
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Sorting function
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "des";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Tạo đơn giao hàng cho người nhận</Typography>
      {/* Các bộ lọc */}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Autocomplete
            disablePortal
            options={orderID}
            value={selectedOrderID}
            onChange={handleOrderIDChange}
            renderInput={(params) => (
              <TextField {...params} label="Mã đơn hàng" />
            )}
          />
        </Grid>
        {/*<Grid item xs={12} sm={6} md={2} lg={2}>
          <Autocomplete
            disablePortal
            options={transactionPointList}
            value={selectedTransactionPoint}
            onChange={handleTransactionPointChange}
            renderInput={(params) => (
              <TextField {...params} label="Điểm tập kết" />
            )}
            />
        </Grid>*/}
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Autocomplete
            disablePortal
            options={date}
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} label="Ngày" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Autocomplete
            disablePortal
            options={month}
            value={selectedMonth}
            onChange={handleMonthChange}
            renderInput={(params) => <TextField {...params} label="Tháng" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Autocomplete
            disablePortal
            options={year}
            value={selectedYear}
            onChange={handleYearChange}
            renderInput={(params) => <TextField {...params} label="Năm" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Autocomplete
            disablePortal
            options={status}
            value={selectedStatus}
            onChange={handleStatusChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Trạng thái"
                style={{ minWidth: "200px" }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onChange={() => {
                  const allSelected = selectedOrders.length === orders.length;
                  setSelectedOrders(
                    allSelected ? [] : orders.map((order) => order.orderID)
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <strong>Mã đơn hàng</strong>
              <TableSortLabel
                active={sortConfig.key === "orderID"}
                direction={
                  sortConfig.key === "orderID" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("orderID")}
              />
            </TableCell>
            <TableCell>
              <strong>Loại hàng</strong>
              <TableSortLabel
                active={sortConfig.key === "type"}
                direction={
                  sortConfig.key === "type" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("type")}
              />
            </TableCell>
            <TableCell>
              <strong>Cân nặng</strong>
              <TableSortLabel
                active={sortConfig.key === "weight"}
                direction={
                  sortConfig.key === "weight" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("weight")}
              />
            </TableCell>
            {/*<TableCell>
              <strong>Từ điểm giao dịch</strong>
              <TableSortLabel
                active={sortConfig.key === "transactionPoint"}
                direction={
                  sortConfig.key === "transactionPoint"
                    ? sortConfig.direction
                    : "asc"
                }
                onClick={() => sortData("transactionPoint")}
              />
            </TableCell>*/}
            <TableCell>
              <strong>Ngày xác nhận</strong>
              <TableSortLabel
                active={sortConfig.key === "date"}
                direction={
                  sortConfig.key === "date" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("date")}
              />
            </TableCell>
            <TableCell>
              <strong>Chi tiết</strong>
            </TableCell>
            <TableCell>
              <strong>Trạng thái</strong>
              <TableSortLabel
                active={sortConfig.key === "status"}
                direction={
                  sortConfig.key === "status" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("status")}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getSortedData(filteredOrders).map((order) => (
            <TableRow
              key={order.id}
              sx={{
                backgroundColor:
                  order.status === "Đã tạo đơn" ? "#e8f5e9" : "inherit",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => handleCheckboxChange(order.id)}
                />
              </TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.weight}</TableCell>
              {/*<TableCell>{order.transactionPoint}</TableCell>*/}
              <TableCell>{order.regisDate}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => clickDetailOrder(order)}
                  style={{ color: "#4CAF50" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#4CAF50", color: "#fff" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#003e29")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          onClick={clickCreateDeliveryBill}
        >
          Tạo đơn
        </Button>
      </Box>

      <DeliveryFormDialog
        open={openDeliveryForm}
        onClose={closeDeliveryForm}
        onConfirm={handleConfirmDeliveryBill}
        selectedOrders={selectedOrders}
        orders={orders}
        deliveryBill={deliveryBill}
        setDeliveryBill={setDeliveryBill}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Đã tạo đơn giao hàng thành công"
      />

      <OrderDetailsDialog
        open={openDetailsOrder}
        onClose={closeDetailsOrder}
        selectedOrderDetails={selectedOrderDetails}
      />
    </Container>
  );
};

export default DeliveryCreate;
