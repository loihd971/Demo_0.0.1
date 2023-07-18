/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Card from "@mui/material/Card";
import {
  Link,
  Typography,
  CardContent,
  CardHeader,
  Box,
  Button,
  Popper,
  Fade,
  Paper,
  PopperPlacementType,
} from "@mui/material";
import { defaultDomainData as defaultData } from "../data/domain.js";
import { Domain } from "../type/domain.ts";
import { useState } from "react";
import DomainForm from "./DomainForm.tsx";
import CheckingDomain from "./CheckingDomain.tsx";
import { styled } from "@mui/material/styles";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StatusText from "./StatusText.tsx";
import { getLocalStorage, setLocalStorage } from "../utils/storage.ts";

interface DomainCardProps {
  // o:default - 1:custom
  type: 0 | 1;
}

const StyledButton = styled(Button)({
  backgroundColor: "var(--light-blue-color)",
  color: "var(--blue-color)",
  borderRadius: "10px",
  padding: "2px 10px",
});

function DomainCard({ type }: Partial<DomainCardProps>) {
  const [stage, setStage] = useState<number>(getLocalStorage("stage") || 0);
  const [isCustomDomainDone, setIsCustomDomainDone] = useState<boolean>(
    getLocalStorage("isCountDone") || false
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleSubmitForm = () => {
    setStage(1);
    setLocalStorage("stage", 1);
  };

  const handleConnectDomainDone = () => {
    setIsCustomDomainDone(true);
    setLocalStorage("isCountDone", true);
    console.log("done");
  };

  return (
    <Card sx={{ minWidth: 275, borderRadius: "10px", marginBottom: "20px" }}>
      <CardHeader
        className="mui-card__header"
        title={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              <b>
                {type === 0
                  ? "Tên miền mặc định"
                  : !isCustomDomainDone
                  ? "Tên miền tùy chỉnh"
                  : "Tên miền hiện tại"}
              </b>
            </Typography>
            {stage === 1 && type !== 0 && !isCustomDomainDone && (
              <StyledButton
                onClick={() => {
                  setStage(0);
                  setLocalStorage("stage", 0);
                }}
              >
                <DriveFileRenameOutlineIcon />
                <b>Thay đổi tên miền</b>
              </StyledButton>
            )}
            {stage === 1 && type !== 0 && isCustomDomainDone && (
              <Box>
                <Button
                  className="more-option__icon"
                  variant="text"
                  onBlur={() => setOpen(false)}
                  onClick={handleClick("bottom-end")}
                >
                  <MoreHorizIcon />
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Typography
                          sx={{ p: 2 }}
                          onClick={() => {
                            setStage(0);
                            setLocalStorage("stage", 0);
                            setIsCustomDomainDone(false);
                            setLocalStorage("isCountDone", false);
                          }}
                        >
                          Hủy kết nối
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>
            )}
          </Box>
        }
      ></CardHeader>
      <CardContent>
        {type === 0 &&
          defaultData.map((item: Domain) => (
            <div className="domain-info" key={item.id}>
              <Typography mb={item.id !== 2 ? 3 : 0}>
                <b>{item.name}</b>
              </Typography>
              <Typography mb={item.id !== 2 ? 3 : 0}>
                {item.id === 2 && item.content}
                {item.id === 0 && (
                  <Link className="domain-link" sx={{ textDecoration: "none" }}>
                    {item.content}
                  </Link>
                )}
                {item.id === 1 && (
                  <StatusText status={1} content={item.content} />
                )}
              </Typography>
            </div>
          ))}
        {type !== 0 && stage === 0 && (
          <DomainForm
            initialValue={{ domain: "" }}
            onSubmit={handleSubmitForm}
          />
        )}
        {type !== 0 && stage === 1 && (
          <CheckingDomain
            onConnectDomainDone={handleConnectDomainDone}
            isDone={isCustomDomainDone}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default DomainCard;
