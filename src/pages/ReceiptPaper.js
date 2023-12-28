import React from "react";
import {
  Paper,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
} from "@mui/material";
import QRCode from "qrcode.react";
import logo from "../assets/logo1.png";
import signature from "../assets/signature.png";

const ReceiptPaper = ({ form }) => {
  return (
    <Paper sx={{ padding: 2, maxWidth: "1000px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "40%",
            maxHeight: "40%",
            objectFit: "contain",
            paddingRight: "150px",
          }}
        />
        <Typography fontWeight="bold" sx={{ paddingRight: "10px" }}>
          Quét mã bên cạnh để theo dõi <br /> trạng thái đơn hàng
        </Typography>
        <QRCode value="https://magicpost.com" size={90} />
      </div>
      <br />
      <Grid container sx={{ display: "flex", border: "1px solid #000" }}>
        {/* Left Box */}
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              1. Họ tên địa chỉ người gửi:
            </Typography>
            <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
              Họ tên: {form.senderName}
            </Typography>
            <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
              Địa chỉ: {form.senderAddress}
            </Typography>
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ paddingLeft: "10px" }}
            >
              Điện thoại: {form.senderPhone}
            </Typography>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ paddingLeft: "10px" }}
                >
                  Mã khách hàng:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">
                  Mã bưu chính: {form.startGDpoint}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              3. Loại hàng gửi:
            </Typography>
            <Checkbox
              sx={{ paddingLeft: "20px" }}
              checked={form.type === "Tài liệu"}
            />
            <label>Tài liệu</label>

            <Checkbox
              sx={{ paddingLeft: "80px" }}
              checked={form.type === "Hàng hóa"}
            />
            <label>Hàng hóa</label>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              4. Nội dung trị giá bưu gửi:
            </Typography>
            <TableContainer sx={{ border: "1px solid #000" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ border: "1px solid #000", padding: "0px" }}
                    >
                      Nội dung
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #000", padding: "0px" }}
                    >
                      Số lượng
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #000", padding: "0px" }}
                    >
                      Trị giá
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #000", padding: "0px" }}
                    >
                      Giấy tờ đính kèm
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ padding: "8px" }}>Tổng</TableCell>
                    <TableCell
                      sx={{ border: "1px solid #000", padding: "8px" }}
                    >
                      0
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #000", padding: "8px" }}
                    ></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              5. Dịch vụ đặc biệt/Cộng thêm:
            </Typography>
            <br />
            <br />
          </Grid>

          <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              6. Chỉ dẫn của người gửi khi không phát được bưu gửi:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <Typography variant="body2" sx={{ ml: 1, flexGrow: 1 }}>
                    Chuyển hoàn ngay
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <Typography variant="body2" sx={{ ml: 1, flexGrow: 1 }}>
                    Gọi điện cho người gửi/BC gửi
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <Typography variant="body2" sx={{ ml: 1, flexGrow: 1 }}>
                    Hủy
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <Typography variant="body2" sx={{ ml: 1, flexGrow: 1 }}>
                    Chuyển hoàn trước ngày
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <Typography variant="body2" sx={{ ml: 1, flexGrow: 1 }}>
                    Chuyển hoàn khi hết thời gian lưu trữ
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              7. Cam kết của người gửi:
            </Typography>
            <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
              Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu
              gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp
              không phát được hãy thực hiện chỉ dẫn tại mục 6, tôi sẽ trả cước
              chuyển hoàn.
            </Typography>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={7}>
                <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                  8. Ngày giờ gửi:
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography fontWeight="bold">Chữ ký người gửi</Typography>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <span>{new Date().toLocaleString()}</span>
              <br />
              <br />
            </Typography>
          </Grid>
        </Grid>

        {/* Right Box */}
        <Grid item xs={6} sx={{ paddingLeft: "5px" }}>
          {/* Right Top */}
          <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
            <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
              2. Họ tên địa chỉ người nhận:
            </Typography>
            <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
              Họ tên: {form.receiverName}
            </Typography>
            <Typography variant="body2" sx={{ paddingLeft: "10px" }}>
              Địa chỉ: {form.receiverAddress}
            </Typography>
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ paddingLeft: "10px" }}
            >
              Mã ĐH: {"  "} {form.id}
            </Typography>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ paddingLeft: "10px" }}
                >
                  Điện thoại: {form.receiverPhone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="bold">
                  Mã bưu chính: {form.endGDpoint}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Bottom */}
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
            {/* Right Bottom Left */}
            <Grid
              item
              xs={7}
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
                <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                  9. Cước:
                </Typography>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      a. Cước chính:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      b. Phụ phí
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      c. Cước GTGT
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      d. Tổng cước (gồm VAT):{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      {form.cost}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      e. Thu khác:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ paddingLeft: "5px" }}
                    >
                      f. Tổng thu:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      {form.cost}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
                <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                  11. Thu của người nhận
                </Typography>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      COD:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      Thu khác:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                      Tổng thu:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      0
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
                <br />
                <Typography
                  fontWeight="bold"
                  sx={{ textAlign: "center", lineHeight: "1" }}
                >
                  13. Bưu cục chấp nhận
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", lineHeight: "1" }}
                >
                  Chữ ký GDV nhận
                </Typography>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={signature}
                    alt="Signature"
                    style={{
                      maxWidth: "45%",
                      maxHeight: "45%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <br />
                <br />
              </Grid>
            </Grid>

            {/* Right Bottom Right */}
            <Grid
              item
              xs={5}
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
                <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                  10. Khối lượng (kg):
                </Typography>
                <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                  Khối lượng thực tế: {form.weight}
                </Typography>
                <Typography variant="body2" sx={{ paddingLeft: "5px" }}>
                  Khối lượng quy đổi:{"   0"}
                </Typography>
                <br />
              </Grid>

              <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
                <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                  12. Chú dẫn nghiệp vụ:
                </Typography>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Grid>

              <Grid item xs={12} sx={{ border: "1px solid #000", flex: 1 }}>
                <Typography fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                  14. Ngày giờ nhận
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ paddingLeft: "15px" }}
                >
                  .....h...../....../...../20.....
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", lineHeight: "1" }}
                >
                  Người nhận/ Người được ủy quyền nhận
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", lineHeight: "2" }}
                >
                  (Ký, ghi rõ họ tên)
                </Typography>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography
        fontWeight="bold"
        sx={{ textAlign: "center", lineHeight: "1", paddingTop: "5px" }}
      >
        Hotline: 199.999.999 - Website: magicpost.com - Email:
        magicpost@gmail.com
      </Typography>
    </Paper>
  );
};

export default ReceiptPaper;