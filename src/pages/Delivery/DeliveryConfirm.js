import React, { useState } from "react";
import {
  AppBar,
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
  Form,
  FormGroup,
  TableContainer,
  Tab,
  TableSortLabel,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeliveryDetailsDialog from "./DeliveryDetailsDialog";
import OrderDetailsDialog from "../OrderDetailsDialog";

const DeliveryConfirm = () => {
  const fetchedDeliveryBills = [
    {
      id: "S246",
      createDate: "2023-05-20",
      counts: 1,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD01",
      details: "DH100",
    },
    {
      id: "S250",
      createDate: "2023-01-18",
      counts: 2,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD03",
      details: "DH113, DH114",
    },
    {
      id: "S251",
      createDate: "2023-03-19",
      counts: 1,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD03",
      details: "DH217",
    },
    {
      id: "S254",
      createDate: "2023-08-06",
      counts: 3,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD04",
      details: "DH130, DH131, DH132",
    },
  ];
  const displayDeliveryBills = fetchedDeliveryBills.map((bill) => ({
    ...bill,
    status: "Chưa xác nhận",
  }));

  const [deliveryBills, setDeliveryBills] = useState(displayDeliveryBills);
  const [openDetailsDelivery, setOpenDetailsDelivery] = useState(false); //quản lý trạng thái dialog DeliveryDetails
  const [selectedDeliveryBills, setSelectedDeliveryBills] = useState([]);
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);
  // const [selectedTransactionPoint, setSelectedTransactionPoint] =useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  //Sự kiện Xem chi tiết đơn chuyển; Nhấn VisibilityIcon
  const clickDetailsDelivery = (deliveryDetails) => {
    setSelectedDeliveryDetails(deliveryDetails);
    setOpenDetailsDelivery(true);
  };
  const closeDetailsDelivery = () => {
    setOpenDetailsDelivery(false);
  };
  const clickDetailOrder = (order) => {
    setSelectedOrderDetails(order);
    setOpenDetailsOrder(true);
  };
  const closeDetailsOrder = () => {
    setOpenDetailsOrder(false);
  };
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);

  const handleCheckboxChange = (params) => {
    const newSelectedDeliveryBills = selectedDeliveryBills.includes(params)
      ? selectedDeliveryBills.filter((id) => id !== params)
      : [...selectedDeliveryBills, params];

    setSelectedDeliveryBills(newSelectedDeliveryBills);
  };

  const handleConfirmDelivery = () => {
    setDeliveryBills((prevDeliveryBills) => {
      const updatedDeliveryBills = prevDeliveryBills.map((delivery) =>
        selectedDeliveryBills.includes(delivery.id) &&
        delivery.status === "Chưa xác nhận"
          ? { ...delivery, status: "Đã xác nhận", confirmed: true }
          : delivery
      );
      return updatedDeliveryBills;
    });
    setSelectedDeliveryBills([]);
  };

  /* const transactionPointList = [
    { label: "Xuân Thủy" },
    { label: "Trần Quốc Hoàn" },
    { label: "Tô Hiệu" },
    { label: "Phạm Văn Đồng" },
  ];*/
  const status = [{ label: "Chưa xác nhận" }, { label: "Đã xác nhận" }];
  const year = [
    { label: 2020 },
    { label: 2021 },
    { label: 2022 },
    { label: 2023 },
  ];
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

  /*  const handleTransactionPointChange = (event, value) => {
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

  const formatTime = (time) => {
    const [date, month, year] = time.split("/");
    return new Date(`${year}-${month}-${date}`);
  };

  // Các delivery thỏa mãn bộ lọc
  const filteredDeliveryBills = deliveryBills.filter((delivery) => {
    const formattedDate = formatTime(delivery.createDate);

    return (
      (!selectedDate ||
        formattedDate.getDate() === parseInt(selectedDate.label)) &&
      (!selectedMonth ||
        formattedDate.getMonth() + 1 === parseInt(selectedMonth.label)) &&
      (!selectedYear ||
        formattedDate.getFullYear() === parseInt(selectedYear.label)) &&
      (!selectedStatus ||
        (delivery.confirmed ? "Đã xác nhận" : "Chưa xác nhận") ===
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
    <Container>
      <h2>Xác nhận giao hàng</h2>
      <Grid container spacing={2}>
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
                checked={selectedDeliveryBills.length === deliveryBills.length}
                onChange={() => {
                  const allSelected =
                    selectedDeliveryBills.length === deliveryBills.length;
                  setSelectedDeliveryBills(
                    allSelected
                      ? []
                      : deliveryBills.map((delivery) => delivery.id)
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <strong>Mã đơn giao hàng</strong>
              <TableSortLabel
                active={sortConfig.key === "id"}
                direction={
                  sortConfig.key === "id" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("id")}
              />
            </TableCell>
            <TableCell>
              <strong>Số lượng</strong>
              <TableSortLabel
                active={sortConfig.key === "counts"}
                direction={
                  sortConfig.key === "counts" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("counts")}
              />
            </TableCell>
            <TableCell>
              <strong>Ngày</strong>
              <TableSortLabel
                active={sortConfig.key === "createDate"}
                direction={
                  sortConfig.key === "createDate" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("createDate")}
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
          {getSortedData(filteredDeliveryBills).map((delivery) => (
            <TableRow
              key={delivery.id}
              sx={{
                backgroundColor:
                  delivery.status === "Đã xác nhận" ? "#e8f5e9" : "inherit",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selectedDeliveryBills.includes(delivery.id)}
                  onChange={() => handleCheckboxChange(delivery.id)}
                />
              </TableCell>
              <TableCell>{delivery.id}</TableCell>

              <TableCell>{delivery.counts}</TableCell>
              <TableCell>{delivery.createDate}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => clickDetailsDelivery(delivery)}
                  style={{ color: "#4CAF50" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell>{delivery.status}</TableCell>
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
          onClick={handleConfirmDelivery}
        >
          Xác nhận
        </Button>
      </Box>

      <DeliveryDetailsDialog
        open={openDetailsDelivery}
        onClose={closeDetailsDelivery}
        deliveryDetails={selectedDeliveryDetails}
        clickDetailOrder={clickDetailOrder}
      />
      <OrderDetailsDialog
        open={openDetailsOrder}
        onClose={closeDetailsOrder}
        selectedOrderDetails={selectedOrderDetails}
      />
    </Container>
  );
};

export default DeliveryConfirm;
