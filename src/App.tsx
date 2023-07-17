import { Link, Typography } from "@mui/material";
import "./styles/global.css";
import DomainCard from "./components/DomainCard.tsx";

function App() {
  return (
    <div className="domain-register__container">
      <div className="domain-register__header">
        <Typography variant="h5">
          <b>Tên miền</b>
        </Typography>
        <Typography>Tăng khả năng hiển thị trang web của bạn</Typography>
        <Typography mb={2}>
          Bạn có thể <Link className="domain-link">xem hướng dẫn tại đây.</Link>
        </Typography>
      </div>
      <div className="domain-register__body">
        <div className="domain-default">
          <DomainCard type={0} />
        </div>
        <div className="domain-customize">
          <DomainCard type={1} />
        </div>
      </div>
    </div>
  );
}

export default App;
