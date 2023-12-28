import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
} from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../../database/cache";

const ShipmentDetailsDialog = ({
  open,
  onClose,
  shipmentDetails,
  setShipments,
  clickDetailOrder,
}) => {
  
  //const details = shipmentDetails.details;
  /*const orderIdArray = (shipmentDetails != null) ? shipmentDetails.details.split(", ").map(id => id.trim()):["DH001", "DH002"];

  const data = useLiveQuery(() =>
    dexieDB
      .table("orders")
      .where('id')
      .anyOf(orderIdArray)
      .toArray()
  );

  


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
            )
      );
      setOrders(newRows);
      //console.log("shipmentDetails.details:", shipmentDetails.details);
      //console.log("orderIdArray:", orderIdArray);
      console.log("Results from DexieDB query:", data);
    }
  }, [data]);

  /*useEffect(() => {
    //if (shipmentDetails.orders === undefined) {
      dexieDB.table('orders')
        .where('id')
        .anyOf(orderIdArray)
        .toArray()
        .then(results => {
      setOrders(results);
  })
  .catch(error => {
    console.error('Lỗi khi truy vấn:', error);
  });
   // }
  }, [shipmentDetails]);*/

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: "#003e29", color: "#fff", padding: "10px" }}>
        
        Chi tiết đơn chuyển hàng {shipmentDetails && (
          <Typography variant="body" gutterBottom>
               {shipmentDetails.shipmentID}   
          </Typography>)}

      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#edf6f9" }}>
        {shipmentDetails && (
          <Box sx={{ padding: "24px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="#5CAF50">
                  <strong>Tên nhân viên:</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {shipmentDetails.details}
                </Typography>
              </Grid>
              {/*<Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="#5CAF50">
                  <strong>Điểm giao dịch:</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {shipmentDetails.employee.address}
                </Typography>
              </Grid>*/}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="#5CAF50">
                  <strong>Số lượng hàng:</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {shipmentDetails.Counts}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="#5CAF50">
                  <strong>Ngày chuyển hàng:</strong>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {shipmentDetails.createDate}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <TableContainer component={Paper} elevation={3}>
            {shipmentDetails.orders && (
              <Table>
                <TableHead sx={{ backgroundColor: "#5CAF50" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>STT</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Mã đơn hàng</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Loại</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Cân nặng</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Giá tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {shipmentDetails.orders.map((order, index) => (
                    <TableRow
                      key={order.id}
                      onClick={() => clickDetailOrder(order)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#e8f5e9",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>{order.weight}</TableCell>
                      <TableCell>{order.cost}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>)
            }
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: "10px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: "#4CAF50",
            color: "#fff",
            "&:hover": { bgcolor: "#003e29" },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShipmentDetailsDialog;
