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
import ShipmentDetailsDialog from "./ShipmentDetailsDialog";
import OrderDetailsDialog from "../OrderDetailsDialog";

const TKconfirm = () => {
  const fetchedShipments = [
    {
      shipmentID: "S246",
      createDate: "2023-05-20",
      Counts: 1,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD01",
      details: "DH100",
    },
    {
      shipmentID: "S250",
      createDate: "2023-01-18",
      Counts: 2,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD03",
      details: "DH113, DH114",
    },
    {
      shipmentID: "S251",
      createDate: "2023-03-19",
      Counts: 1,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD03",
      details: "DH217",
    },
    {
      shipmentID: "S254",
      createDate: "2023-08-06",
      Counts: 3,
      startGDpoint: 0,
      startTKpoint: 0,
      endTKpoint: "TK01",
      endGDpoint: "GD04",
      details: "DH130, DH131, DH132",
    },
  ];
  const displayShipments = fetchedShipments.map((shipment) => ({
    ...shipment,
    status: "Chưa xác nhận",
  }));

  const [shipments, setShipments] = useState(displayShipments);
  const [openDetailsShipment, setOpenDetailsShipment] = useState(false); //quản lý trạng thái dialog ShipmentDetails
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [selectedShipmentDetails, setSelectedShipmentDetails] = useState(null);
  // const [selectedTransactionPoint, setSelectedTransactionPoint] =useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  //Sự kiện Xem chi tiết đơn chuyển; Nhấn VisibilityIcon
  const clickDetailsShipment = (shipmentDetails) => {
    setSelectedShipmentDetails(shipmentDetails);
    setOpenDetailsShipment(true);
  };
  const closeDetailsShipment = () => {
    setOpenDetailsShipment(false);
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
    const newSelectedShipments = selectedShipments.includes(params)
      ? selectedShipments.filter((id) => id !== params)
      : [...selectedShipments, params];

    setSelectedShipments(newSelectedShipments);
  };

  const handleConfirmShipment = () => {
    setShipments((prevShipments) => {
      const updatedShipments = prevShipments.map((shipment) =>
        selectedShipments.includes(shipment.shipmentID) &&
        shipment.status === "Chưa xác nhận"
          ? { ...shipment, status: "Đã xác nhận", confirmed: true }
          : shipment
      );
      return updatedShipments;
    });
    setSelectedShipments([]);
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

  // Các shipment thỏa mãn bộ lọc
  const filteredShipments = shipments.filter((shipment) => {
    const formattedDate = formatTime(shipment.createDate);

    return (
      (!selectedDate ||
        formattedDate.getDate() === parseInt(selectedDate.label)) &&
      (!selectedMonth ||
        formattedDate.getMonth() + 1 === parseInt(selectedMonth.label)) &&
      (!selectedYear ||
        formattedDate.getFullYear() === parseInt(selectedYear.label)) &&
      (!selectedStatus ||
        (shipment.confirmed ? "Đã xác nhận" : "Chưa xác nhận") ===
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
                checked={selectedShipments.length === shipments.length}
                onChange={() => {
                  const allSelected =
                    selectedShipments.length === shipments.length;
                  setSelectedShipments(
                    allSelected
                      ? []
                      : shipments.map((shipment) => shipment.shipmentID)
                  );
                }}
              />
            </TableCell>
            <TableCell>
              <strong>Mã đơn chuyển hàng</strong>
              <TableSortLabel
                active={sortConfig.key === "shipmentID"}
                direction={
                  sortConfig.key === "shipmentID" ? sortConfig.direction : "asc"
                }
                onClick={() => sortData("shipmentID")}
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
          {getSortedData(filteredShipments).map((shipment) => (
            <TableRow
              key={shipment.shipmentID}
              sx={{
                backgroundColor:
                  shipment.status === "Đã xác nhận" ? "#e8f5e9" : "inherit",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selectedShipments.includes(shipment.shipmentID)}
                  onChange={() => handleCheckboxChange(shipment.shipmentID)}
                />
              </TableCell>
              <TableCell>{shipment.shipmentID}</TableCell>

              <TableCell>{shipment.Counts}</TableCell>
              <TableCell>{shipment.createDate}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => clickDetailsShipment(shipment)}
                  style={{ color: "#4CAF50" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell>{shipment.status}</TableCell>
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
          onClick={handleConfirmShipment}
        >
          Xác nhận
        </Button>
      </Box>

      <ShipmentDetailsDialog
        open={openDetailsShipment}
        onClose={closeDetailsShipment}
        shipmentDetails={selectedShipmentDetails}
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

export default TKconfirm;
