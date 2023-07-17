import { Box, Button, Hidden, Link, Typography } from "@mui/material";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import CountDown from "./CountDown";
import StatusText from "./StatusText";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

interface CheckingDomainProps {
  onConnectDomainDone: () => void;
  isDone: boolean;
}
function CheckingDomain({ onConnectDomainDone, isDone }: CheckingDomainProps) {
  const [isConnect, setIsConnect] = useState<boolean>(
    getLocalStorage("isConnect") || false
  );

  const handleCountDownClose = () => {
    onConnectDomainDone();
    setLocalStorage("isConnect", false);
    setIsConnect(false);
  };

  return (
    <>
      {isConnect && <CountDown onClose={handleCountDownClose} />}
      <div className="domain-info">
        <Typography mb={3}>
          <b>Tên miền</b>
        </Typography>
        <Typography mb={3}>duyanhauto.com</Typography>
      </div>

      <div className="domain-info">
        <Typography mb={3}>
          <b>IP hiện tại</b>
        </Typography>
        {isConnect && !isDone && (
          <StatusText status={0} content="Hệ thống đang kết nối" />
        )}
        {!isConnect && !isDone && (
          <Typography mb={3} sx={{ display: "flex", alignItems: "center" }}>
            123.456.789{" "}
            <CheckCircleIcon
              sx={{ fill: "var(--green-color)", marginLeft: "5px" }}
            />
          </Typography>
        )}
        {isDone && <StatusText status={1} content={"Đã kết nối"} />}
      </div>
      {isDone && (
        <div className="domain-info">
          <Typography mb={3}>
            <b>Ngày thêm</b>
          </Typography>

          <Typography mb={3}>21 giờ 52 phút 30/03/2023</Typography>
        </div>
      )}
      {!isDone ? (
        <div className="domain-table">
          <Typography mb={3}>
            <b>IP KiotVietWeb</b>
          </Typography>
          <TableContainer sx={{ marginBottom: "20px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={"20%"} align="left">
                    Host
                  </TableCell>
                  <TableCell width={"20%"} align="left">
                    Loại
                  </TableCell>
                  <TableCell width={"60%"} align="left">
                    Giá trị
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={"@"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width={"20%"} component="th" scope="row">
                    @
                  </TableCell>
                  <TableCell width={"20%"} align="left">
                    A
                  </TableCell>
                  <TableCell width={"60%"} align="left">
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>123.456.789</Typography>
                      {!isConnect && (
                        <Link
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                          }}
                        >
                          <CopyAllIcon sx={{ fontSize: "16px" }} />
                          <b> Sao chép</b>
                        </Link>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <th> Host</th>
              <th>Loại</th>
              <th>Gía trị</th>
            </tr>
            <tr>
              <td>@</td>
              <td>A</td>
              <td>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>123.456.789</Typography>
                  {!isConnect && (
                    <Link
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <CopyAllIcon sx={{ fontSize: "16px" }} />
                      <b> Sao chép</b>
                    </Link>
                  )}
                </Box>
              </td>
            </tr>
          </table> */}
          <div className="domain-warning">
            {isConnect ? (
              <Typography sx={{ width: "100 !important" }}>
                Hệ thống đang thiết lập tên miền. Bạn có thể truy cập tên miền
                sau &nbsp;<b>10phút</b>, nếu không được vui lòng liên hệ hotline
                1900 6522 để được hỗ trợ.
              </Typography>
            ) : (
              <div className="domain-warning--2column">
                <WarningIcon sx={{ fill: "var(--yellow-color)" }} />
                <div className="waring-content">
                  <Typography mb={2}>
                    <b>Lưu ý:</b> Nhập đúng địa chỉ IP KVWEB sang nhà cung cấp.
                    Thời gian kết nối IP sẽ tùy thuộc vào nhà cung cấp(Khoảng
                    2-5 tiếng)
                  </Typography>
                  <Typography>
                    <b>Hướng dãn chi tiết từ nhà cung cấp:</b>
                  </Typography>
                  <ul className="warning-content__ul">
                    <li>
                      matbao.vn <Link>xem chi tiết</Link>
                    </li>
                    <li>
                      cloudflare <Link>xem chi tiết</Link>
                    </li>
                    <li>
                      pavietnam <Link>xem chi tiết</Link>
                    </li>
                    <li>
                      Nhà cung cấp khác <Link>xem chi tiết</Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {!isConnect && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setIsConnect(true);
                  setLocalStorage("isConnect", true);
                }}
                variant="contained"
              >
                Kết nối
              </Button>
            </Box>
          )}
        </div>
      ) : null}
    </>
  );
}

export default CheckingDomain;
